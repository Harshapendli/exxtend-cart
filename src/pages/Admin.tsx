import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import {
  HiCheckCircle,
  HiDocumentText,
  HiClock,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRightOnRectangle,
  HiExclamationTriangle,
  HiFunnel,
  HiMagnifyingGlass,
  HiPhone,
  HiEnvelope,
  HiShoppingBag,
  HiChartBar,
  HiCurrencyRupee,
  HiUserGroup,
  HiXMark,
} from 'react-icons/hi2';
import { toast } from 'react-hot-toast';

// Admin credentials — change these to your own
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Warangal@1';

// Session key for localStorage
const SESSION_KEY = 'ek_admin_session';

function getSession(): boolean {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return false;
    const { expiry } = JSON.parse(session);
    // Session expires after 24 hours
    if (Date.now() > expiry) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function createSession() {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ loggedIn: true, expiry: Date.now() + 24 * 60 * 60 * 1000 })
  );
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── LOGIN SCREEN ───────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a slight delay for realistic feel
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        createSession();
        toast.success('Welcome back, Admin!');
        onLogin();
      } else {
        setError('Invalid username or password. Please try again.');
        toast.error('Login failed — check your credentials.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiLockClosed className="h-8 w-8 text-brand" />
          </div>
          <h1 className="text-2xl font-black font-display text-gray-950">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1 font-sans">EXTEND KART — Order Management</p>
        </div>

        {/* Login card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                autoFocus
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 pr-12 text-sm font-medium focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  {showPassword ? <HiEyeSlash className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <HiExclamationTriangle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand text-white font-black uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-brand-dark transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <HiLockClosed className="h-4 w-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-sans">
          Protected area — authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    fetchOrders();

    // Real-time subscription for new orders
    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
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
      setDbError(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setDbError(true);
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
      toast.success('Order marked as completed!');
      fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error('Failed to update order status.');
    }
  };

  const markPending = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'pending' })
        .eq('id', id);

      if (error) throw error;
      toast.success('Order reverted to pending.');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Filter & search
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === 'all' || order.status === filter;
    const matchesSearch =
      !searchQuery ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_phone?.includes(searchQuery) ||
      order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  const handleLogout = () => {
    clearSession();
    toast.success('Logged out successfully.');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-100 shadow-soft sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
              <HiChartBar className="h-4 w-4 text-brand" />
            </div>
            <div>
              <h1 className="text-sm font-black font-display text-gray-950 uppercase tracking-wider">
                Admin Dashboard
              </h1>
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                EXTEND KART
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-50 border border-gray-100 text-gray-600 hover:text-red-500 hover:bg-red-50 hover:border-red-100 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <HiArrowRightOnRectangle className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <HiShoppingBag className="h-5 w-5 text-brand" />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-950 font-display block leading-none">
                  {orders.length}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Total Orders
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <HiClock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-950 font-display block leading-none">
                  {pendingCount}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Pending
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <HiCheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-950 font-display block leading-none">
                  {completedCount}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <HiCurrencyRupee className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-950 font-display block leading-none">
                  {formatPrice(totalRevenue)}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Total Revenue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Row */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-soft mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Status filter */}
          <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-gray-100">
            {(['all', 'pending', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-brand text-white shadow-glow'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {f === 'all' ? `All (${orders.length})` : f === 'pending' ? `Pending (${pendingCount})` : `Done (${completedCount})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full md:max-w-sm">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={fetchOrders}
            className="bg-gray-50 border border-gray-100 text-gray-600 hover:text-brand hover:bg-brand/5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Database error state */}
        {dbError && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 text-center">
            <HiExclamationTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-amber-800 mb-1">Database Connection Issue</h3>
            <p className="text-xs text-amber-600">
              Could not connect to the Supabase database. Make sure your Supabase project has an <code className="bg-amber-100 px-1 rounded">orders</code> table set up.
            </p>
          </div>
        )}

        {/* Orders List */}
        {loading ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-soft">
            <div className="w-8 h-8 border-3 border-brand/20 border-t-brand rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-400 font-medium">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-soft">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiShoppingBag className="h-6 w-6 text-gray-300" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {orders.length === 0 ? 'No orders yet' : 'No matching orders'}
            </h3>
            <p className="text-xs text-gray-400">
              {orders.length === 0
                ? 'Orders will appear here when customers complete checkout.'
                : 'Try changing the filter or search query.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  {/* Order details */}
                  <div className="flex-1 space-y-3">
                    {/* Header row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm font-mono">
                        {order.customer_name?.substring(0, 2)?.toUpperCase() || '??'}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-950 font-display leading-tight">
                          {order.customer_name || 'Unknown Customer'}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {order.created_at ? new Date(order.created_at).toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          }) : 'N/A'}
                        </span>
                      </div>
                      <span
                        className={`ml-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                      >
                        {order.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                      </span>
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      {order.customer_phone && (
                        <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1.5 hover:text-brand transition-colors">
                          <HiPhone className="h-3.5 w-3.5" />
                          <span>{order.customer_phone}</span>
                        </a>
                      )}
                      {order.customer_email && (
                        <a href={`mailto:${order.customer_email}`} className="flex items-center gap-1.5 hover:text-brand transition-colors">
                          <HiEnvelope className="h-3.5 w-3.5" />
                          <span>{order.customer_email}</span>
                        </a>
                      )}
                    </div>

                    {/* Items */}
                    <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Ordered Services
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {order.items?.map((item: any, i: number) => (
                          <span
                            key={i}
                            className="bg-white border border-gray-100 text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                          >
                            {item.name} <span className="text-brand font-bold">×{item.quantity}</span>
                          </span>
                        )) || <span className="text-xs text-gray-400">No items data</span>}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total:</span>
                      <span className="text-lg font-black text-brand font-display">
                        {formatPrice(order.total_amount || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Docs + Actions */}
                  <div className="flex flex-col gap-3 min-w-[180px]">
                    {/* Documents */}
                    {order.documents && order.documents.length > 0 && (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <HiDocumentText className="h-3.5 w-3.5" />
                          Documents ({order.documents.length})
                        </h4>
                        <div className="flex flex-col gap-1">
                          {order.documents.map((docUrl: string, i: number) => (
                            <a
                              key={i}
                              href={docUrl.replace(/\+/g, '%2B')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand hover:underline text-xs truncate block font-medium"
                            >
                              📄 Document {i + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => markComplete(order.id)}
                        className="bg-brand text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-brand-dark transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-glow"
                      >
                        <HiCheckCircle className="h-4 w-4" />
                        <span>Mark Completed</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => markPending(order.id)}
                        className="bg-gray-50 border border-gray-100 text-gray-500 font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <HiClock className="h-4 w-4" />
                        <span>Revert to Pending</span>
                      </button>
                    )}

                    {/* WhatsApp quick contact */}
                    {order.customer_phone && (
                      <a
                        href={`https://wa.me/91${order.customer_phone.replace(/\D/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-bold py-2 px-4 rounded-xl text-xs hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        💬 WhatsApp Customer
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ADMIN COMPONENT ──────────────────────────────────

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(getSession());

  return isAuthenticated ? (
    <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  );
}
