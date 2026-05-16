import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Parth Pipaliya - Full Stack Gen AI Developer | AI Engineer Portfolio India",
  description: "Parth Pipaliya (parthpipaliya.com) - Full Stack Gen AI Developer from Ahmedabad, India. Specializing in RAG systems, LLMs, and AI integration with 2.5+ years experience building 10+ AI applications.",
  keywords: "Parth Pipaliya, ParthPipaliya, Pipaliya Parth, parthpipaliya.com, Gen AI Developer India, Full Stack Developer Ahmedabad, AI Engineer Gujarat, RAG Systems, LLM Integration",
  authors: [{ name: "Parth Pipaliya" }],
  creator: "Parth Pipaliya",
  publisher: "Parth Pipaliya",
  robots: "index, follow",

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

  twitter: {
    card: "summary_large_image",
    title: "Parth Pipaliya - Full Stack Gen AI Developer",
    description: "Portfolio of Parth Pipaliya, Gen AI specialist and full-stack developer from India",
    images: ["https://parthpipaliya.com/profile.PNG"],
    creator: "@ParthPipaliya",
  },

  metadataBase: new URL("https://parthpipaliya.com"),
  alternates: {
    canonical: "https://parthpipaliya.com",
  },

  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad, Gujarat, India",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Geist:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased"
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh'
        }}
      >
        <Analytics />
        {/* Animated background orbs */}
        <div className="glow-orb glow-orb-top" aria-hidden="true" />
        <div className="glow-orb glow-orb-bottom" aria-hidden="true" />
        <div className="glow-orb glow-orb-mid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
