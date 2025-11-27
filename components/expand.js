"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Stagger({ item }) {
  return (
    <div className="space-y-0">
      {/* {items.map((item) => (
        <FAQItem key={item.id} item={item} />
      ))} */}
       <Item key={item.id} item={item} />

    </div>
  );
}

function Item({ item }) {
  const [open, setOpen] = useState(false);
  

  return (
    <div className="border-b-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
        aria-expanded={open}
        aria-controls={`answer-${item.id}`}
      >
        <span className="text-xl font-medium">{item.question}</span>
        <span
          className={`transition-transform duration-300 font-thin text-4xl ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      <div
        id={`answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 px-4 ${
          open ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="prose prose-sm">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
