// components/ProjectsSection.js
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import styles from '../styles/ProjectsSection.module.css';

const projects = [
  {
    id: 1,
    title: "Bot For Me",
    year: "2024",
    type: "Full Stack Gen AI Development",
    link: "#",
    description: "RAG-based web application with 95% accuracy, handling 10,000+ daily queries. 40% faster response time and 25% user engagement boost.",
    technologies: ["Next.js", "NextAuth.js", "GraphQL", "Node.js", "RAG"],
    accentColor: "#a78bfa"
  },
  {
    id: 2,
    title: "Resume Reader AI",
    year: "2024",
    type: "AI/ML, Document Processing",
    link: "#",
    description: "AI-powered resume parsing system with ATS compatibility checker. Processes 1000+ resumes daily with 92% parsing accuracy and real-time optimization suggestions.",
    technologies: ["Python", "NLP", "Machine Learning", "PDF Processing", "React", "Node.js"],
    accentColor: "#f472b6"
  },
  {
    id: 3,
    title: "Agentic AI",
    year: "2024",
    type: "AI Integration, Enterprise",
    link: "#",
    description: "Intelligent enterprise system with automated workflows and demand prediction (95% accuracy). 20% cost reduction and 40% operational efficiency improvement.",
    technologies: ["SAP", "Agentic AI", "Machine Learning", "Automation"],
    accentColor: "#34d399"
  },
  {
    id: 4,
    title: "ADTS System",
    year: "2024",
    type: "ML Integration, Full Stack",
    description: "ML-powered driving test system with camera-based analysis. 25% test accuracy improvement, 5,000+ tests/month with 99% uptime.",
    link: "#",
    technologies: ["Next.js", "Machine Learning", "GraphQL", "Computer Vision"],
    accentColor: "#60a5fa"
  },
  {
    id: 5,
    title: "Entity Verification",
    year: "2023",
    type: "Backend Architecture",
    description: "Real-time verification system with advanced matching algorithms. 60% accuracy increase and 50% faster verification times.",
    link: "#",
    technologies: ["Node.js", "Real-time Processing", "Advanced Algorithms"],
    accentColor: "#fb923c"
  },
  {
    id: 6,
    title: "IPSA - REC App",
    year: "2023",
    type: "Mobile Development, IoT",
    description: "React Native app for electricity distribution monitoring with geotagging. 30% user adoption increase and 15% reduction in distribution losses.",
    link: "#",
    technologies: ["React Native", "Geotagging", "IoT", "Cross-platform"],
    accentColor: "#facc15"
  }
];

export default function ProjectsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.92
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.8
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>Success Stories</span>
            <motion.h2
              className={styles.sectionTitle}
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Featured Case Studies
            </motion.h2>
          </div>
          <a href="#projects" className={styles.viewAllLink}>
            View all work
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>north_east</span>
          </a>
        </div>

        <motion.div
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              whileTap={{
                scale: 0.97,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              style={{
                '--card-accent': project.accentColor,
              } as React.CSSProperties}
            >
              {/* Colored top accent bar */}
              <div
                className={styles.cardAccentBar}
                style={{ background: `linear-gradient(90deg, ${project.accentColor}88, transparent)` }}
              />

              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {project.link !== "#" && (
                  <motion.div
                    whileHover={{
                      rotate: 45,
                      scale: 1.15,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={`https://${project.link}`}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ '--link-color': project.accentColor } as React.CSSProperties}
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </motion.div>
                )}
              </div>

              <div className={styles.projectMeta}>
                <span className={styles.year} style={{ color: project.accentColor }}>{project.year}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.type}>{project.type}</span>
              </div>

              <p className={styles.description}>
                {project.description}
              </p>

              <motion.div
                className={styles.technologies}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className={styles.techTag}
                    initial={{ opacity: 0, scale: 0.75, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.07
                    }}
                    whileHover={{
                      scale: 1.08,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    viewport={{ once: true }}
                    style={{
                      borderColor: `${project.accentColor}55`,
                      color: project.accentColor,
                      background: `${project.accentColor}14`,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}