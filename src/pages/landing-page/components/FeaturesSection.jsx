import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'Intelligent Symptom Analysis',
      description: 'Advanced AI processes patient symptoms against comprehensive medical knowledge bases with contextual understanding.',
      benefits: ['Natural language processing', 'Pattern recognition', 'Multi-symptom correlation', 'Contextual analysis'],
      color: 'primary'
    },
    {
      icon: 'FileText',
      title: 'Medical Document Processing',
      description: 'Extract and analyze critical information from lab reports, imaging studies, and clinical notes automatically.',
      benefits: ['OCR technology', 'Structured data extraction', 'Multi-format support', 'DICOM integration'],
      color: 'accent'
    },
    {
      icon: 'Target',
      title: 'Differential Diagnosis Generation',
      description: 'Generate ranked differential diagnoses with confidence scores based on evidence and clinical guidelines.',
      benefits: ['Probability scoring', 'Evidence ranking', 'Guideline compliance', 'Risk stratification'],
      color: 'success'
    },
    {
      icon: 'BookOpen',
      title: 'Evidence-Based Recommendations',
      description: 'Receive actionable clinical recommendations backed by peer-reviewed research and medical guidelines.',
      benefits: ['PubMed integration', 'Clinical guidelines', 'Drug interactions', 'Treatment protocols'],
      color: 'warning'
    }
  ];

  const additionalFeatures = [
    { icon: 'Clock', title: 'Real-time Processing', description: 'Get diagnostic insights in under 3 seconds' },
    { icon: 'Smartphone', title: 'Mobile Optimized', description: 'Access from any device, anywhere' },
    { icon: 'Users', title: 'Team Collaboration', description: 'Share cases and insights with colleagues' },
    { icon: 'BarChart3', title: 'Analytics Dashboard', description: 'Track diagnostic accuracy and trends' },
    { icon: 'Zap', title: 'API Integration', description: 'Seamless EHR and EMR integration' },
    { icon: 'Shield', title: 'Data Privacy', description: 'HIPAA-compliant data handling' }
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
    <section className="py-20 lg:py-32 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            <Icon name="Zap" size={16} className="mr-2" />
            Platform Features
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Complete Diagnostic Support Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered tools designed specifically for healthcare professionals to enhance diagnostic accuracy and clinical decision-making.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {features?.map((feature, index) => {
            const colorClasses = {
              primary: 'text-primary bg-primary/10 border-primary/20',
              accent: 'text-accent bg-accent/10 border-accent/20',
              success: 'text-success bg-success/10 border-success/20',
              warning: 'text-warning bg-warning/10 border-warning/20'
            };

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-medical hover:shadow-medical-lg transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${colorClasses?.[feature?.color]}`}>
                  <Icon name={feature?.icon} size={32} className={`text-${feature?.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature?.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature?.description}</p>
                <div className="space-y-2">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className={`text-${feature?.color}`} />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {additionalFeatures?.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-medical hover:shadow-medical-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-xl mb-4">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature?.title}</h3>
              <p className="text-sm text-muted-foreground">{feature?.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-muted/30 rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Why Choose MedRAG Over Traditional Methods?
            </h3>
            <p className="text-lg text-muted-foreground">
              See the clear advantages of AI-powered diagnostic assistance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="X" size={24} className="text-error" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Traditional Approach</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Manual research takes hours</li>
                <li>• Limited knowledge recall</li>
                <li>• Inconsistent accuracy</li>
                <li>• Human cognitive biases</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">MedRAG AI</h4>
              <ul className="text-sm text-success space-y-1">
                <li>• Instant analysis in seconds</li>
                <li>• Access to entire medical literature</li>
                <li>• 98% diagnostic accuracy</li>
                <li>• Eliminates human error</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Clinical Impact</h4>
              <ul className="text-sm text-success space-y-1">
                <li>• 65% faster diagnosis</li>
                <li>• 42% reduction in errors</li>
                <li>• Improved patient outcomes</li>
                <li>• Enhanced clinical confidence</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;