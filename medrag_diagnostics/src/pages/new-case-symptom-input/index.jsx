import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import CaseContextSidebar from '../../components/ui/CaseContextSidebar';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import page-specific components
import SymptomAutocomplete from './components/SymptomAutocomplete';
import SymptomCard from './components/SymptomCard';
import PatientDemographics from './components/PatientDemographics';

import ProgressIndicator from './components/ProgressIndicator';
import QuickSymptomButtons from './components/QuickSymptomButtons';

const NewCaseSymptomInput = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [searchValue, setSearchValue] = useState('');
  
  // Form state
  const [symptoms, setSymptoms] = useState([]);
  const [demographics, setDemographics] = useState({
    patientId: `P-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 1000))?.padStart(3, '0')}`,
    fullName: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    bloodType: '',
    medicalHistory: [],
    medications: '',
    allergies: '',
    notes: ''
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      if (symptoms?.length > 0 || demographics?.fullName) {
        setSaveStatus('saving');
        setTimeout(() => {
          setSaveStatus('saved');
          localStorage.setItem('currentCase', JSON.stringify({
            symptoms,
            demographics,
            timestamp: new Date()?.toISOString()
          }));
        }, 1000);
      }
    };

    const timer = setTimeout(autoSave, 2000);
    return () => clearTimeout(timer);
  }, [symptoms, demographics]);

  // Load saved data on mount
  useEffect(() => {
    const savedCase = localStorage.getItem('currentCase');
    if (savedCase) {
      try {
        const parsed = JSON.parse(savedCase);
        setSymptoms(parsed?.symptoms || []);
        setDemographics(parsed?.demographics || demographics);
      } catch (error) {
        console.error('Error loading saved case:', error);
      }
    }
  }, []);

  const handleSymptomSelect = (symptom) => {
    const newSymptom = {
      id: `${symptom?.code}-${Date.now()}`,
      name: symptom?.name,
      code: symptom?.code,
      category: symptom?.category,
      severity: 1,
      durationValue: 1,
      durationUnit: 'days',
      notes: ''
    };
    
    setSymptoms(prev => [...prev, newSymptom]);
    setSearchValue('');
  };

  const handleSymptomAdd = (symptomData) => {
    // Check if symptom already exists
    const exists = symptoms?.some(s => s?.code === symptomData?.code);
    if (!exists) {
      setSymptoms(prev => [...prev, symptomData]);
    }
  };

  const handleSymptomRemove = (symptomId) => {
    setSymptoms(prev => prev?.filter(s => s?.id !== symptomId));
  };

  const handleSymptomUpdate = (symptomId, field, value) => {
    setSymptoms(prev => prev?.map(symptom => 
      symptom?.id === symptomId 
        ? { ...symptom, [field]: value }
        : symptom
    ));
  };

  const handleSymptomSeverityUpdate = (symptomId, severity) => {
    handleSymptomUpdate(symptomId, 'severity', severity);
  };

  const handleSymptomDurationUpdate = (symptomId, field, value) => {
    if (field === 'value') {
      handleSymptomUpdate(symptomId, 'durationValue', value);
    } else if (field === 'unit') {
      handleSymptomUpdate(symptomId, 'durationUnit', value);
    } else if (field === 'notes') {
      handleSymptomUpdate(symptomId, 'notes', value);
    }
  };

  const handleDemographicsUpdate = (updatedDemographics) => {
    setDemographics(updatedDemographics);
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      localStorage.setItem('currentCase', JSON.stringify({
        symptoms,
        demographics,
        timestamp: new Date()?.toISOString()
      }));
    }, 1000);
  };

  const handleAddNote = (note) => {
    console.log('Adding note:', note);
    // Handle note addition logic
  };

  const handleContinue = () => {
    if (symptoms?.length === 0) {
      alert('Please add at least one symptom before continuing.');
      return;
    }
    
    if (!demographics?.fullName || !demographics?.age) {
      alert('Please fill in required patient information before continuing.');
      return;
    }

    // Save current state
    localStorage.setItem('currentCase', JSON.stringify({
      symptoms,
      demographics,
      timestamp: new Date()?.toISOString()
    }));

    navigate('/document-upload');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setSymptoms([]);
      setDemographics({
        patientId: `P-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 1000))?.padStart(3, '0')}`,
        fullName: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        bloodType: '',
        medicalHistory: [],
        medications: '',
        allergies: '',
        notes: ''
      });
      localStorage.removeItem('currentCase');
    }
  };

  const caseData = {
    patientId: demographics?.patientId,
    patientName: demographics?.fullName || 'New Patient',
    age: demographics?.age || 'Unknown',
    gender: demographics?.gender || 'Unknown',
    symptoms: symptoms?.map(s => s?.name),
    documents: [],
    confidence: symptoms?.length > 0 ? Math.min(85, 40 + (symptoms?.length * 10)) : 0,
    status: 'In Progress',
    createdAt: new Date()?.toLocaleString()
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="p-6 pt-20">
            <Breadcrumbs />
            
            <QuickActionToolbar
              currentStep="symptom-input"
              onSave={handleSave}
              onAddNote={handleAddNote}
              saveStatus={saveStatus}
            />

            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">New Case - Symptom Input</h1>
                  <p className="text-muted-foreground">
                    Collect and structure patient symptom data for AI-powered diagnostic analysis
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Clear All
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleContinue}
                    disabled={symptoms?.length === 0 || !demographics?.fullName}
                  >
                    Continue to Upload
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Progress & Quick Actions */}
              <div className="space-y-6">
                <ProgressIndicator currentStep={1} />
                <QuickSymptomButtons onSymptomAdd={handleSymptomAdd} />
              </div>

              {/* Middle Column - Main Form */}
              <div className="xl:col-span-2 space-y-6">
                {/* Symptom Input Section */}
                <div className="diagnostic-card p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Icon name="Stethoscope" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Symptom Collection</h2>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Search and Add Symptoms
                    </label>
                    <SymptomAutocomplete
                      value={searchValue}
                      onChange={setSearchValue}
                      onSymptomSelect={handleSymptomSelect}
                      placeholder="Type to search medical symptoms (e.g., chest pain, headache)..."
                    />
                  </div>

                  {/* Current Symptoms */}
                  {symptoms?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-4">
                        Current Symptoms ({symptoms?.length})
                      </h3>
                      <div className="space-y-4">
                        {symptoms?.map((symptom) => (
                          <SymptomCard
                            key={symptom?.id}
                            symptom={symptom}
                            onRemove={handleSymptomRemove}
                            onUpdateSeverity={handleSymptomSeverityUpdate}
                            onUpdateDuration={handleSymptomDurationUpdate}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {symptoms?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                      <Icon name="Plus" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Symptoms Added</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by searching for symptoms above or use the quick-add buttons on the left.
                      </p>
                    </div>
                  )}
                </div>

                {/* Patient Demographics */}
                <PatientDemographics
                  demographics={demographics}
                  onUpdate={handleDemographicsUpdate}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Dashboard
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleSave}
                      disabled={saveStatus === 'saving'}
                    >
                      {saveStatus === 'saving' ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Icon name="Save" size={16} className="mr-2" />
                      )}
                      Save Draft
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={handleContinue}
                      disabled={symptoms?.length === 0 || !demographics?.fullName}
                    >
                      Continue to Upload
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <CaseContextSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          caseData={caseData}
        />
      </div>
      {/* Floating Diagnostic Suggestions for Mobile */}
      <div className="xl:hidden fixed bottom-4 right-4 z-30">
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-full shadow-medical-lg"
        >
          <Icon name="Brain" size={20} className="mr-2" />
          AI Suggestions
          {symptoms?.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-primary-foreground text-primary rounded-full text-xs font-semibold">
              {symptoms?.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewCaseSymptomInput;