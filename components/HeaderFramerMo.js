'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import "../app/globals.css";

import { useEffect, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { createClient } from "contentful";

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const MobileMenu = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);

  const [callToActionText, setCallToActionText] = useState("Termin vereinbaren");
  const [navItems, setNavItems] = useState(null);

  const menu = {
    opened: {
      y: 0,
      opacity: 0.99,
    },
    closed: {
      y: '-100%',
      opacity: 0,
    },
  };

  const containerVariants = {
    opened: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    closed: {}
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30 },
    opened: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setDataOpen(isOpen), 250);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {

    const fetchContent = async () => {
      try {
        const content = await client.getEntries({ content_type: "home" });
        if (content?.items?.length) {


          setCallToActionText(content.items[0]?.fields?.callToActionText || "Termin");

          const contentTypes = await client.getContentTypes();
          const filteredNav = contentTypes.items
            .filter(item => {
              const navField = item.fields.find(field => field.id === 'navMenu');
              return navField && navField.name === "Nav-Menu";
            })
            .map(item => ({
              href: `/${item.sys.id}`,
              label: item.name
            }));
          setNavItems(filteredNav);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  // Full-screen fixed container so we can center vertically on mobile
  const isHomePage = pathname === '/' || pathname === '/home';
  return (
    <div className={" fixed inset-0 z-10 px-0  h-10 max-w-[2000px] mx-auto  "}>
      {/* inner max-width wrapper so layout stays consistent on wide screens */}
      {/* 3-column grid: left logo, center (can be used for title), right buttons */}
      <div className={`${isHomePage ? 'bg-transparent' : 'bg-(--background)'} grid grid-cols-[4rem_auto_4rem] items-center h-20  px-4`}>
        {/* LEFT: logo */}
        <div className=" block md:hidden flex items-center  z-20 w-40">
          <Link href="/">
            <Image
              src="/Logo_exp_mobile.svg"

              alt="Logo"
              width={130}
              height={40}

              className="my-1 "
              priority
            />
          </Link>
        </div>
        <div className="hidden md:block flex items-center  z-20 w-80">
          <Link href="/">
            <Image
              src="/Logo_exp_desktop.svg"
              alt="Logo"
              width={340}
              height={70}
              className="my-1 "
              priority
            />
          </Link>
        </div>

        {/* CENTER: (empty for now) — keeps spacing; you can put a title here */}
        <div className="flex items-center justify-center ">
          {/* optional center content */}
        </div>

        {/* RIGHT: CTA button + hamburger control, aligned right */}
        <div className=" flex  z-20  items-center justify-end space-x-3  ">
          <Link href="/booking"  onClick={() => setOpen(false)}>
            <button className=" hidden md:block mr-17 style-button ">
              <span className="  text-(--background)">
                {callToActionText}
              </span>
            </button>
          </Link>

          {/* hamburger toggle */}
          <div>
            <button
              className=" flex items-center rounded-sm justify-center w-12 h-12"
              onClick={() => setOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>

          </div>
        </div>

      </div>

      {/* Animated fullscreen overlay using Framer Motion */}
      <motion.div
        initial={false}
        animate={isOpen ? 'opened' : 'closed'}
        data-open={dataOpen || null}
        className="group"
      >
        <MotionConfig transition={{ duration: 0.35, ease: 'easeInOut' }}>
          {/* Outer motion div controls the sliding up/down of the full menu */}


          <motion.div
            variants={menu}
            initial="closed"
            animate={isOpen ? 'opened' : 'closed'}
            className="fixed inset-0 p-4 flex items-start  bg-(--background) "
          >


            {/* Inner motion nav controls stagger of items */}

            <motion.nav
              variants={containerVariants}
              initial="closed"
              animate={isOpen ? 'opened' : 'closed'}
              className="w-full py-20 flex flex-col  justify-between"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                {navItems && navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      className=" block border-b-[0.5] text-left text-[var(--foreground)]  text-xl py-4"
                      onClick={() => {
                        // close the menu when navigating
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>

                  </motion.div>

                ))}
              </div>
              <div className="mt-10 pt-6  flex flex-col text-lg">
                <Link href="/booking" className="md:hidden self-end" onClick={() => setOpen(false)}>
                  <button className="rounded-3xl bg-(--foreground) py-1 px-4 hover:bg-gray-700 transition whitespace-nowrap">
                    <span className="text-md text-(--background)">{callToActionText}</span>
                  </button>
                </Link>


              </div>


              <div className="absolute bottom-5 mt-10 pt-6  flex flex-col text-base">


                <Link href="/impressum" className="text-(--foreground)" onClick={() => setOpen(false)}>
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-(--foreground)" onClick={() => setOpen(false)}>
                  Datenschutzbestimmung
                </Link>
              </div>



            </motion.nav>
          </motion.div>
        </MotionConfig>
      </motion.div>


    </div>

  );
};

export const HamburgerIcon = ({ isOpen }) => {
  const top = {
    closed: { rotate: [45, 0, 0], y: [6, 6, 0] },
    opened: { rotate: [0, 0, 45], y: [0, 6, 6] },
  };
  const center = {
    closed: { opacity: [0, 0, 1] },
    opened: { opacity: [1, 0, 0] },
  };
  const bottom = {
    closed: { rotate: [-45, 0, 0], y: [-6, -6, 0] },
    opened: { rotate: [0, 0, -45], y: [0, -6, -6] },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10 group-data-[open]:text-black"
    >
      <motion.line
        variants={top}
        animate={isOpen ? 'opened' : 'closed'}
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        transition={{ duration: 0.3, ease: 'linear' }}  // ← overrides MotionConfig

      />
      <motion.line
        variants={center}
        animate={isOpen ? 'opened' : 'closed'}
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        transition={{ duration: 0.3, ease: 'linear' }}  // ← overrides MotionConfig

      />
      <motion.line
        variants={bottom}
        animate={isOpen ? 'opened' : 'closed'}
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        transition={{ duration: 0.3, ease: 'linear' }}  // ← overrides MotionConfig

      />
    </svg>
  );
};

export const HamburgerBackIcon = ({ isOpen }) => {
  const top = {
    closed: { x1: 3, y2: 6 },
    opened: { x1: 12, y2: 12 },
  };
  const main = {
    closed: { rotate: 0 },
    opened: { rotate: 180 },
  };
  const bottom = {
    closed: { x1: 3, y2: 18 },
    opened: { x1: 12, y2: 12 },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-16 h-16 group-data-[open]:text-black"
      variants={main}
      animate={isOpen ? 'opened' : 'closed'}
    >
      <motion.line
        variants={top}
        animate={isOpen ? 'opened' : 'closed'}
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        transition={{ duration: 0.3, ease: 'linear' }}  // ← overrides MotionConfig

      />
      <line x1="3" y1="12" x2="21" y2="12" />
      <motion.line
        variants={bottom}
        animate={isOpen ? 'opened' : 'closed'}
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        transition={{ duration: 0.3, ease: 'linear' }}  // ← overrides MotionConfig

      />
    </motion.svg>
  );
};