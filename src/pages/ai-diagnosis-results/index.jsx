import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import CaseContextSidebar from '../../components/ui/CaseContextSidebar';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import DiagnosisCard from './components/DiagnosisCard';
import ConfidenceVisualization from './components/ConfidenceVisualization';
import FollowUpQuestions from './components/FollowUpQuestions';
import ComparisonView from './components/ComparisonView';
import ExportReportModal from './components/ExportReportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIDiagnosisResults = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedDiagnosis, setExpandedDiagnosis] = useState(null);
  const [chartViewType, setChartViewType] = useState('bar');
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnoses');
  const [saveStatus, setSaveStatus] = useState('saved');

  // Mock diagnosis data
  const diagnosisResults = [
    {
      id: 'dx-001',
      condition: 'Acute Myocardial Infarction',
      confidence: 87,
      description: 'Heart attack caused by blocked blood flow to the heart muscle',
      matchingSymptoms: ['Chest pain', 'Shortness of breath', 'Fatigue', 'Nausea', 'Sweating'],
      clinicalAnalysis: `Based on the patient's presentation of severe chest pain, shortness of breath, and associated symptoms, combined with the uploaded ECG showing ST-elevation patterns, there is strong evidence supporting acute myocardial infarction. The symptom constellation and timing are highly consistent with this diagnosis.`,
      references: [
        {
          title: 'Acute ST-Elevation Myocardial Infarction: Current Guidelines and Management',journal: 'Journal of the American College of Cardiology',
          year: 2023,
          relevance: 94
        },
        {
          title: 'Early Recognition and Treatment of STEMI in Emergency Settings',journal: 'Emergency Medicine Reviews',
          year: 2023,
          relevance: 89
        }
      ],
      recommendedTests: ['Troponin levels', 'Complete ECG series', 'Echocardiogram', 'Chest X-ray'],
      keyDifferentiators: ['ST-elevation on ECG', 'Elevated cardiac enzymes', 'Typical chest pain pattern'],
      urgency: 'high'
    },
    {
      id: 'dx-002',condition: 'Unstable Angina',confidence: 72,description: 'Chest pain due to reduced blood flow to the heart without permanent damage',
      matchingSymptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
      clinicalAnalysis: `The patient's symptoms are consistent with unstable angina, particularly the chest pain pattern and associated shortness of breath. However, the severity and presentation lean more toward acute coronary syndrome. Further cardiac workup is essential to differentiate from myocardial infarction.`,
      references: [
        {
          title: 'Unstable Angina: Diagnosis and Management in Primary Care',
          journal: 'American Family Physician',
          year: 2023,
          relevance: 85
        }
      ],
      recommendedTests: ['Stress test', 'Cardiac catheterization', 'Troponin levels', 'ECG monitoring'],
      keyDifferentiators: ['No ST-elevation', 'Normal or minimally elevated troponin', 'Reversible ischemia'],
      urgency: 'medium'
    },
    {
      id: 'dx-003',
      condition: 'Pulmonary Embolism',
      confidence: 64,
      description: 'Blood clot in the lungs causing breathing difficulties and chest pain',
      matchingSymptoms: ['Shortness of breath', 'Chest pain', 'Fatigue'],
      clinicalAnalysis: `While the patient presents with chest pain and shortness of breath, the pattern and associated symptoms are less typical for pulmonary embolism. However, given the potential severity, this diagnosis should be considered in the differential, especially if there are risk factors present.`,
      references: [
        {
          title: 'Pulmonary Embolism: Clinical Presentation and Diagnostic Approaches',
          journal: 'Chest Medicine',
          year: 2023,
          relevance: 78
        }
      ],
      recommendedTests: ['CT pulmonary angiogram', 'D-dimer', 'Arterial blood gas', 'Chest CT'],
      keyDifferentiators: ['Pleuritic chest pain', 'Risk factors for thrombosis', 'Elevated D-dimer'],
      urgency: 'high'
    },
    {
      id: 'dx-004',
      condition: 'Gastroesophageal Reflux Disease',
      confidence: 45,
      description: 'Stomach acid backing up into the esophagus causing chest discomfort',
      matchingSymptoms: ['Chest pain'],
      clinicalAnalysis: `GERD can present with chest pain that mimics cardiac conditions. However, the patient's symptom pattern and severity make this a less likely primary diagnosis. It should be considered as a contributing factor or alternative explanation for some symptoms.`,
      references: [
        {
          title: 'GERD-Related Chest Pain: Differential Diagnosis Considerations',journal: 'Gastroenterology Today',
          year: 2023,
          relevance: 65
        }
      ],
      recommendedTests: ['Upper endoscopy', 'pH monitoring', 'Barium swallow'],
      keyDifferentiators: ['Burning sensation', 'Relation to meals', 'Response to antacids'],
      urgency: 'low'
    },
    {
      id: 'dx-005',condition: 'Anxiety Disorder',confidence: 38,description: 'Psychological condition that can manifest with physical symptoms including chest pain',
      matchingSymptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
      clinicalAnalysis: `While anxiety can present with chest pain, shortness of breath, and fatigue, the severity and pattern of the patient's symptoms suggest a more serious underlying condition. Anxiety should be considered as a secondary diagnosis or contributing factor.`,
      references: [
        {
          title: 'Anxiety-Related Chest Pain: Recognition and Management',
          journal: 'Primary Care Psychology',
          year: 2023,
          relevance: 58
        }
      ],
      recommendedTests: ['Psychological assessment', 'Anxiety screening tools'],
      keyDifferentiators: ['Panic attacks', 'Psychological triggers', 'Normal cardiac workup'],
      urgency: 'low'
    }
  ];

  // Mock follow-up questions
  const followUpQuestions = [
    {
      id: 'q-001',
      category: 'symptom',
      priority: 'high',
      question: 'How would you describe the chest pain quality?',
      context: 'Understanding pain characteristics helps differentiate cardiac vs non-cardiac causes',
      options: ['Crushing/squeezing', 'Sharp/stabbing', 'Burning', 'Pressure-like', 'Tearing'],
      explanation: 'Crushing or pressure-like pain is more suggestive of cardiac origin, while sharp pain may indicate other causes.'
    },
    {
      id: 'q-002',
      category: 'history',
      priority: 'high',
      question: 'Does the patient have any known cardiovascular risk factors?',
      context: 'Risk factors significantly influence the likelihood of cardiac conditions',
      options: ['Diabetes', 'Hypertension', 'High cholesterol', 'Smoking history', 'Family history', 'None known'],
      explanation: 'Multiple risk factors increase the probability of acute coronary syndrome.'
    },
    {
      id: 'q-003',
      category: 'examination',
      priority: 'medium',
      question: 'What are the current vital signs?',
      context: 'Vital signs provide important clues about hemodynamic stability',
      options: ['Normal and stable', 'Elevated blood pressure', 'Tachycardia present', 'Hypotensive', 'Irregular pulse'],
      explanation: 'Abnormal vital signs may indicate hemodynamic compromise requiring immediate intervention.'
    },
    {
      id: 'q-004',
      category: 'symptom',
      priority: 'medium',
      question: 'Are symptoms related to physical activity?',
      context: 'Exercise relationship helps distinguish stable vs unstable coronary syndromes',
      options: ['Occurs with minimal exertion', 'Only with significant activity', 'At rest', 'No clear pattern'],
      explanation: 'Rest pain or pain with minimal exertion suggests unstable coronary syndrome.'
    }
  ];

  // Mock patient data for context
  const patientData = {
    patientId: 'P-2024-001',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    documents: [
      { name: 'ECG_Report.pdf', type: 'ECG', uploadedAt: '2024-08-16 07:30' },
      { name: 'Blood_Test.pdf', type: 'Lab', uploadedAt: '2024-08-16 07:25' }
    ],
    confidence: 87,
    status: 'Analysis Complete',
    createdAt: '2024-08-16 07:20'
  };

  const handleExpandDiagnosis = (diagnosisId) => {
    setExpandedDiagnosis(expandedDiagnosis === diagnosisId ? null : diagnosisId);
  };

  const handleToggleComparison = (diagnosisId) => {
    setSelectedForComparison(prev => 
      prev?.includes(diagnosisId) 
        ? prev?.filter(id => id !== diagnosisId)
        : [...prev, diagnosisId]?.slice(0, 3) // Limit to 3 selections
    );
  };

  const handleCompare = (selectedIds) => {
    console.log('Comparing diagnoses:', selectedIds);
  };

  const handleAnswerQuestion = (questionId, answer) => {
    console.log('Question answered:', questionId, answer);
  };

  const handleRefineAnalysis = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      console.log('Analysis refined based on follow-up answers');
    }, 2000);
  };

  const handleExport = async (exportConfig) => {
    console.log('Exporting report with config:', exportConfig);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1500);
  };

  const tabs = [
    { id: 'diagnoses', label: 'Diagnoses', icon: 'Stethoscope', count: diagnosisResults?.length },
    { id: 'visualization', label: 'Analysis', icon: 'BarChart3' },
    { id: 'questions', label: 'Follow-up', icon: 'MessageSquare', count: followUpQuestions?.length },
    { id: 'comparison', label: 'Compare', icon: 'GitCompare', count: selectedForComparison?.length }
  ];

  useEffect(() => {
    // Auto-expand highest confidence diagnosis
    if (diagnosisResults?.length > 0) {
      setExpandedDiagnosis(diagnosisResults?.[0]?.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="pt-20 px-6 pb-6">
            <Breadcrumbs />
            
            <QuickActionToolbar
              currentStep="ai-results"
              onSave={handleSave}
              onExport={() => setIsExportModalOpen(true)}
              saveStatus={saveStatus}
            />

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">AI Diagnosis Results</h1>
                <p className="text-muted-foreground">
                  Analysis complete for {patientData?.patientName} • {diagnosisResults?.length} potential diagnoses identified
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Analysis Complete</span>
                </div>
                <Button
                  variant="default"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex space-x-1 mb-6 border-b border-border">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab?.id
                      ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'diagnoses' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="diagnostic-card p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Target" size={20} className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Top Confidence</p>
                        <p className="text-lg font-semibold text-foreground">{diagnosisResults?.[0]?.confidence}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="diagnostic-card p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="List" size={20} className="text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Diagnoses</p>
                        <p className="text-lg font-semibold text-foreground">{diagnosisResults?.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="diagnostic-card p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="AlertTriangle" size={20} className="text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">High Priority</p>
                        <p className="text-lg font-semibold text-foreground">
                          {diagnosisResults?.filter(d => d?.urgency === 'high')?.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="diagnostic-card p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="BookOpen" size={20} className="text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Literature</p>
                        <p className="text-lg font-semibold text-foreground">
                          {diagnosisResults?.reduce((acc, d) => acc + d?.references?.length, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis Cards */}
                <div>
                  {diagnosisResults?.map((diagnosis, index) => (
                    <DiagnosisCard
                      key={diagnosis?.id}
                      diagnosis={diagnosis}
                      rank={index + 1}
                      onExpand={handleExpandDiagnosis}
                      isExpanded={expandedDiagnosis === diagnosis?.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'visualization' && (
              <ConfidenceVisualization
                diagnoses={diagnosisResults}
                viewType={chartViewType}
                onViewTypeChange={setChartViewType}
              />
            )}

            {activeTab === 'questions' && (
              <FollowUpQuestions
                questions={followUpQuestions}
                onAnswerQuestion={handleAnswerQuestion}
                onRefineAnalysis={handleRefineAnalysis}
              />
            )}

            {activeTab === 'comparison' && (
              <ComparisonView
                diagnoses={diagnosisResults}
                selectedDiagnoses={selectedForComparison}
                onToggleSelection={handleToggleComparison}
                onCompare={handleCompare}
              />
            )}
          </div>
        </main>

        <CaseContextSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          caseData={patientData}
        />
      </div>
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        diagnoses={diagnosisResults}
        patientData={patientData}
        onExport={handleExport}
      />
    </div>
  );
};

export default AIDiagnosisResults;