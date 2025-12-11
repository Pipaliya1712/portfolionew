import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const varelaRound = Varela_Round({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Parth Pipaliya - Full Stack Gen AI Developer | AI Engineer Portfolio India",
  description: "Parth Pipaliya (parthpipaliya.com) - Full Stack Gen AI Developer from Ahmedabad, India. Specializing in RAG systems, LLMs, and AI integration with 2.5+ years experience building 10+ AI applications.",
  keywords: "Parth Pipaliya, ParthPipaliya, Pipaliya Parth, parthpipaliya.com, Gen AI Developer India, Full Stack Developer Ahmedabad, AI Engineer Gujarat, RAG Systems, LLM Integration",
  authors: [{ name: "Parth Pipaliya" }],
  creator: "Parth Pipaliya",
  publisher: "Parth Pipaliya",
  robots: "index, follow",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parthpipaliya.com",
    title: "Parth Pipaliya - Full Stack Gen AI Developer India",
    description: "Portfolio of Parth Pipaliya (parthpipaliya.com) - Gen AI specialist from Ahmedabad, India building cutting-edge AI solutions",
    siteName: "Parth Pipaliya Portfolio",
    images: [
      {
        url: "https://parthpipaliya.com/profile.PNG",
        width: 1200,
        height: 630,
        alt: "Parth Pipaliya - Full Stack Gen AI Developer from Ahmedabad, India",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Parth Pipaliya - Full Stack Gen AI Developer",
    description: "Portfolio of Parth Pipaliya, Gen AI specialist and full-stack developer from India",
    images: ["https://parthpipaliya.com/profile.PNG"],
    creator: "@ParthPipaliya",
  },
  
  // Additional Meta
  metadataBase: new URL("https://parthpipaliya.com"),
  alternates: {
    canonical: "https://parthpipaliya.com",
  },
  
  // Geo Location
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad, Gujarat, India",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  
  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Parth Pipaliya",
              "alternateName": ["ParthPipaliya", "Pipaliya Parth"],
              "url": "https://parthpipaliya.com",
              "image": "https://parthpipaliya.com/profile.PNG",
              "jobTitle": "Full Stack Gen AI Developer",
              "nationality": "Indian",
              "worksFor": {
                "@type": "Organization",
                "name": "Silvertouch Technologies",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "India"
                }
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ahmedabad",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "India"
              },
              "sameAs": [
                "https://www.linkedin.com/in/parthpipaliya/",
                "https://github.com/Pipaliya1712",
                "https://parthpipaliya.com"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
                "RAG Systems",
                "LLM Integration",
                "Generative AI",
                "Next.js",
                "React",
                "Node.js"
              ],
              "email": "parthpipaliya1712@gmail.com",
              "telephone": "+91-7383274687",
              "birthPlace": "India",
              "homeLocation": {
                "@type": "Place",
                "name": "Ahmedabad, Gujarat, India"
              }
            })
          }}
        />
        
        {/* Google Analytics (add your GA4 tracking ID) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }} /> */}
      </head>
      <body
        className={`${varelaRound.className} antialiased`}
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          margin: 0,
          padding: 0,
          minHeight: '100vh'
        }}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}