import Image from "next/image";
import Link from "next/link";
import { createClient } from "contentful";
import ReactMarkdown from "react-markdown";

import CmsGradient from '@/components/Gradient';
import TextReveal from '@/components/textReveals'
import styles from "./page.module.css";
import { MobileMenu } from "@/components/HeaderFramerMo";
import Footer from "@/components/Footer";

export const generateMetadata = () => ({
  title: "Rahel Schmid – Hypnosetherapie & Wissenschaft",
  description: "Hypnosetherapie für Kinder, Jugendliche und Erwachsene in St. Gallen. Wissenschaftlich fundiert und einfühlsam.",
});

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});



export default async function Home() {

  const home = {
    title: "",
    text: "",
    gradients: [],
    buttonText: "",
    buttonLink:""

  }

  try {
    const content = await client.getEntries({ content_type: "home" });
    if (content?.items?.length) {

      home.title = content.items[0].fields.titel || "";
      home.text = content.items[0].fields.welcomeText || "";
      home.buttonText = content.items[0].fields.erfahreMehr || "";
      if (content?.items?.[0]?.fields?.cssGradiant?.length) {
        home.gradients = content.items[0].fields.cssGradiant.map(g => g.fields?.shape).filter(Boolean);
      }
      
      const buttonMatch = home.text.match(/\[([^\]]+)\]\(([^)]+)\)\{\:\s*\.btn\s*\}/);
       home.text = home.text.replace(buttonMatch[0], ''); // Remove button MD from text
          
          if (buttonMatch) {
           
            home.buttonText = buttonMatch[1];
            home.buttonLink = buttonMatch[2];
          }
      

    }
  } catch (error) {
    console.error("Error fetching ETHIK entries:", error);
  }




  return (
    <>
      <CmsGradient shapes={home.gradients} />
      <main className="mx-auto md:w-auto max-w-[2000px] px-4 pt-20 flex h-screen ">




        {/* <Image
          src="/pexels-adrian-ikematsu-blur-02.svg" // make sure this image is in /public
          alt="Full background"
          fill
          className="object-cover z-0 opacity-100 "
          priority
        />   */}

        {/* <div className=" absolute inset-0 bg-gradient-to-br from-orange-500 to-red-200 opacity-90 "></div>  */}
        <div className=" self-center ">
          <div className=" w-[100%] md:w-[80%]  md:ml-20 text-foreground ">
            <div className="text-xl md:text-2xl font-commons  m-2" >
                <TextReveal text={home.text}/>
            </div>
              {home.buttonText && (() => {
                
                return (
                  <Link href={home.buttonLink}>
                    <button
                      className="style-inv-button"
                      type="submit"
                    >
                      {home.buttonText}
                    </button>
                  </Link>
                );
              })()}
        

          </div>
          

        </div>
      </main>

      <Footer />
    </>
  );
}