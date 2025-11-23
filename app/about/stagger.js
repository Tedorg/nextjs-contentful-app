'use client';
import { motion, MotionConfig } from 'framer-motion';

export default function Stagger({ children, order = 0 }) {


  const containerVariants = {
    opened: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {},
  };

  const BASE_DELAY = 0.2;

  const itemVariants = (order) => ({
    closed: { opacity: 0, y: 20 },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        delay: order * BASE_DELAY,   // order 0 = 0s, order 1 = 0.4s, order 2 = 0.8s, etc.
        duration: 0.5,
        ease: "easeOut"
      }
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.4, ease: 'easeInOut' }}>
      <motion.div
        variants={containerVariants}
        initial="closed"
        animate="opened"
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants(order + index)}>
                {child}
              </motion.div>
            ))
          : (
              <motion.div key="single" variants={itemVariants(order)}>
                {children}
              </motion.div>
            )}
      </motion.div>
    </MotionConfig>
  );
}
