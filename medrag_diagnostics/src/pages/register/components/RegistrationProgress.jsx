import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ 
  currentStep, 
  completedSteps,
  formValidation 
}) => {
  const steps = [
    {
      id: 'personal',
      title: 'Personal Info',
      icon: 'User',
      fields: ['firstName', 'lastName', 'email', 'phone']
    },
    {
      id: 'professional',
      title: 'Credentials',
      icon: 'Award',
      fields: ['licenseNumber', 'specialty', 'institutionType', 'institutionName', 'experience']
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Lock',
      fields: ['password', 'confirmPassword']
    },
    {
      id: 'compliance',
      title: 'Compliance',
      icon: 'Shield',
      fields: ['acceptTerms', 'acceptHipaa']
    }
  ];

  const getStepStatus = (step) => {
    if (completedSteps?.includes(step?.id)) return 'completed';
    if (currentStep === step?.id) return 'current';
    return 'pending';
  };

  const getStepValidation = (step) => {
    const requiredFields = step?.fields;
    const validFields = requiredFields?.filter(field => {
      if (field === 'acceptTerms' || field === 'acceptHipaa') {
        return formValidation?.[field] === true;
      }
      return formValidation?.[field] && formValidation?.[field]?.length > 0;
    });
    
    return {
      total: requiredFields?.length,
      completed: validFields?.length,
      percentage: Math.round((validFields?.length / requiredFields?.length) * 100)
    };
  };

  return (
    <div className="diagnostic-card p-4 mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Registration Progress</h3>
      <div className="space-y-3">
        {steps?.map((step, index) => {
          const status = getStepStatus(step);
          const validation = getStepValidation(step);
          
          return (
            <div key={step?.id} className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'completed' ? 'bg-success text-white' :
                status === 'current'? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' :
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {validation?.completed}/{validation?.total}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1 mt-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      status === 'completed' ? 'bg-success' :
                      status === 'current'? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    style={{ width: `${validation?.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Overall Progress</span>
          <span>{completedSteps?.length}/{steps?.length} sections complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-1">
          <div 
            className="h-2 bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps?.length / steps?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationProgress;