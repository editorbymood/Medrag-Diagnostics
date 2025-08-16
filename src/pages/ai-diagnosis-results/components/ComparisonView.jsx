import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonView = ({ diagnoses, selectedDiagnoses = [], onToggleSelection, onCompare }) => {
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = () => {
    setIsComparing(true);
    onCompare(selectedDiagnoses);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const comparisonData = selectedDiagnoses?.map(id => 
    diagnoses?.find(d => d?.id === id)
  )?.filter(Boolean);

  if (isComparing && comparisonData?.length >= 2) {
    return (
      <div className="diagnostic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Differential Diagnosis Comparison</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsComparing(false)}
          >
            <Icon name="X" size={14} className="mr-2" />
            Close Comparison
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Criteria</th>
                {comparisonData?.map((diagnosis, index) => (
                  <th key={diagnosis?.id} className="text-left p-3 min-w-48">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-primary text-primary-foreground' : 
                        index === 1 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{diagnosis?.condition}</p>
                        <p className={`text-xs font-semibold ${getConfidenceColor(diagnosis?.confidence)}`}>
                          {diagnosis?.confidence}%
                        </p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 text-sm font-medium text-foreground">Matching Symptoms</td>
                {comparisonData?.map(diagnosis => (
                  <td key={`${diagnosis?.id}-symptoms`} className="p-3">
                    <div className="space-y-1">
                      {diagnosis?.matchingSymptoms?.slice(0, 4)?.map((symptom, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-xs">{symptom}</span>
                        </div>
                      ))}
                      {diagnosis?.matchingSymptoms?.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{diagnosis?.matchingSymptoms?.length - 4} more
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border">
                <td className="p-3 text-sm font-medium text-foreground">Key Differentiators</td>
                {comparisonData?.map(diagnosis => (
                  <td key={`${diagnosis?.id}-diff`} className="p-3">
                    <div className="space-y-1">
                      {diagnosis?.keyDifferentiators?.map((diff, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <Icon name="AlertTriangle" size={12} className="text-warning" />
                          <span className="text-xs">{diff}</span>
                        </div>
                      )) || (
                        <span className="text-xs text-muted-foreground">No specific differentiators</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border">
                <td className="p-3 text-sm font-medium text-foreground">Recommended Tests</td>
                {comparisonData?.map(diagnosis => (
                  <td key={`${diagnosis?.id}-tests`} className="p-3">
                    <div className="space-y-1">
                      {diagnosis?.recommendedTests?.slice(0, 3)?.map((test, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <Icon name="TestTube" size={12} className="text-accent" />
                          <span className="text-xs">{test}</span>
                        </div>
                      ))}
                      {diagnosis?.recommendedTests?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{diagnosis?.recommendedTests?.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border">
                <td className="p-3 text-sm font-medium text-foreground">Treatment Urgency</td>
                {comparisonData?.map(diagnosis => (
                  <td key={`${diagnosis?.id}-urgency`} className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      diagnosis?.urgency === 'high' ? 'bg-error/10 text-error' :
                      diagnosis?.urgency === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      {diagnosis?.urgency || 'Low'} Priority
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-sm font-medium text-foreground">Literature Support</td>
                {comparisonData?.map(diagnosis => (
                  <td key={`${diagnosis?.id}-lit`} className="p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="BookOpen" size={12} className="text-primary" />
                      <span className="text-xs">{diagnosis?.references?.length} studies</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Avg. relevance: {Math.round(diagnosis?.references?.reduce((acc, ref) => acc + ref?.relevance, 0) / diagnosis?.references?.length)}%
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent-foreground mb-1">Clinical Decision Support</p>
              <p className="text-xs text-accent-foreground">
                Based on the comparison above, consider ordering the most specific diagnostic tests 
                for the highest confidence diagnosis while ruling out conditions with overlapping symptoms.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnostic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Compare Diagnoses</h3>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleCompare}
          disabled={selectedDiagnoses?.length < 2}
        >
          <Icon name="GitCompare" size={14} className="mr-2" />
          Compare Selected ({selectedDiagnoses?.length})
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Select 2-3 diagnoses to compare their differential characteristics, symptoms, and recommended tests.
      </p>
      <div className="space-y-3">
        {diagnoses?.slice(0, 5)?.map((diagnosis, index) => (
          <div
            key={diagnosis?.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedDiagnoses?.includes(diagnosis?.id)
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onToggleSelection(diagnosis?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selectedDiagnoses?.includes(diagnosis?.id)
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedDiagnoses?.includes(diagnosis?.id) && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{diagnosis?.condition}</p>
                  <p className="text-xs text-muted-foreground">
                    {diagnosis?.matchingSymptoms?.length} matching symptoms
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getConfidenceColor(diagnosis?.confidence)}`}>
                  {diagnosis?.confidence}%
                </p>
                <p className="text-xs text-muted-foreground">Rank #{index + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedDiagnoses?.length > 0 && selectedDiagnoses?.length < 2 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={14} className="text-warning" />
            <p className="text-xs text-warning-foreground">
              Select at least 2 diagnoses to enable comparison.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonView;