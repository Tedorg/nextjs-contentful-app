'use client';
import { motion, MotionConfig } from 'framer-motion';

export default function Stagger({ items = [] }) {
  if (!items.length) return null;


  const containerVariants = {
    opened: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {},
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    opened: { opacity: 1, y: 0 },
  };

  return (
    <MotionConfig transition={{ duration: 0.4, ease: 'easeInOut' }}>
      <motion.div
        variants={containerVariants}
        initial="closed"
        animate="opened"
        className='mx-auto  grid max-w-lg grid-cols-1 items-center gap-x-2  sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-2'
        
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            
          >
           <div className='text-ms py-5  border-b-1  max-h-30 w-full text-left'>{item}</div> 
          </motion.div>
        ))}
      </motion.div>
    </MotionConfig>
  );
}
