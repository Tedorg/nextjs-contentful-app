
import "../globals.css";
import { createClient } from "contentful";
import Link from "next/link";
import ReactMarkdown from "react-markdown";



const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});




export default async function Page() {
  let items = [];
  const content = {
    title: "",
    text: ""
  };

  try {
    const res = await client.getEntries({ content_type: "datenschutz" });
    if (res?.items?.length) {
      content.text = res.items[0].fields.text || "";
      

      const Entries = Array.isArray(res.includes?.Entry)
        ? [...res.includes.Entry]
        : [];

      for (const ref of Entries) {
        const fields = ref.fields || {};
        items.push({
          id: ref.sys.id,
          question: fields.titel || fields.title || "Titel fehlt",
          answer: fields.beschreibung || fields.body || "",
        });
      }
    }
  } catch (error) {
    console.error("Error fetching ETHIK entries:", error);
  }

  return (
    <main>
      <section className="mx-auto md:w-auto max-w-[2000px] px-4 pt-20">
        <div className="flex flex-col md:flex-row justify-between content-start gap-1 py-12">
      
          <div className="basis-3/3">
        
          <div className="prose prose-neutral dark:prose-invert max-w-none">
  <ReactMarkdown>{content.text}</ReactMarkdown>
</div>
           
            <div className="mt-10">
           
                {items.map((item) => (
                    <div>{item}</div>
                ))}
             
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// function EthikItem({ item }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b border-black">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
//         aria-expanded={open}
//         aria-controls={`ethik-answer-${item.id}`}
//       >
//         <span className="text-xl font-medium">{item.question}</span>
//         <span
//           className={`transition-transform duration-300 font-thin text-4xl ${
//             open ? "rotate-45" : "rotate-0"
//           }`}
//         >
//           +
//         </span>
//       </button>
//       <div
//         id={`ethik-answer-${item.id}`}
//         className={`overflow-hidden transition-all duration-300 px-4 ${
//           open ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0 py-0"
//         }`}
//       >
//         <div className="prose prose-sm">
//           <ReactMarkdown>{item.answer}</ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }