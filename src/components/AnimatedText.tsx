import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  gradient?: boolean;
}

// Word-by-word reveal animation
export function WordReveal({ text, className = '', delay = 0, tag: Tag = 'h2' }: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

// Gradient animated text
export function GradientText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #1D9E75, #F3B200, #009EE2, #1D9E75)',
      }}
    >
      {text}
    </span>
  );
}

// Letter-by-letter typing effect
export function TypeWriter({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.03,
            delay: delay + i * 0.04,
          }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-brand ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}
