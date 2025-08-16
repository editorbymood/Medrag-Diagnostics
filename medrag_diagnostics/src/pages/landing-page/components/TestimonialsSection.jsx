import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Emergency Medicine Physician',
      institution: 'Johns Hopkins Hospital',
      image: 'User',
      testimonial: 'MedRAG has transformed how I approach complex cases in the ER. The AI\'s ability to quickly process symptoms and suggest differential diagnoses has significantly improved my diagnostic confidence and patient outcomes.',
      metrics: { accuracy: '96%', timeSaved: '40min/case' },
      specialty: 'Emergency Medicine'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      title: 'Internal Medicine Specialist',
      institution: 'Mayo Clinic',
      image: 'User',
      testimonial: 'The evidence-based recommendations are incredibly valuable. Having access to the latest research and guidelines at my fingertips has made me a more effective clinician.',
      metrics: { accuracy: '94%', timeSaved: '25min/case' },
      specialty: 'Internal Medicine'
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      title: 'Family Medicine Physician',
      institution: 'Cleveland Clinic',
      image: 'User',
      testimonial: 'As a family physician, I see a wide variety of conditions. MedRAG helps me stay current with the latest diagnostic criteria and treatment protocols across multiple specialties.',
      metrics: { accuracy: '97%', timeSaved: '30min/case' },
      specialty: 'Family Medicine'
    },
    {
      id: 4,
      name: 'Dr. James Park',
      title: 'Chief of Cardiology',
      institution: 'Mount Sinai Health System',
      image: 'User',
      testimonial: 'The cardiac risk assessment capabilities are outstanding. MedRAG has helped our team identify high-risk patients earlier and implement appropriate interventions.',
      metrics: { accuracy: '98%', timeSaved: '35min/case' },
      specialty: 'Cardiology'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      title: 'Pediatric Emergency Medicine',
      institution: 'Boston Children\'s Hospital',
      image: 'User',
      testimonial: 'Working with pediatric patients requires special consideration. MedRAG\'s age-specific recommendations and drug dosing calculations have been invaluable.',
      metrics: { accuracy: '95%', timeSaved: '28min/case' },
      specialty: 'Pediatrics'
    },
    {
      id: 6,
      name: 'Dr. Robert Kim',
      title: 'Hospitalist',
      institution: 'Kaiser Permanente',
      image: 'User',
      testimonial: 'The integration with our EMR system is seamless. MedRAG provides diagnostic support without disrupting our existing workflow, making adoption incredibly smooth.',
      metrics: { accuracy: '96%', timeSaved: '32min/case' },
      specialty: 'Hospital Medicine'
    }
  ];

  const stats = [
    { label: 'Healthcare Professionals', value: '15,000+', icon: 'Users' },
    { label: 'Cases Analyzed', value: '500K+', icon: 'FileText' },
    { label: 'Average Time Saved', value: '32min', icon: 'Clock' },
    { label: 'Diagnostic Accuracy', value: '98%', icon: 'Target' }
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
    <section className="py-20 lg:py-32 bg-muted/30" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-6">
            <Icon name="Star" size={16} className="mr-2" />
            Trusted by Physicians
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            What Healthcare Professionals Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of medical professionals who trust MedRAG to enhance their diagnostic capabilities and improve patient care.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                <Icon name={stat?.icon} size={28} className="text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card border border-border rounded-xl p-6 shadow-medical hover:shadow-medical-lg transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial?.testimonial}"
              </blockquote>

              {/* Metrics */}
              <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">{testimonial?.metrics?.accuracy}</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{testimonial?.metrics?.timeSaved}</div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={testimonial?.image} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial?.title}</p>
                  <p className="text-xs text-muted-foreground">{testimonial?.institution}</p>
                </div>
              </div>

              {/* Specialty Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {testimonial?.specialty}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-card border border-border rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-4">
                <Icon name="Award" size={16} className="mr-2" />
                Case Study
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Johns Hopkins ER Reduces Diagnostic Errors by 42%
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A 6-month study at Johns Hopkins Emergency Department showed significant improvements in diagnostic accuracy and patient outcomes after implementing MedRAG AI-powered diagnostic assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="ArrowUp" size={16} className="text-success" />
                  <span className="text-sm"><strong>42% reduction</strong> in diagnostic errors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm"><strong>38% faster</strong> time to diagnosis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-accent" />
                  <span className="text-sm"><strong>91% physician satisfaction</strong> rate</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="text-center mb-6">
                <h4 className="font-semibold text-foreground mb-2">Study Results</h4>
                <p className="text-sm text-muted-foreground">6-month implementation period</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Diagnostic Accuracy</span>
                  <span className="text-lg font-bold text-success">98.2%</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="w-full h-full bg-success"></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Time to Diagnosis</span>
                  <span className="text-lg font-bold text-primary">12.3min</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-primary"></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Patient Satisfaction</span>
                  <span className="text-lg font-bold text-accent">94.7%</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="w-full h-full bg-accent"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;