import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatusPanel = ({ 
  files, 
  overallStatus, 
  onRetryFailed, 
  onContinueToResults 
}) => {
  const getProcessingStats = () => {
    const completed = files?.filter(f => f?.processingStatus === 'completed')?.length;
    const processing = files?.filter(f => f?.processingStatus === 'processing')?.length;
    const errors = files?.filter(f => f?.processingStatus === 'error')?.length;
    const pending = files?.filter(f => !f?.processingStatus || f?.processingStatus === 'pending')?.length;
    
    return { completed, processing, errors, pending, total: files?.length };
  };

  const stats = getProcessingStats();
  const completionPercentage = files?.length > 0 ? Math.round((stats?.completed / files?.length) * 100) : 0;

  const processingSteps = [
    {
      id: 'upload',
      label: 'File Upload',
      description: 'Secure upload and encryption',
      status: files?.length > 0 ? 'completed' : 'pending',
      icon: 'Upload'
    },
    {
      id: 'ocr',
      label: 'Text Extraction',
      description: 'OCR and content analysis',
      status: stats?.processing > 0 || stats?.completed > 0 ? 'processing' : 'pending',
      icon: 'Scan'
    },
    {
      id: 'analysis',
      label: 'Medical Analysis',
      description: 'AI-powered content understanding',
      status: stats?.completed === files?.length && files?.length > 0 ? 'completed' : 
              stats?.processing > 0 || stats?.completed > 0 ? 'processing' : 'pending',
      icon: 'Brain'
    },
    {
      id: 'integration',
      label: 'Data Integration',
      description: 'Combining with symptom data',
      status: overallStatus === 'completed' ? 'completed' : 
              overallStatus === 'processing' ? 'processing' : 'pending',
      icon: 'Database'
    }
  ];

  const getStepStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-warning border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <Icon name="AlertCircle" size={20} className="text-error" />;
      default:
        return <Icon name="Clock" size={20} className="text-muted-foreground" />;
    }
  };

  const getStepStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/5';
      case 'processing':
        return 'border-warning bg-warning/5';
      case 'error':
        return 'border-error bg-error/5';
      default:
        return 'border-border bg-muted/30';
    }
  };

  if (files?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="diagnostic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Processing Status</h3>
          <div className="text-sm text-muted-foreground">
            {stats?.completed} of {files?.length} files processed
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span className="font-medium text-primary">{completionPercentage}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{stats?.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{stats?.processing}</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">{stats?.errors}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">{stats?.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
      {/* Processing Steps */}
      <div className="diagnostic-card p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Processing Pipeline</h4>
        <div className="space-y-4">
          {processingSteps?.map((step, index) => (
            <div key={step?.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${getStepStatusColor(step?.status)}`}>
              <div className="flex-shrink-0">
                {getStepStatusIcon(step?.status)}
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground">{step?.label}</h5>
                <p className="text-xs text-muted-foreground">{step?.description}</p>
              </div>
              {index < processingSteps?.length - 1 && (
                <div className="flex-shrink-0">
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Error Handling */}
      {stats?.errors > 0 && (
        <div className="diagnostic-card p-6 border-error/20 bg-error/5">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-error mb-2">Processing Errors Detected</h4>
              <p className="text-xs text-error/80 mb-3">
                {stats?.errors} file{stats?.errors > 1 ? 's' : ''} failed to process. 
                This may affect diagnostic accuracy.
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetryFailed}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Retry Failed
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Show detailed error information
                    console.log('Show error details');
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Completion Actions */}
      {overallStatus === 'completed' && (
        <div className="diagnostic-card p-6 border-success/20 bg-success/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={24} className="text-success" />
              <div>
                <h4 className="text-sm font-medium text-success">Processing Complete</h4>
                <p className="text-xs text-success/80">
                  All documents have been analyzed and integrated with symptom data.
                </p>
              </div>
            </div>
            <Button
              variant="default"
              onClick={onContinueToResults}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View AI Results
            </Button>
          </div>
        </div>
      )}
      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} className="text-success" />
        <span>All document processing is HIPAA compliant and encrypted</span>
      </div>
    </div>
  );
};

export default ProcessingStatusPanel;