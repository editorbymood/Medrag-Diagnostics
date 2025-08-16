import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeroSection from './components/HeroSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import FeaturesSection from './components/FeaturesSection';
import InteractiveDemoSection from './components/InteractiveDemoSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import NavigationHeader from './components/NavigationHeader';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>MedRAG Diagnostics - AI-Powered Medical Diagnosis Platform</title>
        <meta name="description" content="Revolutionary AI diagnostic platform for healthcare professionals. Improve diagnostic accuracy by 98% with evidence-based recommendations and HIPAA-compliant security." />
        <meta name="keywords" content="medical AI, diagnostic assistance, healthcare technology, medical diagnosis, clinical decision support" />
        <meta property="og:title" content="MedRAG Diagnostics - AI-Powered Medical Diagnosis" />
        <meta property="og:description" content="Join thousands of healthcare professionals using AI-powered diagnostic assistance backed by PubMed research." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://medrag.com" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <NavigationHeader isScrolled={isScrolled} />

        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <HeroSection />
        </motion.div>

        {/* Trust Signals Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <TrustSignalsSection />
        </motion.div>

        {/* Interactive Demo Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <InteractiveDemoSection />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <FeaturesSection />
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <TestimonialsSection />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <CTASection />
        </motion.div>

        {/* Footer */}
        <Footer />

        {/* Floating Action Button - Mobile */}
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-medical-lg flex items-center justify-center"
            >
              <Icon name="Plus" size={24} />
            </motion.div>
          </Link>
        </div>

        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;