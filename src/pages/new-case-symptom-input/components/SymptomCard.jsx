import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SymptomCard = ({ 
  symptom, 
  onRemove = () => {}, 
  onUpdateSeverity = () => {}, 
  onUpdateDuration = () => {},
  className = ""
}) => {
  const severityLevels = [
    { value: 1, label: 'Mild', color: 'text-green-600 bg-green-50' },
    { value: 2, label: 'Moderate', color: 'text-yellow-600 bg-yellow-50' },
    { value: 3, label: 'Severe', color: 'text-red-600 bg-red-50' }
  ];

  const durationOptions = [
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' }
  ];

  const getSeverityColor = (severity) => {
    const level = severityLevels?.find(s => s?.value === severity);
    return level ? level?.color : 'text-gray-600 bg-gray-50';
  };

  const getSeverityLabel = (severity) => {
    const level = severityLevels?.find(s => s?.value === severity);
    return level ? level?.label : 'Unknown';
  };

  return (
    <div className={`diagnostic-card p-4 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-foreground">{symptom?.name}</h4>
            {symptom?.code && (
              <span className="clinical-data text-xs text-muted-foreground">
                {symptom?.code}
              </span>
            )}
          </div>
          {symptom?.category && (
            <span className="text-xs text-muted-foreground">{symptom?.category}</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(symptom?.id)}
          className="text-error hover:text-error hover:bg-error/10"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Severity Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Severity
          </label>
          <div className="flex space-x-2">
            {severityLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => onUpdateSeverity(symptom?.id, level?.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                  symptom?.severity === level?.value
                    ? level?.color
                    : 'text-muted-foreground bg-muted hover:bg-muted/80'
                }`}
              >
                {level?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Duration
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={symptom?.durationValue || ''}
              onChange={(e) => onUpdateDuration(symptom?.id, 'value', parseInt(e?.target?.value))}
              className="w-16 px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="1"
            />
            <select
              value={symptom?.durationUnit || 'days'}
              onChange={(e) => onUpdateDuration(symptom?.id, 'unit', e?.target?.value)}
              className="px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {durationOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Additional Notes */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Additional Notes
        </label>
        <textarea
          value={symptom?.notes || ''}
          onChange={(e) => onUpdateDuration(symptom?.id, 'notes', e?.target?.value)}
          placeholder="Any additional details about this symptom..."
          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows="2"
        />
      </div>
      {/* Symptom Summary */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Current Status:</span>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full font-medium ${getSeverityColor(symptom?.severity)}`}>
              {getSeverityLabel(symptom?.severity)}
            </span>
            {symptom?.durationValue && symptom?.durationUnit && (
              <span className="text-muted-foreground">
                for {symptom?.durationValue} {symptom?.durationUnit}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomCard;