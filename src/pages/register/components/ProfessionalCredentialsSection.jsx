import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ProfessionalCredentialsSection = ({ 
  formData, 
  errors, 
  onChange,
  licenseVerificationStatus 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const medicalSpecialties = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'emergency-medicine', label: 'Emergency Medicine' },
    { value: 'family-medicine', label: 'Family Medicine' },
    { value: 'internal-medicine', label: 'Internal Medicine' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'other', label: 'Other' }
  ];

  const institutionTypes = [
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Private Clinic' },
    { value: 'academic', label: 'Academic Medical Center' },
    { value: 'telehealth', label: 'Telehealth Platform' },
    { value: 'research', label: 'Research Institution' },
    { value: 'other', label: 'Other' }
  ];

  const getVerificationStatusIcon = () => {
    switch (licenseVerificationStatus) {
      case 'verified':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'verifying':
        return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <Icon name="AlertCircle" size={20} className="text-warning" />;
    }
  };

  const getVerificationStatusText = () => {
    switch (licenseVerificationStatus) {
      case 'verified':
        return 'License verified successfully';
      case 'failed':
        return 'License verification failed';
      case 'verifying':
        return 'Verifying license...';
      default:
        return 'License verification pending';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Credentials</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Medical License Number"
              type="text"
              name="licenseNumber"
              placeholder="Enter your medical license number"
              value={formData?.licenseNumber}
              onChange={onChange}
              error={errors?.licenseNumber}
              description="We'll verify this with state medical boards"
              required
            />
            {formData?.licenseNumber && (
              <div className="flex items-center space-x-2 mt-2 p-2 bg-muted rounded-md">
                {getVerificationStatusIcon()}
                <span className={`text-sm ${
                  licenseVerificationStatus === 'verified' ? 'text-success' :
                  licenseVerificationStatus === 'failed'? 'text-error' : 'text-muted-foreground'
                }`}>
                  {getVerificationStatusText()}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Medical Specialty"
              options={medicalSpecialties}
              value={formData?.specialty}
              onChange={(value) => onChange({ target: { name: 'specialty', value } })}
              placeholder="Select your specialty"
              error={errors?.specialty}
              searchable
              required
            />
            <Select
              label="Institution Type"
              options={institutionTypes}
              value={formData?.institutionType}
              onChange={(value) => onChange({ target: { name: 'institutionType', value } })}
              placeholder="Select institution type"
              error={errors?.institutionType}
              required
            />
          </div>

          <Input
            label="Institution Name"
            type="text"
            name="institutionName"
            placeholder="Enter your hospital/clinic name"
            value={formData?.institutionName}
            onChange={onChange}
            error={errors?.institutionName}
            description="The healthcare facility where you practice"
            required
          />

          <Input
            label="Years of Experience"
            type="number"
            name="experience"
            placeholder="5"
            value={formData?.experience}
            onChange={onChange}
            error={errors?.experience}
            min="0"
            max="50"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCredentialsSection;