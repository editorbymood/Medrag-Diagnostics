import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiagnosisCard = ({ diagnosis, rank, onExpand, isExpanded }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'bg-success text-success-foreground';
    if (confidence >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-error text-error-foreground';
  };

  const getConfidenceBarColor = (confidence) => {
    if (confidence >= 80) return 'bg-success';
    if (confidence >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-primary text-primary-foreground';
    if (rank === 2) return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="diagnostic-card p-6 mb-4 transition-all duration-200 hover:shadow-medical-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadgeColor(rank)}`}>
            {rank}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{diagnosis?.condition}</h3>
            <p className="text-sm text-muted-foreground mb-3">{diagnosis?.description}</p>
            
            {/* Confidence Score */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-sm font-medium text-foreground">Confidence:</span>
              <div className="flex-1 max-w-32">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getConfidenceBarColor(diagnosis?.confidence)}`}
                    style={{ width: `${diagnosis?.confidence}%` }}
                  />
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getConfidenceColor(diagnosis?.confidence)}`}>
                {diagnosis?.confidence}%
              </span>
            </div>

            {/* Key Symptoms */}
            <div className="flex flex-wrap gap-2 mb-3">
              {diagnosis?.matchingSymptoms?.slice(0, 3)?.map((symptom, index) => (
                <span key={index} className="px-2 py-1 bg-accent/10 text-accent-foreground rounded-md text-xs">
                  {symptom}
                </span>
              ))}
              {diagnosis?.matchingSymptoms?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                  +{diagnosis?.matchingSymptoms?.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onExpand(diagnosis?.id)}
          className="ml-4"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Detailed Analysis */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Clinical Analysis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {diagnosis?.clinicalAnalysis}
            </p>
          </div>

          {/* All Matching Symptoms */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Matching Symptoms ({diagnosis?.matchingSymptoms?.length})</h4>
            <div className="flex flex-wrap gap-2">
              {diagnosis?.matchingSymptoms?.map((symptom, index) => (
                <span key={index} className="px-2 py-1 bg-success/10 text-success border border-success/20 rounded-md text-xs">
                  <Icon name="Check" size={12} className="inline mr-1" />
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Literature References */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Supporting Literature</h4>
            <div className="space-y-2">
              {diagnosis?.references?.map((ref, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-md">
                  <Icon name="FileText" size={16} className="text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{ref?.title}</p>
                    <p className="text-xs text-muted-foreground">{ref?.journal} • {ref?.year}</p>
                    <p className="text-xs text-accent mt-1">Relevance: {ref?.relevance}%</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tests */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Recommended Diagnostic Tests</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {diagnosis?.recommendedTests?.map((test, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-warning/10 border border-warning/20 rounded-md">
                  <Icon name="TestTube" size={14} className="text-warning" />
                  <span className="text-sm text-foreground">{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <Button variant="outline" size="sm">
              <Icon name="BookOpen" size={14} className="mr-2" />
              View Guidelines
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Users" size={14} className="mr-2" />
              Consult Specialist
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Calendar" size={14} className="mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisCard;