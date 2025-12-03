import Image from 'next/image';
import { getEntry, getImageUrl } from "@/lib/contentful";
import ReactMarkdown from "react-markdown";
import Stagger from "../../components/stagger";
import TextReveal from "../../components/textReveal";
import Expand from "../../components/expand";

export const generateMetadata = () => ({
  title: "Über mich – Rahel Schmid Hypnosetherapie",
  description: "Einblick in die therapeutische Arbeit, Qualifikationen und ethischen Leitlinien von Rahel Schmid.",
});

export const revalidate = 300;


export default async function Page() {
  let items = [];
  const about = {
    id:"",
    title: "",
    lead: "",
    text: "",
    images: []
  };
  const ethic = {
    id:"",
    title: "",
    text: "",
    notes:[],
    items: []
  };
  let diplomeText = "";
  let diplomeImages = [];

  try {
    const resolved = await getEntry("aboutMe");

    if (resolved) {
      about.lead = resolved.lead ?? "";
      about.text = resolved.aboutMeText ?? "";
      about.images = Array.isArray(resolved.portrait)
        ? resolved.portrait.map((img) => ({
            url: getImageUrl(img),
            alt: img.title || "An Image",
            description: img.description || "",
            width: img.file?.details?.image?.width,
            height: img.file?.details?.image?.height,
          }))
        : [];

      ethic.text = resolved.ethikLead ?? "";
      if (ethic.text.includes("~")) {
        const [mainText, ...notes] = ethic.text.split("~");
        ethic.text = mainText.trim();
        ethic.notes = notes.map((note) => note.trim()).filter(Boolean);
      }

      const entries = Array.isArray(resolved.ethik) ? resolved.ethik : [];
      ethic.items = entries
        .map((item, idx) => {
          const title = item.titel?.trim() || "";
          const answer = item.beschreibung?.trim() || "";
          if (!title && !answer) return null;
          return {
            id: item.sys?.id || `ethik-${idx}`,
            question: title,
            answer: answer,
          };
        })
        .filter(Boolean);

      diplomeText = resolved.qualifikation ?? "";
      diplomeImages = Array.isArray(resolved.diplome)
        ? resolved.diplome.map((img) => ({
            url: getImageUrl(img),
            alt: img.title || "Diplom",
            description: img.description || "",
            width: img.file?.details?.image?.width,
            height: img.file?.details?.image?.height,
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
                      <TextReveal text={about.lead} />
                    </Stagger>
        
        
                  </div>

        <div className="flex flex-col md:flex-row justify-evenly  gap-20  px-4">
       
          <div className=" basis-3/7 space-y-4 md:ml-10 ">
                {about.text.split("\n\n").map((paragraph, idx) => (
              <Stagger order={1 + idx} key={idx}>
                <ReactMarkdown components={{ p: ({ children }) => <div className="style-text prose">{children}</div> }}>
                  {paragraph.trim()}
                </ReactMarkdown>
              </Stagger>
            ))}

  </div>
   <div className="basis-4/7 pl-12 md:pl-20 ">
              {about.images.map((img, idx) => (
                   <div key={idx} className="max-w-100 flex flex-col overflow-hidden p-3">
                     <Image
                       src={img.url}
                       alt={img.alt}
                       width={img.width}
                       height={img.height}
                       loading="lazy"
                       className="rounded object-cover h-[550px] w-auto max-w-full"
                     />
                     {img.description && (
                       <p className="mt-2 text-sm text-neutral-700  max-w-[80%]">
                         {img.description}
                       </p>
                     )}
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

      <div className="flex flex-col md:flex-row   justify-stretch content-start gap-1  py-10 border-t-[0.5px]">
          <div className="basis-2/7 px-4 pt-10 pb-10  space-y-2">
           <Stagger order={5}>
          <div className='md:pb-20 style-lead'>{diplomeText}</div >
        </Stagger>
          </div>
       
<div className="flex items-center gap-6 h-[400px] w-full max-w-5xl mt-10 mx-auto">
  {diplomeImages.map((img, idx) => (
    <div
      key={idx}
      className="relative group flex-grow transition-all w-56 h-[400px] duration-300 hover:w-full overflow-hidden "
    >
      <Image
        src={img.url}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        className="rounded h-full w-full object-contain object-center"
      />

      {/* Overlay */}
      <div
        className=" flex flex-col justify-end p-10 text-white
                   
                   transition-all duration-300"
      >
        {/* Title */}
        {img.alt && (
          <h1 className="text-2xl font-medium">
            {img.alt}
          </h1>
        )}

        {/* Description */}
        {img.description && (
          <p className="text-sm mt-2 max-w-[90%]">
            {img.description}
          </p>
        )}
      </div>
    </div>
  ))}
</div>




   </div>

      </section>


    </main>
  );




}





 // import Image from 'next/image'

// import { createClient } from 'contentful';
// import ReactMarkdown from "react-markdown";
// import Stagger from "./stagger";
// import TextReveal from "./textReveal";
// import Expand from "./expand";

// export const generateMetadata = () => ({
//   title: "Über mich – Rahel Schmid Hypnosetherapie",
//   description: "Einblick in die therapeutische Arbeit, Qualifikationen und ethischen Leitlinien von Rahel Schmid.",
// });


// // Initialize Contentful client
// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
// });

// // const content ={
// //   title:"",
// //   lead:"",
// //   text:"",
// //   images:[]
// // }


// // export default async function AboutPage() {
// //     const response = await client.getEntries({ content_type: 'aboutMe' })

// //  if (!response?.items?.length) return null

// //   const about = response.items[0].fields

// //   const rawText = about.aboutMeText.replace(/\#+/g,'')
// //   const paragraphs= rawText.split(/\n\s*\n/); // split by empty lines
// //   const images = about.portrait.map((img) => ({
// //     url: `https:${img.fields.file.url}`,
// //     alt: img.fields.title || 'About image',
// //     width: img.fields.file.details.image.width,
// //     height: img.fields.file.details.image.height,
// //   }))


// export default async function Page() {
//   let items = [];
//   const entry = {
//     title: "",
//     lead: "",
//     text: "",
//     images: []
//   };
//   const ethic = {
//     title: "",
//     text: "",
//     notes:[],
//     items: []
//   };
//   let diplomeText = "";
//   let diplomeImages = [];

//   try {
//     const res = await client.getEntries({ content_type: "aboutMe" });
//     if (res?.items?.length) {
//       entry.lead = res.items[0]?.fields?.lead ?? "";
//       entry.text = res.items[0]?.fields?.aboutMeText ?? "";
//       entry.images = res.items[0].fields.portrait.map((img) => ({
//         url: `https:${img.fields.file.url}`,
//         alt: img.fields.title || 'An Images',
//         description: img.fields.description || "",
//         width: img.fields.file.details.image.width,
//         height: img.fields.file.details.image.height,
//       }))
//       // ethic.title = res.items[0]?.fields?.ethikTitel ?? "";  items[0].fields.lead
//  ethic.text = res.items[0]?.fields?.ethikLead ?? "";
//       if (ethic.text.includes("~")) {
//         const [mainText, ...notes] = ethic.text.split("~");
//         ethic.text = mainText.trim();
//         ethic.notes = notes.map((note) => note.trim()).filter(Boolean);
//       }
    
//       const entries = Array.isArray(res.items[0]?.fields?.ethik) ? res.items[0].fields.ethik : [];

//       ethic.items = entries
//         .map((ref, idx) => {
//           const fields = ref.fields || {};
//           const title = fields.titel?.trim() || "";
//           const answer = fields.beschreibung?.trim() || "";

//           // Skip entirely if both title AND answer are empty
//           if (!title && !answer) return null;

//           return {
//             id: ref.sys.id || `ethik-${idx}`,
//             question: title,
//             answer: answer,
//           };
//         })
//         .filter(Boolean);

//       diplomeText = res.items[0]?.fields?.qualifikation ?? "";
//       diplomeImages = Array.isArray(res.items[0]?.fields?.diplome)
//         ? res.items[0].fields.diplome.map((img) => ({
//             url: `https:${img.fields.file.url}`,
//             alt: img.fields.title || 'Diplom',
//             description: img.fields.description || "",
//             width: img.fields.file.details.image.width,
//             height: img.fields.file.details.image.height,
//           }))
//         : [];
//     }
//   } catch (error) {
//     console.error("Error fetching About me entries:", error);
//   }




//   return (
//     <main>
//       <section className="mx-auto max-w-[2000px] px-0 pt-30 ">

//             <div className="  style-opener whitespace-pre-line md:pb-10  px-4">
        
//                     <Stagger order={0}>
//                       <TextReveal text={entry.lead} />
//                     </Stagger>
        
        
//                   </div>

//         <div className="flex flex-col md:flex-row justify-evenly  gap-20  px-4">
       
//           <div className=" basis-3/7 space-y-4 md:ml-10 ">
//                 {entry.text.split("\n\n").map((paragraph, idx) => (
//               <Stagger order={1 + idx} key={idx}>
//                 <ReactMarkdown components={{ p: ({ children }) => <div className="style-text prose">{children}</div> }}>
//                   {paragraph.trim()}
//                 </ReactMarkdown>
//               </Stagger>
//             ))}

//   </div>
//    <div className="basis-4/7 pl-12 md:pl-20 ">
//               {entry.images.map((img, idx) => (
//                    <div key={idx} className="max-w-100 flex flex-col overflow-hidden p-3">
//                      <Image
//                        src={img.url}
//                        alt={img.alt}
//                        width={img.width}
//                        height={img.height}
//                        loading="lazy"
//                        className="object-cover h-[550px] w-auto max-w-full"
//                      />
//                      {img.description && (
//                        <p className="mt-2 text-sm text-neutral-700  max-w-[80%]">
//                          {img.description}
//                        </p>
//                      )}
//                    </div>
//                  ))}
//   </div>


      

//         </div>
       
       
       
//         <div className="flex flex-col md:flex-row  justify-stretch content-start gap-1  py-10 ">
//           <div className="basis-3/7 px-4 pt-20 pb-10 border-t-[0.5px] space-y-2">
    
//           <Stagger order={3}>
//             <div className="style-lead whitespace-pre-line">
//               <TextReveal text={ethic.text} />
//             </div>
//           </Stagger>
//           </div>
//            <div className="basis-4/7 px-4 md:pt-20 pb-10 md:border-t-[0.5px] space-y-2">
//           <div className="mt-10">
//             {ethic.items.map((item, idx) => (
//               <Stagger order={4 + idx} key={idx}>
//                 <Expand item={{ id: idx, question: item.question, answer: item.answer }} />
//               </Stagger>
//             ))}
//           </div>
//         </div>


//         </div>
//              <div className="    px-4">
        
//                                {ethic.notes.length > 0 && (
//             <div className="mt-6 text-sm text-neutral-800">
//               {ethic.notes.map((note, idx) => (
//                 <div key={idx} className="mb-1">
//                   * {note}
//                 </div>
//               ))}
//             </div>
//           )}
        
        
//                   </div>

//       <div className="flex flex-col md:flex-row   justify-stretch content-start gap-1  py-10 border-t-[0.5px]">
//           <div className="basis-2/7 px-4 pt-10 pb-10  space-y-2">
//            <Stagger order={5}>
//           <div className='md:pb-20 style-lead'>{diplomeText}</div >
//         </Stagger>
//           </div>
       
// <div className="flex items-center gap-6 h-[400px] w-full max-w-5xl mt-10 mx-auto">
//   {diplomeImages.map((img, idx) => (
//     <div
//       key={idx}
//       className="relative group flex-grow transition-all w-56 h-[400px] duration-300 hover:w-full overflow-hidden "
//     >
//       <Image
//         src={img.url}
//         alt={img.alt}
//         width={img.width}
//         height={img.height}
//         loading="lazy"
//         className="h-full w-full object-contain object-center"
//       />

//       {/* Overlay */}
//       <div
//         className=" flex flex-col justify-end p-10 text-white
                   
//                    transition-all duration-300"
//       >
//         {/* Title */}
//         {img.alt && (
//           <h1 className="text-2xl font-medium">
//             {img.alt}
//           </h1>
//         )}

//         {/* Description */}
//         {img.description && (
//           <p className="text-sm mt-2 max-w-[90%]">
//             {img.description}
//           </p>
//         )}
//       </div>
//     </div>
//   ))}
// </div>




//    </div>

//       </section>


//     </main>
//   );




// }





 