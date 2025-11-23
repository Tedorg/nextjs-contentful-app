"use client";

import Image from "next/image";
import Link from "next/link";
import "../app/globals.css";
import { useEffect, useState } from "react";
import { createClient } from "contentful";

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [callToActionText, setCallToActionText] = useState("Termin");
  const [navItems, setNavItems] = useState([
    "Service",
    "Kontakt",
    "Adresse",
    "Qualifikation",
    "Ethik Codex",
    "Preise",
    "FAQ",
  ]);

  useEffect(() => {
    setHasMounted(true);

    const fetchContent = async () => {
      try {
        const navItems = await client.getContentTypes(); // Fetch content types for the menu
        const content = await client.getEntries({ content_type: "home" });
        if (content?.items?.length) {
          setCallToActionText(content.items[0]?.fields?.callToActionText || "Termin");
         // setNavItems(navItems.items? || navItems);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  if (!hasMounted) return null;

  return (
    <header className={`fixed w-full px-2 py-4 top-0 z-10 transition-all duration-300 ease-in-out `}>
    
 
            
      <div className="mx-auto relative">
        <div className=" grid grid-cols-[4rem_auto_4rem] content-center">
          <div>
            <Image
              src="/logo_black.svg"
              alt="Logo"
              width={70}
              height={70}
              className="my-1"
              // className={`my-1 ${isMenuOpen ? "" : "mix-blend-difference"}`}
              priority
             
            />
          </div>

          {/* Book Me Button */}
          <Link href="/book">
            <button className="flex justify-between absolute right-20 border-1 border-(--foreground) bg-transparent px-3 py-1 m-1 rounded hover:bg-gray-700 transition">
              <span className="text-(--foreground) font-commons text-sm">{callToActionText}</span>
              <span className="ml-2">
                <Image
                  src="/appointment.svg"
                  alt="Termin"
                  width={20}
                   height={20}
                  style={{ height: "auto", width: "auto",  }}
                />
              </span>
            </button>
          </Link>

          {/* Hamburger Button */}
          <button
            className="relative mx-auto w-8 h-8  "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-[1px] bg-(--foreground) transition-transform translate-y-[-3px] duration-300 ease-in-out ${
                isMenuOpen ? " rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-(--foreground) transition-transform translate-y-[3px] duration-300 ease-in-out ${
                isMenuOpen ? " -rotate-45 translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="">
          <nav
            className={` inset-0 bg-[var(--background)] transition-all duration-500 ease-in-out overflow-hidden md:block ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-full  py-40 text-m grid grid-cols-1 gap-4 md:grid-cols-2">
              {navItems.map((item, i) => (
                <Link key={i} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className=" border-b-1 hover:underline">
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

