"use client";

import { useState } from "react";
import { signUpSchema } from "@/lib/actions";

export default function Book() {
  const [state, setState] = useState({
    success: null,
    message: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const parsed = signUpSchema.safeParse(data);
    if (!parsed.success) {
      if (parsed.error) {
        setState({
          success: false,
          message: "Bitte füllen Sie alle Pflichtfelder korrekt aus.",
        });
      }
      return;
    }

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success === false && result.message) {
        setState({
          success: false,
          message: result.message,
        });
        return;
      }

      setState({
        success: true,
        message: "Vielen Dank für Ihre Anfrage!",
      });
    } catch (error) {
      setState({
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields here */}
      <button type="submit">Absenden</button>

      {state.message && (
        <p
          className={`text-center mt-4 text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}