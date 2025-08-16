import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1,
  totalSteps = 3,
  className = ""
}) => {
  const steps = [
    { id: 1, title: 'Symptom Input', description: 'Collect patient symptoms', icon: 'Stethoscope' },
    { id: 2, title: 'Document Upload', description: 'Upload medical documents', icon: 'Upload' },
    { id: 3, title: 'AI Analysis', description: 'Generate diagnosis', icon: 'Brain' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'active':
        return 'bg-primary text-primary-foreground border-primary';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className={`diagnostic-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Diagnostic Process</h3>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      <div className="relative">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="relative flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${getStepClasses(status)}
                  `}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium ${
                      status === 'active' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 max-w-24">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-all duration-300 ${getConnectorClasses(step?.id)}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Current Step Details */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Current Step:</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {currentStep === 1 && "Enter patient symptoms and demographic information to begin the diagnostic process."}
          {currentStep === 2 && "Upload relevant medical documents, test results, and imaging studies."}
          {currentStep === 3 && "Review AI-generated diagnostic suggestions and confidence scores."}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;