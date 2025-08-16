import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import CaseContextSidebar from '../../components/ui/CaseContextSidebar';
import FileUploadZone from './components/FileUploadZone';
import DocumentCategorySelector from './components/DocumentCategorySelector';
import UploadedDocumentsList from './components/UploadedDocumentsList';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import ProcessingStatusPanel from './components/ProcessingStatusPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [overallStatus, setOverallStatus] = useState('idle');
  const [saveStatus, setSaveStatus] = useState('saved');

  const acceptedTypes = [
    '.pdf',
    '.doc',
    '.docx',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.dcm',
    '.xlsx',
    '.xls'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  // Mock case data for context sidebar
  const caseData = {
    patientId: 'P-2024-001',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    symptoms: [
      'Chest pain',
      'Shortness of breath',
      'Fatigue'
    ],
    documents: files?.map(file => ({
      name: file?.name,
      type: file?.category || 'Unknown',
      uploadedAt: new Date(file.uploadTime)?.toLocaleString()
    })),
    confidence: 75,
    status: 'In Progress',
    createdAt: '2024-08-16 07:20'
  };

  useEffect(() => {
    // Simulate processing status updates
    if (files?.length > 0) {
      const interval = setInterval(() => {
        setFiles(prevFiles => 
          prevFiles?.map(file => {
            if (file?.processingStatus === 'processing') {
              // Randomly complete some files
              if (Math.random() > 0.7) {
                return {
                  ...file,
                  processingStatus: 'completed',
                  extractedInfo: {
                    patientId: 'P-2024-001',
                    date: '2024-08-15',
                    type: file?.category || 'Medical Document'
                  }
                };
              }
            }
            return file;
          })
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [files]);

  useEffect(() => {
    // Update overall status based on file processing
    const completedFiles = files?.filter(f => f?.processingStatus === 'completed')?.length;
    const processingFiles = files?.filter(f => f?.processingStatus === 'processing')?.length;
    
    if (files?.length > 0) {
      if (completedFiles === files?.length) {
        setOverallStatus('completed');
      } else if (processingFiles > 0 || completedFiles > 0) {
        setOverallStatus('processing');
      } else {
        setOverallStatus('pending');
      }
    } else {
      setOverallStatus('idle');
    }
  }, [files]);

  const handleFilesSelected = async (selectedFiles) => {
    if (!selectedCategory) {
      setCategoryError('Please select a document category before uploading files');
      return;
    }

    setCategoryError('');
    setIsUploading(true);

    const newFiles = selectedFiles?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      category: selectedCategory,
      uploadTime: new Date()?.toISOString(),
      uploadProgress: 0,
      processingStatus: 'pending',
      file: file
    }));

    // Simulate upload progress
    for (const newFile of newFiles) {
      setFiles(prev => [...prev, newFile]);
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => 
          prev?.map(f => 
            f?.id === newFile?.id 
              ? { ...f, uploadProgress: progress }
              : f
          )
        );
      }

      // Start processing after upload
      setFiles(prev => 
        prev?.map(f => 
          f?.id === newFile?.id 
            ? { ...f, processingStatus: 'processing' }
            : f
        )
      );
    }

    setIsUploading(false);
    setSaveStatus('saving');
    
    // Simulate save
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const handleAnnotateFile = (fileId, annotation) => {
    setFiles(prev => 
      prev?.map(f => 
        f?.id === fileId 
          ? { ...f, annotation }
          : f
      )
    );
  };

  const handlePreviewFile = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleRetryFailed = () => {
    setFiles(prev => 
      prev?.map(f => 
        f?.processingStatus === 'error' 
          ? { ...f, processingStatus: 'processing' }
          : f
      )
    );
  };

  const handleContinueToResults = () => {
    navigate('/ai-diagnosis-results');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting document data...');
  };

  const handleAddNote = (note) => {
    console.log('Adding case note:', note);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="p-6 pt-20">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs />
              
              <QuickActionToolbar
                currentStep="document-upload"
                onSave={handleSave}
                onExport={handleExport}
                onAddNote={handleAddNote}
                saveStatus={saveStatus}
              />

              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Upload" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Document Upload</h1>
                    <p className="text-muted-foreground">
                      Upload medical documents to enhance diagnostic accuracy
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                    <span className="text-sm text-success font-medium">Symptoms</span>
                  </div>
                  <div className="w-8 h-0.5 bg-primary" />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Upload" size={16} color="white" />
                    </div>
                    <span className="text-sm text-primary font-medium">Documents</span>
                  </div>
                  <div className="w-8 h-0.5 bg-muted" />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="Brain" size={16} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">AI Analysis</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Category Selection */}
                  <div className="diagnostic-card p-6">
                    <DocumentCategorySelector
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      error={categoryError}
                    />
                  </div>

                  {/* File Upload Zone */}
                  <div className="diagnostic-card p-6">
                    <FileUploadZone
                      onFilesSelected={handleFilesSelected}
                      acceptedTypes={acceptedTypes}
                      maxFileSize={maxFileSize}
                      isUploading={isUploading}
                    />
                  </div>

                  {/* Uploaded Documents */}
                  {files?.length > 0 && (
                    <UploadedDocumentsList
                      files={files}
                      onRemoveFile={handleRemoveFile}
                      onAnnotateFile={handleAnnotateFile}
                      onPreviewFile={handlePreviewFile}
                      onReorderFiles={(reorderedFiles) => setFiles(reorderedFiles)}
                    />
                  )}
                </div>

                {/* Processing Status Panel */}
                <div className="space-y-6">
                  <ProcessingStatusPanel
                    files={files}
                    overallStatus={overallStatus}
                    onRetryFailed={handleRetryFailed}
                    onContinueToResults={handleContinueToResults}
                  />

                  {/* Quick Tips */}
                  <div className="diagnostic-card p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-warning" />
                      <span>Upload Tips</span>
                    </h4>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-start space-x-2">
                        <Icon name="Check" size={12} className="text-success mt-0.5" />
                        <span>Higher quality scans improve text extraction</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="Check" size={12} className="text-success mt-0.5" />
                        <span>Include patient ID and dates when possible</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="Check" size={12} className="text-success mt-0.5" />
                        <span>Categorize documents for better analysis</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="Check" size={12} className="text-success mt-0.5" />
                        <span>Recent documents provide more context</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => navigate('/new-case-symptom-input')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Symptoms
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Skip document upload
                      navigate('/ai-diagnosis-results');
                    }}
                  >
                    Skip Documents
                  </Button>
                  
                  <Button
                    variant="default"
                    onClick={handleContinueToResults}
                    disabled={overallStatus !== 'completed' && files?.length > 0}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {files?.length === 0 ? 'Continue' : 'Analyze Documents'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Case Context Sidebar */}
        <CaseContextSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          caseData={caseData}
        />
      </div>
      {/* Document Preview Modal */}
      <DocumentPreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewFile(null);
        }}
      />
    </div>
  );
};

export default DocumentUpload;