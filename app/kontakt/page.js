import "../globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "./MapView";
import Stagger from "./stagger"
import Form from "./contactForm"
import ReactMarkdown from "react-markdown";
import TextReveal from "./textReveal";

export const generateMetadata = () => ({
  title: "Kontakt – Rahel Schmid Hypnosetherapie",
  description: "Kontaktinformationen, Praxisadresse und Anreisebeschreibung zur Praxis Rahel Schmid.",
});

export const revalidate = 300;

export default async function Page() {
  let kontakt = {};

  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=kontakt&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
        next: { tags: ['kontakt'] },
      }
    );
    const data = await res.json();
    kontakt = data.items[0]?.fields || {};
  } catch (error) {
    console.error("Error fetching content:", error);
  }

  let coordinates = null;
  if (kontakt.karte) {
    try {
      const [lat, lng] = kontakt.karte.split(",").map((val) => parseFloat(val.trim()));
      coordinates = [lat, lng];
    } catch (e) {
      console.error("Invalid coordinates:", kontakt.karte);
    }
  }

  return (
    <main>
      <section className="mx-auto max-w-[2000px] px-0 pt-30 space-y-5">
        {/* Row 1: Lead */}
        {kontakt.lead && (

          <div className=" hidden md:block h-75 place-content-center  style-opener whitespace-pre-line  border-b-[0.5] px-4">

            <Stagger order={0}>
              <TextReveal text={kontakt.lead} />
            </Stagger>


          </div>
        )}

        {/* Row 2: Kontakt + Kontaktformular */}
           <div className=" whitespace-pre-line px-4   flex items-center "> 
             <div className="style-header  ">  
               <TextReveal text="Kontakt" />
               </div
               ></div>
        <div className="flex flex-col md:flex-row gap-10 border-b-[0.5] ">
          {/* Left Column: Name, Phone, Email */}
         
         
          <div className=" basis-2/7 space-y-1  flex flex-row md:flex-col my-10 ">

            {kontakt.adresse?.map((item, idx) => (
              <div key={idx} className="px-3 style-text prose whitespace-pre-line">
                <Stagger order={0}>
                  {item.includes(";") ? (
                    item.split(";").map((part, i) => (
                      <div key={i}>{part.trim()}</div>
                    ))
                  ) : (
                    { item }
                  )}
                </Stagger>
              </div>

            ))}
          </div>

          {/* Right Column: Form Title + Formspree */}
          <div className="pb-20 style-lead basis-5/7  border-t-[0.5] md:border-t-0 px-4 pt-10 space-y-15">
            <Stagger order={0}>
              <TextReveal text={kontakt.formulartext} />
            </Stagger>
            <Stagger order={2}>
              <Form submitText={kontakt.formularNachricht} />
            </Stagger>
          </div>




        </div>

        {/* Row 3: Anreise + Karte */}
          <div className=" whitespace-pre-line px-4   flex items-center "> 
             <div className="style-header  ">  
               <TextReveal text="Anreise" />
               </div
               ></div>
        <div className=" flex flex-col md:flex-row gap-10   px-4 ">
          {/* Left Column: Anreise Info */}
          <div className="basis-3/7 my-10 space-y-4 ">
          
            {kontakt.anreise?.split("\n").map((item, idx) => (
              <Stagger order={4 + idx} key={idx}>
                <ReactMarkdown components={{ p: ({ children }) => < div className="style-text">{children}</div> }}>
                  {item.trim()}
                </ReactMarkdown>
              </Stagger>
            ))}
          </div>

          {/* Right Column: Map */}
          <div className="basis-4/7 my-10 p-3">
            {coordinates && <MapView coordinates={coordinates} />}
          </div>












          
        </div>
      </section>
    </main>
  );
}
