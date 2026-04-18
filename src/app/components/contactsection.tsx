// components/ContactSection.tsx
"use client"
import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import styles from '../styles/ContactSection.module.css';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Animation variants
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contactInfoVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('from_name') as string,
      email: formData.get('from_email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Email sent successfully:', result);
        setSubmitStatus('success');
        form.reset();

        // Auto-dismiss with blur animation after 3 seconds
        setTimeout(() => {
          setSubmitStatus('success-fadeout');
          setTimeout(() => setSubmitStatus(''), 500); // Wait for animation to complete
        }, 3000);
      } else {
        console.error('Email send failed:', result);
        setSubmitStatus('error');

        // Auto-dismiss with blur animation after 3 seconds
        setTimeout(() => {
          setSubmitStatus('error-fadeout');
          setTimeout(() => setSubmitStatus(''), 500); // Wait for animation to complete
        }, 3000);
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');

      // Auto-dismiss with blur animation after 3 seconds
      setTimeout(() => {
        setSubmitStatus('error-fadeout');
        setTimeout(() => setSubmitStatus(''), 500); // Wait for animation to complete
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Let&apos;s Work Together
        </motion.h2>

        <motion.div
          className={styles.contactContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Info */}
          <motion.div
            className={styles.contactInfo}
            variants={contactInfoVariants}
          >
            <motion.div
              className={styles.introText}
              variants={itemVariants}
            >
              <p className={styles.leadText}>
                Ready to bring your ideas to life with cutting-edge AI and full-stack expertise?
                Let&apos;s create something extraordinary together.
              </p>
              <div className={styles.ctaHighlights}>
                <span className={styles.highlight}>Fast Delivery</span>
                <span className={styles.highlight}>Global Experience</span>
                <span className={styles.highlight}>Clear Communication</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.contactDetails}
              variants={containerVariants}
            >
              <motion.div
                className={styles.contactItem}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Mail className={styles.icon} size={20} />
                <span>parthpipaliya1712@gmail.com</span>
              </motion.div>
              <motion.div
                className={styles.contactItem}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Phone className={styles.icon} size={20} />
                <span>+91 7383274687</span>
              </motion.div>
              <motion.div
                className={styles.contactItem}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MapPin className={styles.icon} size={20} />
                <span>Ahmedabad, Gujarat, India</span>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.socialLinks}
              variants={containerVariants}
            >
              <motion.a
                href="https://www.linkedin.com/in/parthpipaliya/"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className={styles.icon} size={20} />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com/Pipaliya1712"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className={styles.icon} size={20} />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1u5F1zOcER5IjbO106WBArSnhu-872bn3/view?usp=sharing"
                target='_blank'
                className={styles.socialLink}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className={styles.icon} size={20} />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={styles.contactForm}
            variants={formVariants}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="name" className={styles.label}>Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="from_name"
                  className={styles.input}
                  required
                  whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                />
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="email" className={styles.label}>Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="from_email"
                  className={styles.input}
                  required
                  whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                />
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  className={styles.input}
                  required
                  whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                />
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label htmlFor="message" className={styles.label}>Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={styles.textarea}
                  required
                  whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                />
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ color: '#ffffff' }}
              >
                {isSubmitting ? 'Sending...' : 'Start Our Journey'}
              </motion.button>

              {/* Status Messages */}
              {(submitStatus === 'success' || submitStatus === 'success-fadeout') && (
                <motion.div
                  className={`${styles.successMessage} ${submitStatus === 'success-fadeout' ? styles.fadeOut : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ✅ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {(submitStatus === 'error' || submitStatus === 'error-fadeout') && (
                <motion.div
                  className={`${styles.errorMessage} ${submitStatus === 'error-fadeout' ? styles.fadeOut : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ❌ Failed to send message. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className={styles.footerText}>
            © 2025 Parth Pipaliya
          </p>
        </motion.div>
      </div>
    </section>
  );
}