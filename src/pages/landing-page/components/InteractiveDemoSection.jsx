import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveDemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      id: 0,
      title: 'Patient Symptoms',
      description: 'Input patient symptoms and clinical observations',
      content: {
        type: 'symptom-input',
        data: {
          symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue', 'Palpitations'],
          vitals: { bp: '140/90', hr: '95', temp: '98.6°F', spo2: '94%' }
        }
      }
    },
    {
      id: 1,
      title: 'AI Analysis',
      description: 'AI processes symptoms against medical knowledge base',
      content: {
        type: 'analysis',
        data: {
          status: 'analyzing',
          progress: 87,
          sources: ['PubMed Database', 'Clinical Guidelines', 'Drug Interactions', 'Symptom Patterns']
        }
      }
    },
    {
      id: 2,
      title: 'Differential Diagnosis',
      description: 'Generated ranked list of potential diagnoses',
      content: {
        type: 'diagnosis',
        data: [
          { name: 'Acute Myocardial Infarction', confidence: 94, severity: 'high' },
          { name: 'Unstable Angina', confidence: 78, severity: 'medium' },
          { name: 'Pulmonary Embolism', confidence: 65, severity: 'high' },
          { name: 'Anxiety Disorder', confidence: 32, severity: 'low' }
        ]
      }
    },
    {
      id: 3,
      title: 'Evidence & Recommendations',
      description: 'Detailed evidence with actionable clinical recommendations',
      content: {
        type: 'recommendations',
        data: {
          urgency: 'immediate',
          tests: ['ECG', 'Troponin I/T', 'CK-MB', 'Chest X-ray'],
          treatments: ['Aspirin 325mg', 'Oxygen therapy', 'Morphine for pain'],
          evidence: 127
        }
      }
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % demoSteps?.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, demoSteps?.length]);

  const renderStepContent = (step) => {
    switch (step?.content?.type) {
      case 'symptom-input':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {step?.content?.data?.symptoms?.map((symptom, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 p-2 bg-muted rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{symptom}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-2">Vital Signs:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(step?.content?.data?.vitals)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key?.toUpperCase()}:</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-subtle"></div>
              <span className="text-sm text-primary font-medium">Processing...</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{step?.content?.data?.progress}%</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${step?.content?.data?.progress}%` }}
                  transition={{ duration: 2 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              {step?.content?.data?.sources?.map((source, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-2 text-xs text-muted-foreground"
                >
                  <Icon name="Check" size={12} className="text-success" />
                  <span>Scanning {source}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'diagnosis':
        return (
          <div className="space-y-3">
            {step?.content?.data?.map((diagnosis, index) => {
              const severityColors = {
                high: 'text-error bg-error/10 border-error/20',
                medium: 'text-warning bg-warning/10 border-warning/20',
                low: 'text-muted-foreground bg-muted border-border'
              };
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${severityColors?.[diagnosis?.severity]}`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{diagnosis?.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium">{diagnosis?.confidence}%</span>
                    <div className="w-12 h-1.5 bg-current/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${diagnosis?.confidence}%` }}
                        transition={{ delay: 0.5 + index * 0.15, duration: 0.8 }}
                        className="h-full bg-current"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Immediate Action Required</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Recommended Tests:</h4>
                <div className="flex flex-wrap gap-1">
                  {step?.content?.data?.tests?.map((test, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {test}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Initial Treatment:</h4>
                <div className="space-y-1">
                  {step?.content?.data?.treatments?.map((treatment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <Icon name="Pill" size={10} className="text-accent" />
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2 border-t">
              <Icon name="BookOpen" size={12} />
              <span>{step?.content?.data?.evidence} evidence sources reviewed</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-background" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
            <Icon name="Play" size={16} className="mr-2" />
            Interactive Demo
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            See AI Diagnostics in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience how our AI analyzes patient symptoms and generates accurate differential diagnoses with evidence-based recommendations.
          </p>
          
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="group"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} className="mr-2" />
            {isPlaying ? 'Pause Demo' : 'Start Demo'}
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Steps Navigation */}
          <div className="space-y-4">
            {demoSteps?.map((step, index) => (
              <motion.div
                key={step?.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-primary/5 border-primary shadow-medical'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-300 ${
                    activeStep === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors duration-300 ${
                      activeStep === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{step?.description}</p>
                  </div>
                  {activeStep === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <Icon name="ChevronRight" size={20} className="text-primary" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Content Display */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl shadow-medical-lg overflow-hidden"
            >
              {/* Mock Interface Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={16} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">MedRAG Diagnostics</h3>
                    <p className="text-xs text-muted-foreground">Patient Case Analysis</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className="p-6 min-h-80">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{activeStep + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{demoSteps?.[activeStep]?.title}</h3>
                        <p className="text-sm text-muted-foreground">{demoSteps?.[activeStep]?.description}</p>
                      </div>
                    </div>
                    {renderStepContent(demoSteps?.[activeStep])}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicator */}
              <div className="px-6 pb-4">
                <div className="flex space-x-1">
                  {demoSteps?.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeStep ? 'bg-primary flex-1' : 'bg-border w-8'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Demo Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-4 mt-6"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm text-muted-foreground">
                {activeStep + 1} of {demoSteps?.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep(Math.min(demoSteps?.length - 1, activeStep + 1))}
                disabled={activeStep === demoSteps?.length - 1}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemoSection;