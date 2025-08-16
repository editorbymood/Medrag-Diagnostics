import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PatientDemographics = ({ 
  demographics = {}, 
  onUpdate = () => {},
  className = ""
}) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const bloodTypeOptions = [
    { value: 'a-positive', label: 'A+' },
    { value: 'a-negative', label: 'A-' },
    { value: 'b-positive', label: 'B+' },
    { value: 'b-negative', label: 'B-' },
    { value: 'ab-positive', label: 'AB+' },
    { value: 'ab-negative', label: 'AB-' },
    { value: 'o-positive', label: 'O+' },
    { value: 'o-negative', label: 'O-' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const medicalHistoryOptions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'heart-disease', label: 'Heart Disease' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'allergies', label: 'Known Allergies' },
    { id: 'cancer', label: 'Cancer History' },
    { id: 'kidney-disease', label: 'Kidney Disease' },
    { id: 'liver-disease', label: 'Liver Disease' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({
      ...demographics,
      [field]: value
    });
  };

  const handleMedicalHistoryChange = (conditionId, checked) => {
    const currentHistory = demographics?.medicalHistory || [];
    const updatedHistory = checked
      ? [...currentHistory, conditionId]
      : currentHistory?.filter(id => id !== conditionId);
    
    handleInputChange('medicalHistory', updatedHistory);
  };

  return (
    <div className={`diagnostic-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Patient Demographics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <Input
            label="Patient ID"
            type="text"
            value={demographics?.patientId || ''}
            onChange={(e) => handleInputChange('patientId', e?.target?.value)}
            placeholder="P-2024-001"
            required
          />
          
          <Input
            label="Full Name"
            type="text"
            value={demographics?.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            placeholder="Enter patient's full name"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              value={demographics?.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e?.target?.value))}
              placeholder="45"
              min="0"
              max="150"
              required
            />
            
            <Select
              label="Gender"
              options={genderOptions}
              value={demographics?.gender || ''}
              onChange={(value) => handleInputChange('gender', value)}
              placeholder="Select gender"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Weight (kg)"
              type="number"
              value={demographics?.weight || ''}
              onChange={(e) => handleInputChange('weight', parseFloat(e?.target?.value))}
              placeholder="70.5"
              min="0"
              step="0.1"
            />
            
            <Input
              label="Height (cm)"
              type="number"
              value={demographics?.height || ''}
              onChange={(e) => handleInputChange('height', parseInt(e?.target?.value))}
              placeholder="175"
              min="0"
            />
          </div>
          
          <Select
            label="Blood Type"
            options={bloodTypeOptions}
            value={demographics?.bloodType || ''}
            onChange={(value) => handleInputChange('bloodType', value)}
            placeholder="Select blood type"
          />
        </div>

        {/* Medical History */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Medical History</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {medicalHistoryOptions?.map((condition) => (
                <Checkbox
                  key={condition?.id}
                  label={condition?.label}
                  checked={(demographics?.medicalHistory || [])?.includes(condition?.id)}
                  onChange={(e) => handleMedicalHistoryChange(condition?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>
          
          <Input
            label="Current Medications"
            type="text"
            value={demographics?.medications || ''}
            onChange={(e) => handleInputChange('medications', e?.target?.value)}
            placeholder="List current medications separated by commas"
            description="Include dosage and frequency if known"
          />
          
          <Input
            label="Known Allergies"
            type="text"
            value={demographics?.allergies || ''}
            onChange={(e) => handleInputChange('allergies', e?.target?.value)}
            placeholder="List known allergies separated by commas"
            description="Include drug, food, and environmental allergies"
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Notes
            </label>
            <textarea
              value={demographics?.notes || ''}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Any additional relevant medical information..."
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows="4"
            />
          </div>
        </div>
      </div>
      {/* BMI Calculation */}
      {demographics?.weight && demographics?.height && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">BMI:</span>
            <div className="text-right">
              {(() => {
                const heightInM = demographics?.height / 100;
                const bmi = (demographics?.weight / (heightInM * heightInM))?.toFixed(1);
                const getBMICategory = (bmi) => {
                  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
                  if (bmi < 25) return { label: 'Normal', color: 'text-green-600' };
                  if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600' };
                  return { label: 'Obese', color: 'text-red-600' };
                };
                const category = getBMICategory(parseFloat(bmi));
                
                return (
                  <div className="text-sm">
                    <span className="clinical-data font-semibold">{bmi}</span>
                    <span className={`ml-2 ${category?.color} font-medium`}>
                      ({category?.label})
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDemographics;