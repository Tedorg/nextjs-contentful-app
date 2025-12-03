import "../globals.css";
import { createClient } from "contentful";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import Stagger from "./stagger";

export const generateMetadata = () => ({
  title: "FAQ – Häufige Fragen zur Hypnosetherapie",
  description: "Antworten auf die wichtigsten Fragen rund um Hypnosetherapie und den Ablauf.",
});

export const revalidate = 300;

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function Page() {
  const faq ={
    items:[],
    text:"",
    buttonText:"",
    buttonLink:""
  }
 

  try {


    const content = await client.getEntries({ content_type: "faqs" });
    if (content?.items?.length) {
      
      faq.text = content.items[0].fields.beschreibung;

      const buttonMatch = faq.text.match(/\[([^\]]+)\]\(([^)]+)\)\{\:\s*\.btn\s*\}/);
      if (buttonMatch) {
        faq.buttonText = buttonMatch[1];
        faq.buttonLink = buttonMatch[2];
        faq.text = faq.text.replace(buttonMatch[0], ''); // Remove button MD from text
      }

      const FAQEntries = Array.isArray(content.includes.Entry)
        ? [...content.includes.Entry]
        : [];

      

      const FAQLength = FAQEntries.length || [];

      for (const ref of FAQEntries) {
        const fields = ref.fields || {};
        faq.items.push({
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
            <Stagger items={faq.items} />
            <div className="my-10 style-lead"><ReactMarkdown>{faq.text}</ReactMarkdown></div>

            {faq.buttonLink && faq.buttonText && (
              <Link href={faq.buttonLink}>
                <button className="style-inv-button">
                
                    {faq.buttonText}
                  
                </button>
              </Link>
            )}
          
          </div>
        </div>
      </section>
    </main>
  );
}
