import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DocumentCategorySelector = ({ value, onChange, error }) => {
  const categoryOptions = [
    { 
      value: 'lab-results', 
      label: 'Lab Results',
      description: 'Blood tests, urine analysis, pathology reports'
    },
    { 
      value: 'imaging', 
      label: 'Medical Imaging',
      description: 'X-rays, CT scans, MRI, ultrasound images'
    },
    { 
      value: 'previous-diagnosis', 
      label: 'Previous Diagnoses',
      description: 'Past medical diagnoses and treatment records'
    },
    { 
      value: 'patient-history', 
      label: 'Patient History',
      description: 'Medical history, family history, medications'
    },
    { 
      value: 'consultation-notes', 
      label: 'Consultation Notes',
      description: 'Doctor notes, specialist consultations'
    },
    { 
      value: 'prescription', 
      label: 'Prescriptions',
      description: 'Current and past medication prescriptions'
    },
    { 
      value: 'discharge-summary', 
      label: 'Discharge Summary',
      description: 'Hospital discharge summaries and care plans'
    },
    { 
      value: 'other', 
      label: 'Other Medical Documents',
      description: 'Insurance forms, referrals, other medical records'
    }
  ];

  const getCategoryIcon = (category) => {
    const iconMap = {
      'lab-results': 'TestTube',
      'imaging': 'Scan',
      'previous-diagnosis': 'FileText',
      'patient-history': 'User',
      'consultation-notes': 'Stethoscope',
      'prescription': 'Pill',
      'discharge-summary': 'ClipboardList',
      'other': 'FileQuestion'
    };
    return iconMap?.[category] || 'File';
  };

  const selectedCategory = categoryOptions?.find(option => option?.value === value);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name="Tag" size={16} className="text-primary" />
        <h3 className="text-sm font-medium text-foreground">Document Category</h3>
      </div>
      <Select
        label="Select document type"
        description="Choose the most appropriate category for better AI analysis"
        placeholder="Choose document category..."
        options={categoryOptions}
        value={value}
        onChange={onChange}
        error={error}
        searchable
        required
        className="w-full"
      />
      {selectedCategory && (
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-md">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name={getCategoryIcon(selectedCategory?.value)} size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{selectedCategory?.label}</p>
            <p className="text-xs text-muted-foreground">{selectedCategory?.description}</p>
          </div>
        </div>
      )}
      <div className="bg-accent/10 border border-accent/20 rounded-md p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-xs text-accent-foreground">
            <p className="font-medium mb-1">AI Analysis Enhancement</p>
            <p>Proper categorization helps our AI system better understand and analyze your documents, leading to more accurate diagnostic suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCategorySelector;