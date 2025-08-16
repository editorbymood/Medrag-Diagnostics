import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickSymptomButtons = ({ 
  onSymptomAdd = () => {},
  className = ""
}) => {
  const commonSymptomGroups = [
    {
      category: 'Cardiovascular',
      icon: 'Heart',
      color: 'text-red-600 bg-red-50 hover:bg-red-100',
      symptoms: [
        { name: 'Chest Pain', code: 'R06.02' },
        { name: 'Palpitations', code: 'R00.2' },
        { name: 'Shortness of Breath', code: 'R06.00' },
        { name: 'Dizziness', code: 'R42' }
      ]
    },
    {
      category: 'Respiratory',
      icon: 'Wind',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      symptoms: [
        { name: 'Cough', code: 'R05' },
        { name: 'Shortness of Breath', code: 'R06.00' },
        { name: 'Wheezing', code: 'R06.2' },
        { name: 'Chest Tightness', code: 'R06.89' }
      ]
    },
    {
      category: 'Neurological',
      icon: 'Brain',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      symptoms: [
        { name: 'Headache', code: 'R51' },
        { name: 'Dizziness', code: 'R42' },
        { name: 'Confusion', code: 'R41.0' },
        { name: 'Weakness', code: 'M62.81' }
      ]
    },
    {
      category: 'Gastrointestinal',
      icon: 'Activity',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      symptoms: [
        { name: 'Nausea', code: 'R11.0' },
        { name: 'Vomiting', code: 'R11.10' },
        { name: 'Abdominal Pain', code: 'R10.9' },
        { name: 'Diarrhea', code: 'K59.1' }
      ]
    }
  ];

  const emergencySymptoms = [
    { name: 'Severe Chest Pain', code: 'R06.02', severity: 3 },
    { name: 'Difficulty Breathing', code: 'R06.03', severity: 3 },
    { name: 'Loss of Consciousness', code: 'R55', severity: 3 },
    { name: 'Severe Headache', code: 'R51', severity: 3 }
  ];

  const handleSymptomClick = (symptom, category) => {
    const symptomData = {
      id: `${symptom?.code}-${Date.now()}`,
      name: symptom?.name,
      code: symptom?.code,
      category: category,
      severity: symptom?.severity || 1,
      durationValue: 1,
      durationUnit: 'days',
      notes: ''
    };
    onSymptomAdd(symptomData);
  };

  return (
    <div className={`diagnostic-card p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Quick Add Symptoms</h3>
      </div>
      {/* Emergency Symptoms */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-red-600" />
          <h4 className="text-sm font-medium text-foreground">Emergency Symptoms</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {emergencySymptoms?.map((symptom) => (
            <Button
              key={symptom?.code}
              variant="outline"
              size="sm"
              onClick={() => handleSymptomClick(symptom, 'Emergency')}
              className="justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <Icon name="AlertCircle" size={14} className="mr-2" />
              {symptom?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Common Symptom Groups */}
      <div className="space-y-6">
        {commonSymptomGroups?.map((group) => (
          <div key={group?.category}>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={group?.icon} size={16} className={group?.color?.split(' ')?.[0]} />
              <h4 className="text-sm font-medium text-foreground">{group?.category}</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group?.symptoms?.map((symptom) => (
                <Button
                  key={symptom?.code}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSymptomClick(symptom, group?.category)}
                  className={`justify-start ${group?.color} border-current/20`}
                >
                  <Icon name="Plus" size={14} className="mr-2" />
                  <span className="truncate">{symptom?.name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Usage Tips */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-yellow-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Quick Tips</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Click any symptom to add it instantly</li>
              <li>• Emergency symptoms are marked with high severity</li>
              <li>• You can modify severity and duration after adding</li>
              <li>• Use the search box above for specific symptoms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSymptomButtons;