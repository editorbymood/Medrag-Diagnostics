import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'HIPAA Compliant',
      icon: 'Shield',
      description: 'Patient data protection'
    },
    {
      name: 'SOC 2 Type II',
      icon: 'Lock',
      description: 'Security certified'
    },
    {
      name: 'FDA Cleared',
      icon: 'CheckCircle',
      description: 'Medical device approved'
    },
    {
      name: 'HL7 FHIR',
      icon: 'Database',
      description: 'Healthcare interoperability'
    }
  ];

  const testimonials = [
    {
      quote: "MedRAG has significantly improved our diagnostic accuracy and reduced misdiagnosis rates.",
      author: "Dr. Michael Chen",
      title: "Chief of Internal Medicine",
      hospital: "Stanford Medical Center"
    },
    {
      quote: "The AI-powered insights help me make more confident clinical decisions.",
      author: "Dr. Sarah Johnson",
      title: "Emergency Medicine Physician",
      hospital: "Mayo Clinic"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Certifications */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
          Trusted by Healthcare Professionals
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-primary">98%</p>
          <p className="text-xs text-muted-foreground">Diagnostic Accuracy</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">50K+</p>
          <p className="text-xs text-muted-foreground">Healthcare Professionals</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">1M+</p>
          <p className="text-xs text-muted-foreground">Cases Analyzed</p>
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Quote" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground italic mb-2">"{testimonial?.quote}"</p>
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium">{testimonial?.author}</p>
                  <p>{testimonial?.title}</p>
                  <p>{testimonial?.hospital}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;