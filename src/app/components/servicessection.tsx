// components/ServicesSection.js
import { Code, Brain, Database, Zap, Globe, Settings } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import styles from '../styles/ServicesSection.module.css';

const services = [
  {
    id: 1,
    title: "Gen AI Development",
    description: "Custom AI solutions using RAG systems, LLMs, and cutting-edge generative AI technologies for intelligent applications.",
    icon: Brain,
    features: ["RAG Implementation", "LLM Integration", "Custom AI Models", "AI Chatbots"],
    highlight: "95% accuracy guaranteed"
  },
  {
    id: 2,
    title: "Full Stack Development",
    description: "End-to-end web applications with modern frameworks, scalable architecture, and seamless user experiences.",
    icon: Code,
    features: ["React/Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
    highlight: "Production-ready solutions"
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into existing systems to enhance functionality and automate workflows.",
    icon: Zap,
    features: ["API Integration", "Workflow Automation", "Data Processing", "Real-time Analytics"],
    highlight: "40% efficiency boost"
  },
  {
    id: 4,
    title: "Enterprise Solutions",
    description: "Scalable enterprise applications with advanced features, security, and performance optimization.",
    icon: Settings,
    features: ["SAP Integration", "Enterprise APIs", "System Architecture", "Performance Optimization"],
    highlight: "Enterprise-grade security"
  },
  {
    id: 5,
    title: "Data & Analytics",
    description: "Transform raw data into actionable insights with machine learning models and intelligent analytics platforms.",
    icon: Database,
    features: ["Data Processing", "ML Models", "Predictive Analytics", "Business Intelligence"],
    highlight: "Data-driven decisions"
  },
  {
    id: 6,
    title: "Consulting & Strategy",
    description: "Technical consulting to help you choose the right technologies and strategies for your digital transformation.",
    icon: Globe,
    features: ["Technology Assessment", "Architecture Planning", "AI Strategy", "Digital Transformation"],
    highlight: "Strategic guidance"
  }
];

export default function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>
        <span className={styles.sectionLabel}>Capabilities</span>
        <motion.h2
          className={styles.sectionTitle}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Tailored AI Engineering
        </motion.h2>
        <p className={styles.sectionSubtitle}>
          I don&apos;t just build chatbots; I build intelligent infrastructure that evolves with your business.
        </p>
        
        <motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={service.id} 
                className={styles.serviceCard}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <IconComponent size={28} className={styles.serviceIcon} />
                  </div>
                  <span className={styles.highlight}>{service.highlight}</span>
                </div>
                
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                
                <p className={styles.description}>
                  {service.description}
                </p>
                
                <motion.div 
                  className={styles.features}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {service.features.map((feature, index) => (
                    <motion.span 
                      key={index} 
                      className={styles.featureTag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}