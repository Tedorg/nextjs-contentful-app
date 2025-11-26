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
    anwendungsbereich:"",
    bereiche:[],
    bereicheKinder:[],
  };

  try {
    const content = await client.getEntries({ content_type: "hypnosetherapie" });
    
    if (content?.items?.length) {
      const fields = content.items[0].fields ?? {};
      area.titel_a = fields.titel1 ?? "";
      area.titel_b = fields.titel2 ?? "";
      area.beschreibung = fields.beschreibung ?? "";
      area.reference = fields.reference ?? "";
      area.anwendungsbereich = fields.anwendungsbereiche ?? "";
      area.bereiche = Array.isArray(fields.bereiche)
        ? [...fields.bereiche]
        : [];
      area.bereicheKinder = Array.isArray(fields.bereicheKinder)
        ? [...fields.bereicheKinder]
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
            <h1 className="style-header">{area.titel_a}</h1>
          </div>
                <div className="basis-2/3 style-text">
                
                
            <ExpandText text={area.beschreibung} reference={area.reference} />
          </div>
          
        
        </div>
           <div className="flex flex-col md:flex-row  justify-between content-start gap-1  py-10 px-4 ">
          <div className=" basis-1/3  ">
            <h1 className=" style-header">{area.titel_b}</h1>
          </div>
                <div className=" my-auto  basis-2/3 ">

                <div className=" style-text prose"><ReactMarkdown>{area.anwendungsbereich}</ReactMarkdown></div>
          </div>
        
        
        </div>


        <div className="flex flex-col md:flex-row  justify-between content-start gap-1 ">
           <div className=" basis-1/3  ">
           
               
       </div>
        
          <div className="  my-auto  basis-2/3 px-4 ">
          
         
         <Stagger items={area.bereiche} />

         <div className="py-10"></div>
           <Stagger items={area.bereicheKinder} />
          </div>
       
        </div>

         
      </section>
    </main>
  );
}
