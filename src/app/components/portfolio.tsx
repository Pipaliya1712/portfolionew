// components/Portfolio.js
"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "../styles/Portfolio.module.css";
import AboutSection from "./aboutsection";
import ServicesSection from "./servicessection";
import SkillsSection from "./skillssection";
import ContactSection from "./contactsection";

const TypewriterWord = ({ words, speed = 150, delay = 2000 }: { words: string[]; speed?: number; delay?: number }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setIsPaused(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, currentWordIndex, isDeleting, isPaused, words, speed, delay]);

  return (
    <span style={{ 
      display: 'inline-block', 
      minWidth: isMobile ? '150px' : '250px', 
      textAlign: 'left',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      paddingBottom: '0.1em'
    }}>
      {displayText}
      <span style={{ 
        animation: 'blink 1s infinite',
        color: '#ffffff',
        fontWeight: '300'
      }}>|</span>
    </span>
  );
};

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Fix for iOS viewport height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      if (anchor && anchor.hash) {
        e.preventDefault();
        const target = document.querySelector(anchor.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const updateActiveNav = () => {
      const sections = ['home', 'about', 'services', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      let currentSection = 'home';
      
      // Check if we're at the very top
      if (window.scrollY < 50) {
        currentSection = 'home';
      } else {
        // Find the current section based on scroll position
        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const elementTop = element.offsetTop - 150; // Add offset for better detection
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = sections[i];
              break;
            }
          }
        }
      }
      
      // Update active nav - Remove all active classes first
      document.querySelectorAll(`.${styles.navLink}`).forEach((link) => {
        link.classList.remove(styles.active);
      });
      
      // Then add active class to current section
      const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add(styles.active);
      }
    };

    const navLinks = document.querySelectorAll(`.${styles.navLink}`);
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    // Add scroll listener for active nav updates
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Set initial state

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
      window.removeEventListener('scroll', updateActiveNav);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const heroTextVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const profileImageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.5,
      },
    },
  };

  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
<Head>
  <title>Parth Pipaliya - Full Stack Gen AI Developer | AI Engineer Portfolio India</title>
  <meta name="description" content="Parth Pipaliya (parthpipaliya.com) - Full Stack Gen AI Developer from Ahmedabad, India. Specializing in RAG systems, LLMs, and AI integration with 1 years experience." />
  <meta name="keywords" content="Parth Pipaliya, ParthPipaliya, Pipaliya Parth, parthpipaliya.com, Gen AI Developer India, Full Stack Developer Ahmedabad, AI Engineer Gujarat" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  {/* Canonical URL */}
  <link rel="canonical" href="https://parthpipaliya.com" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Parth Pipaliya - Full Stack Gen AI Developer India" />
  <meta property="og:description" content="Portfolio of Parth Pipalitya (parthpiplaiya.in) - Gen AI specialist from Ahmedabad, India" />
  <meta property="og:url" content="https://parthpiplaiya.in" />
  <meta property="og:image" content="https://parthpiplaiya.in/profile.png" />
  <meta property="og:site_name" content="Parth Pipaliya Portfolio" />
  
  {/* Enhanced Schema.org for .in domain */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Parth Pipaliya",
      "alternateName": ["ParthPipaliya", "Pipaliya Parth"],
      "url": "https://parthpipaliya.com",
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
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat", 
        "addressCountry": "India"
      },
      "sameAs": [
        "https://www.linkedin.com/in/parthpipaliya/",
        "https://github.com/Pipaliya1712"
      ],
      "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Full Stack Development", "RAG Systems"],
      "alumniOf": "Gujarat, India",
      "email": "parthpipaliya1712@gmail.com",
      "telephone": "+91-7383274687"
    })}
  </script>
</Head>

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.header
          className={styles.header}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <nav className={styles.nav}>
            <motion.a
              href="#home"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#about"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.a>
            <motion.a
              href="#services"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#skills"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.a>
            <motion.a
              href="#contact"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </nav>
        </motion.header>

        <main className={styles.mainContent} id="home">
          <motion.div
            className={styles.heroSection}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className={styles.textContent}
              variants={heroTextVariants}
            >
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Hi, I&apos;m Parth,
                <br />
                a <TypewriterWord words={["Full Stack Dev", "Gen AI Expert", "Python Developer", "AI Engineer"]} />
              </motion.h1>
            </motion.div>
            <motion.div
              className={styles.profileImageWrapper}
              variants={profileImageVariants}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src="/profile.png"
                alt="Parth"
                width={300}
                height={300}
                className={styles.profileImage}
                priority
              />
            </motion.div>
          </motion.div>
        </main>

        {/* FIXED: Ensure sections are visible with proper spacing */}
        <div className={styles.sectionsContainer}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AboutSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <ServicesSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <SkillsSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <ContactSection />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}