import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const certifications = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Full compliance with healthcare data protection requirements',
      badge: 'Certified'
    },
    {
      icon: 'Lock',
      title: 'SOC 2 Type II',
      description: 'Rigorous security and availability standards',
      badge: 'Audited'
    },
    {
      icon: 'CheckCircle',
      title: 'FDA Validated',
      description: 'Clinical decision support software validation',
      badge: 'Approved'
    },
    {
      icon: 'Globe',
      title: 'ISO 27001',
      description: 'International information security management',
      badge: 'Certified'
    }
  ];

  const partners = [
    { name: 'Mayo Clinic', logo: 'Hospital' },
    { name: 'Johns Hopkins', logo: 'Building' },
    { name: 'Cleveland Clinic', logo: 'Heart' },
    { name: 'Mount Sinai', logo: 'Activity' },
    { name: 'Kaiser Permanente', logo: 'Shield' },
    { name: 'Cedars-Sinai', logo: 'Stethoscope' }
  ];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="security">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-6">
            <Icon name="ShieldCheck" size={16} className="mr-2" />
            Trusted by Healthcare Leaders
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with the highest security standards to protect patient data and ensure compliance with global healthcare regulations.
          </p>
        </motion.div>

        {/* Certification Cards */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {certifications?.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-medical hover:shadow-medical-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                <Icon name={cert?.icon} size={28} className="text-success" />
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold mb-3">
                {cert?.badge}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{cert?.title}</h3>
              <p className="text-sm text-muted-foreground">{cert?.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground mb-8 tracking-wider uppercase">
            Trusted by Leading Healthcare Institutions
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {partners?.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={partner?.logo} size={24} className="text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{partner?.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Database" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Data Encryption</h3>
            </div>
            <p className="text-muted-foreground">End-to-end encryption with AES-256 standards for all patient data in transit and at rest.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Users" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Access Controls</h3>
            </div>
            <p className="text-muted-foreground">Multi-factor authentication and role-based access controls for secure user management.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="FileText" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Audit Trails</h3>
            </div>
            <p className="text-muted-foreground">Complete audit logs for all system activities and data access for compliance reporting.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;