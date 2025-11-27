import "../globals.css";
import { createClient } from "contentful";
import ReactMarkdown from "react-markdown";
import TextReveal from "./textReveal";

export const generateMetadata = () => ({
  title: "Angebot – Hypnosetherapie St. Gallen",
  description: "Übersicht über therapeutische Angebote, Methoden und Leistungen von Rahel Schmid.",
});

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function Page() {
  let items = [];
  let lead = { title: "", text: "", info: "" };

  try {
    const content = await client.getEntries({ content_type: "angebot" });

    if (content?.items?.length) {
      // optional lead text if present on the first returned item
      lead.text = content.items[0]?.fields?.item ?? "";
      lead.info = content.items[0]?.fields?.infos ?? "";

      // collect primary items from content.items
      const primary = Array.isArray(content.items) ? content.items : [];
      // also include any referenced entries if Contentful returned them in includes.Entry
      const includedEntries = Array.isArray(content.includes?.Entry) ? content.includes.Entry : [];

      const all = [...includedEntries];

      items = all
        .map((ref) => {
          const fields = ref?.fields ?? {};
          return {
            id: ref?.sys?.id ?? Math.random().toString(36).slice(2, 9),
            title: fields?.bezeichnung ?? "",
            text: fields?.beschreibung ?? "",
            info: fields?.info ?? "",
            order: fields?.order ?? 9999, // default high number if not set
          };
        })
        .sort((a, b) => a.order - b.order);
    }
  } catch (error) {
    console.error("Error fetching Angebot entries:", error);
  }

  return (
    <main>
      <section className="mx-auto md:w-auto max-w-[2000px]  pt-20 ">
        {/* Optional lead text */}
        {lead.text && (
          <div className=" hidden md:block h-75 place-content-center  style-opener whitespace-pre-line  px-4">
            <TextReveal text={lead.text} />
          </div>
        )}
        <div className="flex flex-col md:flex-row ">
          {items.map((item) => (
            <div key={item.id} className="basis-1/3 md:border-r-[0.5px] last:border-r-0  px-4 py-8 grid grid-col  place-content-start ">
                {/* Stagger will animate its children (here only one child: the title) */}

                <div className="style-header py-2">{item.title}</div>
     
                {/* Wrap the markdown text in a Stagger so title and text children animate in sequence */}

                <div className="style-text prose prose-neutral dark:prose-invert text-start">
                  <ReactMarkdown >{item.text}</ReactMarkdown>
                </div>

                  <div className=" visible md:hidden border-t-[0.5px] my-10 style-text  prose prose-neutral dark:prose-invert max-w-none">
                  <ReactMarkdown >{item.info}</ReactMarkdown>
                </div>

           
              

        
            </div>
          ))}
          
        </div>
          <div className=" flex flex-col md:flex-row  ">

                      {items.map((item) => (
            <div key={item.id} className="basis-1/3 hidden md:block md:border-r-[0.5px] last:border-r-0  px-4 py-8 grid grid-col  place-content-start ">
                {/* Stagger will animate its children (here only one child: the title) */}

            
     
                {/* Wrap the markdown text in a Stagger so title and text children animate in sequence */}


                  <div className="   my-10 style-text  prose prose-neutral dark:prose-invert max-w-none">
                  <ReactMarkdown >{item.info}</ReactMarkdown>
                </div>

           
              

        
            </div>
          ))}
            
          </div>
        
        {lead.info && (
          <div className="flex flex-col md:flex-row  gap-8 py-12 ">
            <div className="basis-3/3  text-sm px-4">
              <ReactMarkdown>{lead.info}</ReactMarkdown>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
