import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={onChange}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={onChange}
            error={errors?.lastName}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="doctor@hospital.com"
            value={formData?.email}
            onChange={onChange}
            error={errors?.email}
            description="This will be your login email"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={onChange}
            error={errors?.phone}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;