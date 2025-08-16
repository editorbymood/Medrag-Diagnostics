import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportReportModal = ({ isOpen, onClose, diagnoses, patientData, onExport }) => {
  const [exportOptions, setExportOptions] = useState({
    includePatientInfo: true,
    includeSymptoms: true,
    includeAllDiagnoses: true,
    includeTopDiagnosesOnly: false,
    includeLiterature: true,
    includeRecommendations: true,
    includeFollowUp: true,
    includeCharts: false
  });

  const [reportFormat, setReportFormat] = useState('pdf');
  const [reportTemplate, setReportTemplate] = useState('comprehensive');
  const [isExporting, setIsExporting] = useState(false);

  const handleOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport({
        format: reportFormat,
        template: reportTemplate,
        options: exportOptions,
        diagnoses,
        patientData
      });
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const templates = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Report',
      description: 'Detailed report with all diagnostic information, literature, and recommendations'
    },
    {
      id: 'summary',
      name: 'Executive Summary',
      description: 'Concise overview focusing on top diagnoses and key recommendations'
    },
    {
      id: 'clinical',
      name: 'Clinical Notes',
      description: 'Formatted for integration into electronic health records'
    },
    {
      id: 'patient',
      name: 'Patient-Friendly',
      description: 'Simplified language suitable for patient education and communication'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-lg shadow-medical-lg z-50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Export Diagnostic Report</h3>
              <p className="text-sm text-muted-foreground">
                Customize and export your diagnostic analysis
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Report Template */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Report Template</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates?.map(template => (
                  <div
                    key={template?.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      reportTemplate === template?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setReportTemplate(template?.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center ${
                        reportTemplate === template?.id
                          ? 'border-primary bg-primary' :'border-muted-foreground'
                      }`}>
                        {reportTemplate === template?.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{template?.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{template?.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
              <div className="flex space-x-4">
                {[
                  { id: 'pdf', name: 'PDF Document', icon: 'FileText' },
                  { id: 'docx', name: 'Word Document', icon: 'FileText' },
                  { id: 'json', name: 'JSON Data', icon: 'Code' }
                ]?.map(format => (
                  <button
                    key={format?.id}
                    onClick={() => setReportFormat(format?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-all duration-200 ${
                      reportFormat === format?.id
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={format?.icon} size={16} />
                    <span className="text-sm">{format?.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Options */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Include in Report</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Checkbox
                    label="Patient Information"
                    description="Demographics and case details"
                    checked={exportOptions?.includePatientInfo}
                    onChange={(e) => handleOptionChange('includePatientInfo', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Symptom Analysis"
                    description="Reported symptoms and analysis"
                    checked={exportOptions?.includeSymptoms}
                    onChange={(e) => handleOptionChange('includeSymptoms', e?.target?.checked)}
                  />
                  <Checkbox
                    label="All Diagnoses"
                    description="Complete ranked diagnosis list"
                    checked={exportOptions?.includeAllDiagnoses}
                    onChange={(e) => handleOptionChange('includeAllDiagnoses', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Top 3 Diagnoses Only"
                    description="Focus on highest confidence results"
                    checked={exportOptions?.includeTopDiagnosesOnly}
                    onChange={(e) => handleOptionChange('includeTopDiagnosesOnly', e?.target?.checked)}
                  />
                </div>
                <div className="space-y-3">
                  <Checkbox
                    label="Literature References"
                    description="Supporting research and citations"
                    checked={exportOptions?.includeLiterature}
                    onChange={(e) => handleOptionChange('includeLiterature', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Recommendations"
                    description="Diagnostic tests and next steps"
                    checked={exportOptions?.includeRecommendations}
                    onChange={(e) => handleOptionChange('includeRecommendations', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Follow-up Questions"
                    description="Suggested additional inquiries"
                    checked={exportOptions?.includeFollowUp}
                    onChange={(e) => handleOptionChange('includeFollowUp', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Charts & Visualizations"
                    description="Confidence charts and graphs"
                    checked={exportOptions?.includeCharts}
                    onChange={(e) => handleOptionChange('includeCharts', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Report Preview</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Template: {templates?.find(t => t?.id === reportTemplate)?.name}</p>
                    <p>• Format: {reportFormat?.toUpperCase()}</p>
                    <p>• Diagnoses: {exportOptions?.includeAllDiagnoses ? 'All' : 'Top 3'} ({diagnoses?.length} total)</p>
                    <p>• Estimated size: {reportFormat === 'pdf' ? '2-5 MB' : reportFormat === 'docx' ? '1-3 MB' : '< 1 MB'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>HIPAA compliant export</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleExport}
              disabled={isExporting}
              loading={isExporting}
            >
              <Icon name="Download" size={14} className="mr-2" />
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportReportModal;