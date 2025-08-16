import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreviewCard = ({ 
  file, 
  category, 
  uploadProgress, 
  processingStatus, 
  onRemove, 
  onAnnotate,
  onPreview 
}) => {
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotation, setAnnotation] = useState(file?.annotation || '');

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'dcm': 'Scan',
      'xlsx': 'FileSpreadsheet',
      'xls': 'FileSpreadsheet'
    };
    return iconMap?.[extension] || 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Clock';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  const handleSaveAnnotation = () => {
    onAnnotate(file?.id, annotation);
    setShowAnnotation(false);
  };

  return (
    <div className="diagnostic-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={getFileIcon(file?.name)} size={20} className="text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate">{file?.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{formatFileSize(file?.size)}</span>
              {category && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-primary font-medium">{category}</span>
                </>
              )}
            </div>
            
            {file?.extractedInfo && (
              <div className="mt-2 space-y-1">
                {file?.extractedInfo?.patientId && (
                  <div className="text-xs text-muted-foreground">
                    Patient ID: <span className="clinical-data">{file?.extractedInfo?.patientId}</span>
                  </div>
                )}
                {file?.extractedInfo?.date && (
                  <div className="text-xs text-muted-foreground">
                    Date: <span className="clinical-data">{file?.extractedInfo?.date}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPreview(file)}
            className="w-8 h-8 p-0"
          >
            <Icon name="Eye" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnnotation(!showAnnotation)}
            className="w-8 h-8 p-0"
          >
            <Icon name="MessageSquare" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(file?.id)}
            className="w-8 h-8 p-0 text-error hover:text-error"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
      {/* Upload Progress */}
      {uploadProgress !== undefined && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Uploading...</span>
            <span className="text-muted-foreground">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      {/* Processing Status */}
      {processingStatus && (
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(processingStatus)} 
            size={14} 
            className={getStatusColor(processingStatus)} 
          />
          <span className={`text-xs font-medium ${getStatusColor(processingStatus)}`}>
            {processingStatus === 'processing' && 'Analyzing document...'}
            {processingStatus === 'completed' && 'Analysis complete'}
            {processingStatus === 'error' && 'Analysis failed'}
          </span>
        </div>
      )}
      {/* Annotation Section */}
      {showAnnotation && (
        <div className="space-y-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={14} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Clinical Notes</span>
          </div>
          <textarea
            value={annotation}
            onChange={(e) => setAnnotation(e?.target?.value)}
            placeholder="Add clinical notes or observations about this document..."
            className="w-full h-20 p-2 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAnnotation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveAnnotation}
            >
              Save Note
            </Button>
          </div>
        </div>
      )}
      {/* Existing Annotation Display */}
      {file?.annotation && !showAnnotation && (
        <div className="pt-3 border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="MessageSquare" size={14} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground mb-1">Clinical Notes:</p>
              <p className="text-xs text-muted-foreground">{file?.annotation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreviewCard;