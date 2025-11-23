"use client";
import { useEffect } from "react";

export default function TallyEmbed({ url }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src={url}
      loading="lazy"
      width="100%"
      height="400"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Kontaktformular"
    ></iframe>
  );
}