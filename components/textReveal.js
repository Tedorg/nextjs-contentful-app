'use client';
import ReactMarkdown from "react-markdown";

import { motion } from 'framer-motion';

export default function TextReveal({ text, delay = 0 }) {
  const words = text.split('\n');

  return (
<<<<<<< HEAD
    <div className="overflow-hidden flex flex-wrap">
=======
    <div className="overflow-hidden flex flex-wrap p-2">
>>>>>>> main
       
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-2 inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: delay + i * 0.08,
          }}
          style={{ display: 'inline-block' }}
        >
<<<<<<< HEAD
         <ReactMarkdown>{word}</ReactMarkdown>
=======
         <ReactMarkdown break>{word}</ReactMarkdown>
>>>>>>> main
        </motion.span>
      ))}
     
    </div>
  );
}
