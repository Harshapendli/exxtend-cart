import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { formatPrice } from '../lib/utils';
import { HiCheckCircle, HiDocumentText, HiClock } from 'react-icons/hi2';

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    
    // Subscribe to new orders
    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', id);

      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-soft border border-gray-100 p-8">
        <h1 className="text-3xl font-black font-display text-gray-900 mb-8">Admin Dashboard - Orders</h1>
        
        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:shadow-md transition-shadow">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{order.customer_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone:</span> {order.customer_phone} | <span className="font-semibold">Email:</span> {order.customer_email || 'N/A'}
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Items: </span>
                    {order.items?.map((item: any) => `${item.name} (x${item.quantity})`).join(', ')}
                  </div>
                  <div className="text-sm text-gray-900 font-bold font-mono">
                    Total: {formatPrice(order.total_amount)}
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                  {order.documents && order.documents.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-1"><HiDocumentText /> Documents</h4>
                      <div className="flex flex-col gap-1">
                        {order.documents.map((docUrl: string, idx: number) => {
                          const safeUrl = docUrl.replace(/\+/g, '%2B');
                          return (
                            <a key={idx} href={safeUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline text-xs truncate block">
                              View Document {idx + 1}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {order.status !== 'completed' && (
                    <button
                      onClick={() => markComplete(order.id)}
                      className="bg-brand text-white font-bold py-2 px-4 rounded-xl text-xs hover:bg-brand-dark transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <HiCheckCircle className="h-4 w-4" /> Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
