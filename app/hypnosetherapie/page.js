import "../globals.css";
import { createClient } from "contentful";
import { revalidateTag } from "next/cache";
import ReactMarkdown from "react-markdown";
import ExpandText from "./expandText";
import Stagger from "./stagger";

export const generateMetadata = () => ({
  title: "Hypnosetherapie – Methoden & Bereiche",
  description: "Informationen zur Methode der Hypnosetherapie, Anwendungsbereiche und wissenschaftlicher Hintergrund.",
});

// Initialize Contentful client

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function Page() {
  let area = {
    beschreibung: "",
    reference:"",
    anwendungsbereiche:"",
    anwendungItems:[],
  };

  try {
    const content = await client.getEntries({ content_type: "hypnosetherapie" });
    if (content?.items?.length) {
      const fields = content.items[0].fields ?? {};
      area.beschreibung = fields.beschreibung ?? "";
      area.reference = fields.reference ?? "";
      area.anwendungsbereiche = fields.anwendungsbereiche ?? "";
      area.anwendungItems = Array.isArray(fields.anwendungItem)
        ? [...fields.anwendungItem]
        : [];
    }
  } catch (error) {
    console.error("Error fetching content:", error);
  }

  return (
    <main>
      <section className=" mx-auto md:w-auto max-w-[2000px]  pt-20">
      
 <div className="flex flex-col md:flex-row  justify-between content-start gap-1  py-12 border-b-1 px-4">
          <div className="basis-1/3  ">
            <h1 className="style-header">Über die Hypnosetherapie</h1>
          </div>
                <div className="basis-2/3 style-text">
                
                
            <ExpandText text={area.beschreibung} reference={area.reference} />
          </div>
          
        
        </div>
           <div className="flex flex-col md:flex-row  justify-between content-start gap-1  py-10 px-4 ">
          <div className=" basis-1/3  ">
            <h1 className=" style-header">Anwendung & Bereiche</h1>
          </div>
                <div className=" my-auto  basis-2/3 ">

                <div className=" style-text prose"><ReactMarkdown>{area.anwendungsbereiche}</ReactMarkdown></div>
          </div>
        
        
        </div>


        <div className="flex flex-col md:flex-row  justify-between content-start gap-1 ">
           <div className=" basis-1/3  ">
           
               
       </div>
        
          <div className="  my-auto  basis-2/3 px-4 ">
          
         
         <Stagger items={area.anwendungItems} />
          </div>
       
        </div>

         
      </section>
    </main>
  );
}
