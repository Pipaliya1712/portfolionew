"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "../styles/Portfolio.module.css";
import AboutSection from "./aboutsection";
import ServicesSection from "./servicessection";
import SkillsSection from "./skillssection";
import ProjectsSection from "./projectssection";
import ContactSection from "./contactsection";
import ChatbotWidget from "./chatbotwidget";

const TypewriterWord = ({ words, speed = 150, delay = 2000 }: { words: string[]; speed?: number; delay?: number }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
      minWidth: '200px',
      textAlign: 'left',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      paddingBottom: '0.1em',
      color: '#d0bcff'
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
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      let currentSection = 'home';

      if (window.scrollY < 50) {
        currentSection = 'home';
      } else {
        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const elementTop = element.offsetTop - 150;
            const elementBottom = elementTop + element.offsetHeight;

            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = sections[i];
              break;
            }
          }
        }
      }

      document.querySelectorAll(`.${styles.navLink}`).forEach((link) => {
        link.classList.remove(styles.active);
      });

      const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add(styles.active);
      }
    };

    const navLinks = document.querySelectorAll(`.${styles.navLink}`);
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
      window.removeEventListener('scroll', updateActiveNav);
    };
  }, []);

  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const heroTextVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const profileImageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.5 },
    },
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation Header */}
      <motion.header
        className={styles.header}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className={styles.nav}>
          <a href="#home" className={styles.logo}>Parth Pipaliya</a>
          <div className={styles.navLinks}>
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
              href="#projects"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.a>
            <motion.a
              href="#skills"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.a>
          </div>
          <motion.a
            href="#contact"
            className={styles.connectBtn}
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect
          </motion.a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <div className={styles.mainContent} id="home">
        <motion.div
          className={styles.heroSection}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.heroLeft} variants={heroTextVariants}>
            <div className={styles.availabilityBadge}>
              <span className={styles.badgeDot}></span>
              <span className={styles.badgeText}>Available for Strategic AI Projects</span>
            </div>
            <h1 className={styles.heroTitle}>
              Building AI Systems That <span className={styles.highlight}>Actually</span> Solve Business Problems
            </h1>
            <p className={styles.heroDescription}>
              Expert in Enterprise RAG, Autonomous AI Agents, and scalable automation.
              Transforming complex workflows into intelligent, high-performance production systems.
            </p>
            <div className={styles.heroButtons}>
              <motion.a
                href="#contact"
                className={styles.primaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Call
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
              </motion.a>
              <motion.a
                href="#projects"
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.a>
            </div>
          </motion.div>
          <motion.div className={styles.heroRight} variants={profileImageVariants}>
            <div className={styles.profileImageWrapper}>
              <div className={styles.profileImageContainer}>
                <Image
                  src="/profile.png"
                  alt="Parth Pipaliya"
                  fill
                  className={styles.profileImage}
                  priority
                  sizes="(max-width: 768px) 350px, 500px"
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayStatus}>
                    <span className={styles.overlayLabel}>STATUS: PROCESSING</span>
                    <span className={styles.overlayTitle}>RAG Engine V2.0</span>
                  </div>
                  <div className={styles.overlayAvatars}>
                    <div className={styles.avatar}>AI</div>
                    <div className={styles.avatar}>NLP</div>
                  </div>
                </div>
              </div>
              <div className={styles.floatingIcon}>
                <span className="material-symbols-outlined">neurology</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Sections */}
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
          <ProjectsSection />
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

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </motion.div>
  );
}
