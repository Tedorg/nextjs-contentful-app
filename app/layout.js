import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import { MobileMenu} from "@/components/HeaderFramerMo";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://www.rahel-schmid.ch"),
  title: {
    default: "Rahel Schmid – Hypnosetherapie",
    template: "%s | Rahel Schmid Hypnosetherapie",
  },
  script: [
  {
    src: "https://consent.cookiebot.com/uc.js",
    id: "Cookiebot",
    "data-cbid": "8bfa8bbb-3bdd-4d20-9d3e-4cd73a2602c9",
    "data-blockingmode": "auto",
    type: "text/javascript",
  },
],
  description:
    "Hypnosetherapie Rahel Schmid.",
  keywords: [
    "Hypnosetherapie",
    "St. Gallen",
    "Therapie",
    "Angst",
    "Stress",
    "Wohlbefinden",
    "Kinderhypnose",
    "Jugendliche",
    "Schule",
    "Mentale Gesundheit",
  ],
  authors: [{ name: "Rahel Schmid" }],
  creator: "Rahel Schmid",
  publisher: "Rahel Schmid",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://www.rahel-schmid.ch",
    title: "Rahel Schmid – Hypnosetherapie",
    description:
      "Hypnosetherapie in St. Gallen",
    siteName: "Rahel Schmid Hypnosetherapie",
    images: [
      {
        url: "/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Praxis für Hypnosetherapie – Rahel Schmid",
      },
    ],
  },

  alternates: {
    canonical: "https://www.rahel-schmid.ch",
  },

  

  twitter: {
    card: "summary_large_image",
    title: "Rahel Schmid – Hypnosetherapie ",
    description:
      "Hypnosetherapie  in St. Gallen.",
    images: ["/og/og-image.jpg"],
    creator: "@rahel_schmid",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" }, // Apple
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" }, // PWA / Android
    ],
    apple: "/favicon-180.png",
  }
};

export default function RootLayout({ children }) {
  // const home = await client.getEntries({ content_type: 'home' })
  // const about = await client.getEntries({ content_type: 'aboutMe' })
  // const rs = await client.getEntries({ content_type: 'rs' })
  
  return (
    <html lang="de">
      <body>
        <Script
  id="Cookiebot"
  src="https://consent.cookiebot.com/uc.js"
  data-cbid="8bfa8bbb-3bdd-4d20-9d3e-4cd73a2602c9"
  data-blockingmode="auto"
  strategy="beforeInteractive"
/>
        <MobileMenu />
        {children}
        <Footer />
      </body>
    </html>
  )
}