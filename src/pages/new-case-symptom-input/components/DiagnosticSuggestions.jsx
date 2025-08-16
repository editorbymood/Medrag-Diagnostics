import React from 'react';
import Icon from '../../../components/AppIcon';

const DiagnosticSuggestions = ({ 
  symptoms = [], 
  demographics = {},
  className = ""
}) => {
  // Mock diagnostic suggestions based on symptoms
  const generateSuggestions = () => {
    if (symptoms?.length === 0) {
      return [];
    }

    const suggestions = [
      {
        id: 'cardiovascular-1',
        condition: 'Acute Coronary Syndrome',
        confidence: 78,
        icd10: 'I20.9',
        reasoning: `Based on chest pain and associated symptoms. Consider ECG and cardiac enzymes.`,
        urgency: 'high',
        recommendedTests: ['ECG', 'Troponin', 'CXR']
      },
      {
        id: 'respiratory-1',
        condition: 'Pulmonary Embolism',
        confidence: 65,
        icd10: 'I26.9',
        reasoning: `Shortness of breath with chest pain pattern suggests possible PE. D-dimer and CT-PA recommended.`,
        urgency: 'high',
        recommendedTests: ['D-dimer', 'CT-PA', 'ABG']
      },
      {
        id: 'musculoskeletal-1',
        condition: 'Costochondritis',
        confidence: 45,
        icd10: 'M94.0',
        reasoning: `Chest wall pain that may be reproducible with palpation. Consider if pain is positional.`,
        urgency: 'low',
        recommendedTests: ['Physical Exam', 'CXR']
      },
      {
        id: 'gastrointestinal-1',
        condition: 'GERD',
        confidence: 35,
        icd10: 'K21.9',
        reasoning: `Chest discomfort may be related to acid reflux, especially if associated with meals.`,
        urgency: 'low',
        recommendedTests: ['Upper GI Series', 'pH Study']
      }
    ];

    // Filter suggestions based on symptoms
    const symptomNames = symptoms?.map(s => s?.name?.toLowerCase());
    
    if (symptomNames?.includes('chest pain')) {
      return suggestions;
    }
    
    if (symptomNames?.includes('shortness of breath')) {
      return suggestions?.filter(s => s?.id?.includes('respiratory') || s?.id?.includes('cardiovascular'));
    }
    
    return suggestions?.slice(0, 2);
  };

  const suggestions = generateSuggestions();

  const getConfidenceColor = (confidence) => {
    if (confidence >= 70) return 'text-red-600 bg-red-50';
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Info';
    }
  };

  if (symptoms?.length === 0) {
    return (
      <div className={`diagnostic-card p-6 ${className}`}>
        <div className="text-center py-8">
          <Icon name="Brain" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">AI Diagnostic Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Add symptoms to see AI-powered diagnostic suggestions and confidence scores.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`diagnostic-card p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Brain" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">AI Diagnostic Suggestions</h3>
        <div className="confidence-indicator">
          Real-time Analysis
        </div>
      </div>
      <div className="space-y-4">
        {suggestions?.map((suggestion, index) => (
          <div key={suggestion?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{suggestion?.condition}</span>
                  <span className="clinical-data text-xs text-muted-foreground">
                    {suggestion?.icd10}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getUrgencyIcon(suggestion?.urgency)} 
                    size={14} 
                    className={`${getUrgencyColor(suggestion?.urgency)?.split(' ')?.[0]}`}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {suggestion?.urgency} Priority
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(suggestion?.confidence)}`}>
                  {suggestion?.confidence}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Confidence
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {suggestion?.reasoning}
            </p>

            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-foreground">Recommended Tests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {suggestion?.recommendedTests?.map((test, testIndex) => (
                      <span 
                        key={testIndex}
                        className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Rank #{index + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Analysis based on {symptoms?.length} symptom{symptoms?.length !== 1 ? 's' : ''}</span>
          <span>Updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticSuggestions;