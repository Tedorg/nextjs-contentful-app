import Image from 'next/image'

import { createClient } from 'contentful';
import ReactMarkdown from "react-markdown";
import Stagger from "./stagger";
import TextReveal from "./textReveal";
import Expand from "./expand";

export const generateMetadata = () => ({
  title: "Über mich – Rahel Schmid Hypnosetherapie",
  description: "Einblick in die therapeutische Arbeit, Qualifikationen und ethischen Leitlinien von Rahel Schmid.",
});


// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// const content ={
//   title:"",
//   lead:"",
//   text:"",
//   images:[]
// }


// export default async function AboutPage() {
//     const response = await client.getEntries({ content_type: 'aboutMe' })

//  if (!response?.items?.length) return null

//   const about = response.items[0].fields

//   const rawText = about.aboutMeText.replace(/\#+/g,'')
//   const paragraphs= rawText.split(/\n\s*\n/); // split by empty lines
//   const images = about.portrait.map((img) => ({
//     url: `https:${img.fields.file.url}`,
//     alt: img.fields.title || 'About image',
//     width: img.fields.file.details.image.width,
//     height: img.fields.file.details.image.height,
//   }))


export default async function Page() {
  let items = [];
  const entry = {
    title: "",
    lead: "",
    text: "",
    images: []
  };
  const ethic = {
    title: "",
    text: "",
    notes:[],
    items: []
  };
  let diplomeText = "";
  let diplomeImages = [];

  try {
    const res = await client.getEntries({ content_type: "aboutMe" });
    if (res?.items?.length) {
      entry.lead = res.items[0]?.fields?.lead ?? "";
      entry.text = res.items[0]?.fields?.aboutMeText ?? "";
      entry.images = res.items[0].fields.portrait.map((img) => ({
        url: `https:${img.fields.file.url}`,
        alt: img.fields.title || 'An Images',
        width: img.fields.file.details.image.width,
        height: img.fields.file.details.image.height,
      }))
      // ethic.title = res.items[0]?.fields?.ethikTitel ?? "";  items[0].fields.lead
 ethic.text = res.items[0]?.fields?.ethikLead ?? "";
      if (ethic.text.includes("~")) {
        const [mainText, ...notes] = ethic.text.split("~");
        ethic.text = mainText.trim();
        ethic.notes = notes.map((note) => note.trim()).filter(Boolean);
      }
    
      const entries = Array.isArray(res.items[0]?.fields?.ethik) ? res.items[0].fields.ethik : [];

      ethic.items = entries.map((ref, idx) => {
        const fields = ref.fields || {};
        return {
          id: ref.sys.id || `ethik-${idx}`,
          question: fields.titel || "Kein Titel",
          answer: fields.beschreibung || "",
        };
      });

      diplomeText = res.items[0]?.fields?.qualifikation ?? "";
      diplomeImages = Array.isArray(res.items[0]?.fields?.diplome)
        ? res.items[0].fields.diplome.map((img) => ({
            url: `https:${img.fields.file.url}`,
            alt: img.fields.title || 'Diplom',
            width: img.fields.file.details.image.width,
            height: img.fields.file.details.image.height,
          }))
        : [];
    }
  } catch (error) {
    console.error("Error fetching About me entries:", error);
  }




  return (
    <main>
      <section className="mx-auto max-w-[2000px] px-0 pt-30 ">

            <div className="  style-opener whitespace-pre-line md:pb-10  px-4">
        
                    <Stagger order={0}>
                      <TextReveal text={entry.lead} />
                    </Stagger>
        
        
                  </div>

        <div className="flex flex-col md:flex-row justify-between content-start gap-10  px-4">
       
          <div className=" basis-3/7 space-y-4 md:ml-10">
                {entry.text.split("\n\n").map((paragraph, idx) => (
              <Stagger order={1 + idx} key={idx}>
                <ReactMarkdown components={{ p: ({ children }) => <div className="style-text">{children}</div> }}>
                  {paragraph.trim()}
                </ReactMarkdown>
              </Stagger>
            ))}

  </div>
   <div className="basis-4/7 mx-auto xl:translate-x-40 xl:-translate-y-10 ">
              {entry.images.map((img, idx) => (
                   <div key={idx} className="max-w-100 flex justify-center overflow-hidden p-3">
                     <Image
                       src={img.url}
                       alt={img.alt}
                       width={img.width}
                       height={img.height}
                       loading="lazy"
                       className="object-cover h-[550px] w-auto max-w-full"
                     />
                   </div>
                 ))}
  </div>


      

        </div>
       
       
       
        <div className="flex flex-col md:flex-row  justify-stretch content-start gap-1  py-10 ">
          <div className="basis-3/7 px-4 pt-20 pb-10 border-t-[0.5px] space-y-2">
    
          <Stagger order={3}>
            <div className="style-lead whitespace-pre-line">
              <TextReveal text={ethic.text} />
            </div>
          </Stagger>
          </div>
           <div className="basis-4/7 px-4 md:pt-20 pb-10 md:border-t-[0.5px] space-y-2">
          <div className="mt-10">
            {ethic.items.map((item, idx) => (
              <Stagger order={4 + idx} key={idx}>
                <Expand item={{ id: idx, question: item.question, answer: item.answer }} />
              </Stagger>
            ))}
          </div>
        </div>


        </div>
             <div className="    px-4">
        
                               {ethic.notes.length > 0 && (
            <div className="mt-6 text-sm text-neutral-800">
              {ethic.notes.map((note, idx) => (
                <div key={idx} className="mb-1">
                  * {note}
                </div>
              ))}
            </div>
          )}
        
        
                  </div>

      <div className="flex flex-col md:flex-row   justify-stretch content-start gap-1  py-0 border-t-[0.5px]">
          <div className="basis-2/7 px-4 pt-10 pb-10  space-y-2">
           <Stagger order={5}>
          <div className='md:pb-20 style-lead'>{diplomeText}</div >
        </Stagger>
          </div>
       



        <div className="basis-5/7   mt-4 flex flex-wrap gap-4">
          {diplomeImages.map((img, idx) => (
            <div key={idx} className="mx-auto w-90 flex items-center justify-center overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="object-cover max-h-120"
              />
            </div>
          ))}
        </div>
      </div>

   

      </section>


    </main>
  );




}






//   return (
//     <>
//       <main>
//              <section className="  mx-auto md:w-auto max-w-[2000px] px-4 pt-20">
//                <div className="flex flex-col md:flex-row  justify-between content-start gap-1  py-12 border-b-1">
//                  {/* Row 1 - Textual Content */}
//                  <div className="space-y-6 ">
//                    <h1 className="text-sm font-medium">{about.title || 'Über mich'}</h1>
//                  </div>
//                  <div className="space-y-6 ">
//                    {paragraphs[0] && (
//                      <h2 className="text-2xl ">{paragraphs[0]}</h2>
//                    )}
//                  </div>
//                  <div className="space-y-4 font-normal">
//                    {paragraphs.slice(1).map((p, idx) => (
//                      <p key={idx} className="text-lg  ">{p}</p>
//                    ))}
//                  </div>
// <div></div>
//                  {/* Row 2 - Images */}
//                  {images.map((img, idx) => (
//                    <div key={idx} className="w-full flex justify-center overflow-hidden">
//                      <Image
//                        src={img.url}
//                        alt={img.alt}
//                        width={img.width}
//                        height={img.height}
//                        loading="lazy"
//                        className="object-cover h-[550px] w-auto max-w-full"
//                      />
//                    </div>
//                  ))}
//                </div>
//              </section>
//            </main>
//     </>
//   );
// }