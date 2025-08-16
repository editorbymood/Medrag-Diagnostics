import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const benefits = [
    { icon: 'CheckCircle', text: 'Free 30-day trial' },
    { icon: 'CheckCircle', text: 'No credit card required' },
    { icon: 'CheckCircle', text: 'Full platform access' },
    { icon: 'CheckCircle', text: '24/7 support included' }
  ];

  const pricingTiers = [
    {
      name: 'Individual',
      price: '$99',
      period: '/month',
      description: 'Perfect for individual practitioners',
      features: [
        'Unlimited diagnostic analyses',
        'Evidence-based recommendations',
        'Mobile app access',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Practice',
      price: '$299',
      period: '/month',
      description: 'Ideal for small to medium practices',
      features: [
        'Everything in Individual',
        'Team collaboration tools',
        'Advanced analytics',
        'Priority support',
        'EMR integration',
        'Custom workflows'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For hospitals and health systems',
      features: [
        'Everything in Practice',
        'Custom integrations',
        'Dedicated support',
        'Training & onboarding',
        'SLA guarantees',
        'White-label options'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            <Icon name="Rocket" size={16} className="mr-2" />
            Get Started Today
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your{' '}
            <span className="text-primary">Diagnostic Practice?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of healthcare professionals who have improved their diagnostic accuracy and patient outcomes with MedRAG AI.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits?.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-center space-x-2"
              >
                <Icon name={benefit?.icon} size={20} className="text-success" />
                <span className="text-muted-foreground font-medium">{benefit?.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto group">
                Start Free Trial
                <motion.div
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                >
                  <Icon name="ArrowRight" size={20} />
                </motion.div>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 w-full sm:w-auto group"
              onClick={() => window.open('mailto:sales@medrag.com', '_blank')}
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Schedule Demo
            </Button>
          </div>

          {/* Trust Signal */}
          <p className="text-sm text-muted-foreground">
            No credit card required • Cancel anytime • HIPAA compliant
          </p>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h3>
            <p className="text-lg text-muted-foreground">
              Flexible pricing options for every practice size
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers?.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className={`relative bg-card border rounded-2xl p-8 shadow-medical hover:shadow-medical-lg transition-all duration-300 ${
                  tier?.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                {tier?.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-foreground mb-2">{tier?.name}</h4>
                  <p className="text-muted-foreground mb-4">{tier?.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{tier?.price}</span>
                    {tier?.period && (
                      <span className="text-muted-foreground ml-1">{tier?.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier?.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={tier?.name === 'Enterprise' ? '/contact' : '/register'}>
                  <Button
                    variant={tier?.popular ? 'default' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {tier?.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 lg:p-12 text-center text-white"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our medical AI specialists are here to help you understand how MedRAG can transform your practice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => window.open('mailto:support@medrag.com', '_blank')}
            >
              <Icon name="Mail" size={20} className="mr-2" />
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-white/20 hover:bg-white/10 text-white hover:text-white"
              onClick={() => window.open('/docs', '_blank')}
            >
              <Icon name="BookOpen" size={20} className="mr-2" />
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;