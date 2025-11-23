import "../globals.css";
import { createClient } from "contentful";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import Stagger from "./stagger";

export const generateMetadata = () => ({
  title: "FAQ – Häufige Fragen zur Hypnosetherapie",
  description: "Antworten auf die wichtigsten Fragen rund um Hypnosetherapie und den Ablauf.",
});

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function Page() {
  let items = [];
  let text = ""

  try {


    const content = await client.getEntries({ content_type: "faqs" });
    if (content?.items?.length) {
      text = content.items[0].fields.beschreibung;
      const FAQEntries = Array.isArray(content.includes.Entry)
        ? [...content.includes.Entry]
        : [];

      const FAQLength = FAQEntries.length || [];

      for (const ref of FAQEntries) {
        const fields = ref.fields || {};
        items.push({
          id: ref.sys.id,
          question: fields.item || fields.item || fields.title || "Frage fehlt",
          answer: fields.antwort || fields.answer || fields.description || fields.body || "",
        });

      }
    }
  } catch (error) {
    console.error("Error fetching FAQ entries:", error);
  }

return (
    <main>
      <section className="mx-auto md:w-auto max-w-[2000px] px-4 pt-20">
        <div className="flex flex-col md:flex-row  justify-between content-start gap-1 py-12 max-w-6xl">
          <div className=" basis-2/10  ">
            <div className="style-header">FAQ</div>
          </div>
          <div className=" basis-8/10  ">
            <Stagger items={items} />
            <div className="mt-20 style-lead"><ReactMarkdown>{text}</ReactMarkdown></div>
            <Link href="/kontakt">
              <button className=" md:block mr-17 border-1 mt-4 rounded-3xl  bg-(--foreground)  py-1 px-4  hover:bg-gray-700 transition whitespace-nowrap">
                <span className=" style-text text-(--background)">
                  Kontakieren Sie mich
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
