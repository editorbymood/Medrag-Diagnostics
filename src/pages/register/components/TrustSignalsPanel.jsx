import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignalsPanel = () => {
  const certifications = [
    {
      name: "HIPAA Compliant",
      icon: "Shield",
      description: "Full compliance with healthcare privacy regulations"
    },
    {
      name: "SOC 2 Type II",
      icon: "Lock",
      description: "Rigorous security and availability controls"
    },
    {
      name: "FDA Cleared",
      icon: "CheckCircle",
      description: "Cleared for clinical decision support"
    },
    {
      name: "ISO 27001",
      icon: "Award",
      description: "International security management standard"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Emergency Medicine",
      hospital: "Johns Hopkins Hospital",
      quote: "MedRAG has significantly improved our diagnostic accuracy in complex cases. The AI insights help me consider differential diagnoses I might have missed.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Internal Medicine",
      hospital: "Mayo Clinic",
      quote: "The integration with medical literature is outstanding. It\'s like having a research assistant that never sleeps.",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. Emily Watson",
      specialty: "Family Medicine",
      hospital: "Cleveland Clinic",
      quote: "Patient outcomes have improved since we started using MedRAG. The confidence scores help me make more informed decisions.",
      avatar: "https://images.unsplash.com/photo-1594824388853-d0c1b0b8c8c0?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const benefits = [
    {
      icon: "Brain",
      title: "AI-Powered Diagnostics",
      description: "Advanced machine learning trained on millions of medical cases and research papers"
    },
    {
      icon: "Database",
      title: "PubMed Integration",
      description: "Real-time access to the latest medical research and clinical guidelines"
    },
    {
      icon: "TrendingUp",
      title: "Improved Accuracy",
      description: "Studies show 23% improvement in diagnostic accuracy with AI assistance"
    },
    {
      icon: "Clock",
      title: "Time Savings",
      description: "Reduce diagnostic time by up to 40% while maintaining clinical quality"
    },
    {
      icon: "Users",
      title: "Collaborative Care",
      description: "Share insights with colleagues and build institutional knowledge"
    },
    {
      icon: "FileText",
      title: "Comprehensive Reports",
      description: "Generate detailed diagnostic reports with evidence-based recommendations"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Certifications */}
      <div className="diagnostic-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Security & Compliance
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Benefits */}
      <div className="diagnostic-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Why Choose MedRAG?
        </h3>
        <div className="space-y-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={benefit?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
                <p className="text-xs text-muted-foreground">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="diagnostic-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Trusted by Healthcare Professionals
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-4">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground italic mb-2">
                    "{testimonial?.quote}"
                  </p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.specialty} • {testimonial?.hospital}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="diagnostic-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Platform Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">50,000+</p>
            <p className="text-xs text-muted-foreground">Healthcare Professionals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">2M+</p>
            <p className="text-xs text-muted-foreground">Cases Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">98.7%</p>
            <p className="text-xs text-muted-foreground">Uptime Reliability</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-xs text-muted-foreground">User Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalsPanel;