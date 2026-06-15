import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, width = "100%", duration = 0.8 }) => {
  return (
    <div style={{ width, position: 'relative' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.98, filter: 'blur(20px)' },
          visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: duration, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
