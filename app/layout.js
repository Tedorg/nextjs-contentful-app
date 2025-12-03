import "./globals.css";
import CookieBanner from '@/components/cookieBanner';

import Script from "next/script";

import { MobileMenu} from "@/components/HeaderFramerMo";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://www.rahel-schmid.ch"),
  title: {
    default: "Rahel Schmid - Hypnosetherapie in St.Gallen",
    template: "%s | Rahel Schmid Hypnosetherapie",
  },
  script: [
 
],
  description:
    "Professionelle Hypnosetherapie für Privatpersonen, Unternehmen und Sportvereine.",
  keywords: [
    "Hypnose",
"Hypnosetherapie",
"Therapie",
"Komplementärmedizin",
"St. Gallen",
"Mentale Gesundheit",
"Geistige Entwicklung",
"Persönliches Wachstum",
"Persönliche Weiterentwicklung",
"Ressource",
"Angst",
"Phobie",
"Stress",
"Zwang",
"Sucht",
"Gewichtsreduktion",
"Rauchentwöhnung",
"Schmerztherapie",
"Mobbing",
"Blockaden",
"Wohlbefinden",
"Kinderhypnose",
"Unternehmen",
"Sportvereine",
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
    title: "Rahel Schmid - Hypnosetherapie in St.Gallen",
    description:
      "Professionelle Hypnosetherapie für Privatpersonen, Unternehmen und Sportvereine.",
    siteName: "Rahel Schmid - Hypnosetherapie in St.Gallen",
    images: [
      {
        url: "/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rahel Schmid - Hypnosetherapie in St.Gallen",
      },
    ],
  },

  alternates: {
    canonical: "https://www.rahel-schmid.ch",
  },

  

  twitter: {
    card: "summary_large_image",
    title: "Rahel Schmid - Hypnosetherapie in St.Gallen ",
    description:
      "Hypnosetherapie für Privatpersonen, Unternehmen und Sportvereine in St. Gallen.",
    images: ["/og/og-image.jpg"],
    creator: "@rahel_schmid",
  },
  icons: {
    icon: [
      { url: "/icon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
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
          src="https://www.googletagmanager.com/gtag/js?id=G-GNC4CX31RG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GNC4CX31RG');
          `}
        </Script>
        <MobileMenu />
        {children}
        <Footer />
         <CookieBanner />
      </body>
    </html>
  )
}