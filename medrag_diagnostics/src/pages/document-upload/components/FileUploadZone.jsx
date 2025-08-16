import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, acceptedTypes, maxFileSize, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    onFilesSelected(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    onFilesSelected(files);
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes?.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="Upload" size={32} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Drop files here' : 'Upload Medical Documents'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Drag and drop your medical files here, or click to browse. 
              Supports PDF, DOCX, images, and lab result files.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              disabled={isUploading}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>
            
            <div className="text-xs text-muted-foreground">
              Max file size: {formatFileSize(maxFileSize)}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {acceptedTypes?.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-mono"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Processing files...</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} className="text-success" />
        <span>HIPAA compliant • End-to-end encrypted • PHI protected</span>
      </div>
    </div>
  );
};

export default FileUploadZone;