import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CaseContextSidebar = ({ 
  isOpen = true, 
  onToggle = () => {}, 
  caseData = null,
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const defaultCaseData = {
    patientId: 'P-2024-001',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    symptoms: [
      'Chest pain',
      'Shortness of breath',
      'Fatigue'
    ],
    documents: [
      { name: 'ECG_Report.pdf', type: 'ECG', uploadedAt: '2024-08-16 07:30' },
      { name: 'Blood_Test.pdf', type: 'Lab', uploadedAt: '2024-08-16 07:25' }
    ],
    confidence: 87,
    status: 'In Progress',
    createdAt: '2024-08-16 07:20'
  };

  const currentCase = caseData || defaultCaseData;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'symptoms', label: 'Symptoms', icon: 'Stethoscope' },
    { id: 'documents', label: 'Documents', icon: 'Upload' },
    { id: 'analysis', label: 'Analysis', icon: 'Brain' }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'medical-status-success';
      case 'in progress':
        return 'medical-status-warning';
      case 'pending':
        return 'medical-status-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  if (!isOpen) {
    return (
      <div className={`fixed right-4 top-20 z-40 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="shadow-medical"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-30 lg:hidden"
        onClick={onToggle}
      />
      {/* Sidebar */}
      <div className={`fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border shadow-medical-lg z-40 lg:static lg:w-80 lg:shadow-none ${className}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Case Context</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-1 px-2 py-3 text-xs font-medium transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={14} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="clinical-data">{currentCase?.patientId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{currentCase?.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>{currentCase?.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span>{currentCase?.gender}</span>
                    </div>
                  </div>
                </div>

                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">Case Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentCase?.status)}`}>
                        {currentCase?.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <span className={`font-semibold ${getConfidenceColor(currentCase?.confidence)}`}>
                        {currentCase?.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created:</span>
                      <span className="text-sm clinical-data">{currentCase?.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'symptoms' && (
              <div className="space-y-4">
                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">Reported Symptoms</h4>
                  <div className="space-y-2">
                    {currentCase?.symptoms?.map((symptom, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Icon name="AlertCircle" size={16} className="text-warning" />
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">Uploaded Documents</h4>
                  <div className="space-y-3">
                    {currentCase?.documents?.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-md">
                        <Icon name="FileText" size={16} className="text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                          <p className="text-xs text-muted-foreground">{doc?.type} • {doc?.uploadedAt}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="Download" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-4">
                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">AI Analysis Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Symptom Analysis</span>
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Document Processing</span>
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pattern Recognition</span>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Final Report</span>
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="diagnostic-card p-4">
                  <h4 className="font-medium text-foreground mb-3">Confidence Score</h4>
                  <div className="relative">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          currentCase?.confidence >= 80 ? 'bg-success' :
                          currentCase?.confidence >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${currentCase?.confidence}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={`font-semibold ${getConfidenceColor(currentCase?.confidence)}`}>
                        {currentCase?.confidence}%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseContextSidebar;