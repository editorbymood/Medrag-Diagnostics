import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const statsVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, delay: 1.2 }
    }
  };

  const stats = [
    { value: '98%', label: 'Diagnostic Accuracy', icon: 'Target' },
    { value: '15K+', label: 'Healthcare Professionals', icon: 'Users' },
    { value: '500K+', label: 'Cases Analyzed', icon: 'BarChart3' },
    { value: '24/7', label: 'AI Availability', icon: 'Clock' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/80 to-sky-50/80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                <Icon name="Sparkles" size={16} className="mr-2" />
                AI-Powered Medical Diagnostics
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Eliminate Medical{' '}
                <span className="text-primary relative">
                  Misdiagnosis
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 6c60-4 120 4 180 0s120-8 180-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                Revolutionary AI diagnostic platform that improves accuracy by 98% with evidence-based recommendations backed by PubMed research.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Play" size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>FDA Validated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual/Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Main Dashboard Preview */}
            <div className="relative bg-card rounded-2xl shadow-medical-lg border border-border p-6 lg:p-8">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={16} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Patient Analysis</h3>
                    <p className="text-xs text-muted-foreground">Case #MR-2024-001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
                  <span className="text-xs text-success font-medium">AI Processing</span>
                </div>
              </div>

              {/* Mock Diagnostic Cards */}
              <div className="space-y-4 mb-6">
                {[
                  { diagnosis: 'Acute Myocardial Infarction', confidence: 94, color: 'text-error' },
                  { diagnosis: 'Unstable Angina', confidence: 78, color: 'text-warning' },
                  { diagnosis: 'Pericarditis', confidence: 45, color: 'text-muted-foreground' },
                ]?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item?.color?.replace('text-', 'bg-')}`}></div>
                      <span className="text-sm font-medium">{item?.diagnosis}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{item?.confidence}%</span>
                      <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item?.confidence}%` }}
                          transition={{ delay: 1.5 + index * 0.2, duration: 0.8 }}
                          className={`h-full ${item?.color?.replace('text-', 'bg-')}`}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mock Evidence Sources */}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>127 PubMed refs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Database" size={12} />
                  <span>Clinical Guidelines</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Brain" size={12} />
                  <span>AI Analysis</span>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div 
              variants={statsVariants}
              className="absolute -top-4 -right-4 lg:-right-8 bg-card rounded-xl shadow-medical-lg border border-border p-4"
            >
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                  <p className="text-lg font-bold text-success">98.7%</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={statsVariants}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-card rounded-xl shadow-medical-lg border border-border p-4"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Response</p>
                  <p className="text-lg font-bold text-primary">2.3s</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;