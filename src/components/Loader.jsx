import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = ["Hello", "Bonjour", "こんにちは", "Hallo", "Ciao", "Hola", "안녕하세요", "नमस्ते"];

const Loader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 250);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center text-white text-5xl md:text-7xl font-medium"
      initial={{ y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 1, ease: [0.8, 0, 0.2, 1] }}
    >
      <h1 className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {greetings[index]}
      </h1>
    </motion.div>
  );
};

export default Loader;
