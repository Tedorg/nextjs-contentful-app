"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Stagger({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item) => (
        <FAQItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  

  return (
    <div className="border-b-[0.5] border-black ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-5 text-left focus:outline-none"
        aria-expanded={open}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="style-lead">{item.question}</span>
        <span
          className={`transition-transform duration-300 font-thin text-4xl ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 px-4 ${
          open ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="mb-5 style-text ">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
