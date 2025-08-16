import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
            <Icon name="Activity" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">MedRAG</h1>
            <p className="text-sm text-primary font-medium -mt-1">Diagnostics</p>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Welcome Back, Doctor
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Sign in to access your AI-powered diagnostic assistant and eliminate medical misdiagnosis with confidence.
        </p>
      </div>

      {/* Key Features */}
      <div className="flex items-center justify-center space-x-6 pt-2">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">AI-Powered</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">HIPAA Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-accent" />
          <span className="text-xs text-muted-foreground">98% Accuracy</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;