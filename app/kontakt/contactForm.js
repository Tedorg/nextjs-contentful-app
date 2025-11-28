// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help

"use client" 
import "../globals.css"
import Image from 'next/image'

import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ExampleForm({ submitText }) {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="min-h-[400px] flex flex-col items-start">
         <Image
                                   src="/send.svg"
                             
                                   alt="Logo"
                                   width={130}
                                   height={40}
                                   
                                   className="my-1 "
                                   priority
                                 />
        <p className="style-lead text-stone-500">{submitText}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[300px]">
      <form className="grid gap-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-1.5">
        <label
          className="text-sm font-medium text-[--color-text-default]"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          className="w-full bg-transparent border-b border-[--color-border-default] focus:border-[--color-primary] transition-colors duration-200 px-1 py-2 text-[--color-text-default] placeholder:text-[--color-text-muted] focus:outline-none"
          name="name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <label
          className="text-sm font-medium text-[--color-text-default]"
          htmlFor="email"
        >
          E-Mail-Adresse
        </label>
        <input
          id="email"
          className="w-full bg-transparent border-b border-[--color-border-default] focus:border-[--color-primary] transition-colors duration-200 px-1 py-2 text-[--color-text-default] placeholder:text-[--color-text-muted] focus:outline-none"
          type="email"
          name="email"
          required
          onInvalid={(e) => e.target.setCustomValidity('Bitte eine gültige Email eingeben.')}
          onInput={(e) => e.target.setCustomValidity('')}
          placeholder="muster@domain.ch"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <label
          className="text-sm font-medium text-[--color-text-default]"
          htmlFor="number"
        >
          Telefonnummer
        </label>
        <input
          id="number"
          className="w-full bg-transparent border-b border-[--color-border-default] focus:border-[--color-primary] transition-colors duration-200 px-1 py-2 text-[--color-text-default] placeholder:text-[--color-text-muted] focus:outline-none"
          type="tel"
          name="number"
          placeholder="+41 79 123 45 67"
          pattern="^(\+41\s?[1-9]\d\s?\d{3}\s?\d{2}\s?\d{2}|0[1-9]\d\s?\d{3}\s?\d{2}\s?\d{2})$"
          required
          onInvalid={(e) => e.target.setCustomValidity('Bitte eine gültige Telefonnummer eingeben. Beispiele: +41 79 123 45 67 oder 079 123 45 67')}
          onInput={(e) => e.target.setCustomValidity('')}
        />
        <ValidationError prefix="Telefonnummer" field="number" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <label
          className="text-sm font-medium text-[--color-text-default]"
          htmlFor="message"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          className="w-full bg-transparent border-b border-[--color-border-default] focus:border-[--color-primary] transition-colors duration-200 px-1 py-2 text-[--color-text-default] placeholder:text-[--color-text-muted] focus:outline-none"
          name="message"
          
        />
        <ValidationError prefix="Nachricht" field="message" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="flex flex-row-reverse gap-x-6">
        <button
          className="style-inv-button"
          type="submit"
        >
          Senden
        </button>
      </div>
    </form>
    </div>
  );
}