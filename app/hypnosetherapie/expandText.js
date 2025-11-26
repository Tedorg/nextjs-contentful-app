"use client";
import "../globals.css";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ExpandText({ text, reference }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : "8rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden relative"
      >
        <div className=" prose ">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[--background] to-transparent pointer-events-none" />
        )}
        {expanded && reference && (
          <div className="ml-5 mt-6 border-t pt-4 text-sm prose text-gray-600 indent-[-10px]">
            <h3 className="">Quellen</h3>
            <ReactMarkdown>{reference}</ReactMarkdown>
          </div>
        )}
      </motion.div>
      <button
        onClick={toggleExpanded}
        className="my-4 rounded-3xl  bg-(--foreground) text-(--background) text-sm py-1 px-4  hover:bg-gray-700 transition whitespace-nowrap "
      >
        {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
      </button>
    </div>
  );
}
