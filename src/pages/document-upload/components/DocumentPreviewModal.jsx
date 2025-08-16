import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentPreviewModal = ({ file, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  if (!isOpen || !file) return null;

  const isImage = file?.type?.startsWith('image/') || 
    ['jpg', 'jpeg', 'png', 'gif', 'bmp']?.includes(file?.name?.split('.')?.pop()?.toLowerCase());
  
  const isPDF = file?.type === 'application/pdf'|| file?.name?.toLowerCase()?.endsWith('.pdf');

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = file?.url || URL.createObjectURL(file);
    link.download = file?.name;
    link?.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 z-50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-4 bg-card border border-border rounded-lg shadow-medical-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={isImage ? 'Image' : isPDF ? 'FileText' : 'File'} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">{file?.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{(file?.size / 1024 / 1024)?.toFixed(2)} MB</span>
                {file?.category && (
                  <>
                    <span>•</span>
                    <span className="text-primary">{file?.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                disabled={zoom <= 50}
                className="w-8 h-8 p-0"
              >
                <Icon name="ZoomOut" size={14} />
              </Button>
              <span className="text-xs font-medium px-2 min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                disabled={zoom >= 200}
                className="w-8 h-8 p-0"
              >
                <Icon name="ZoomIn" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetZoom}
                className="w-8 h-8 p-0"
              >
                <Icon name="RotateCcw" size={14} />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              iconName="Printer"
              iconPosition="left"
            >
              Print
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto p-4">
            <div className="flex justify-center">
              {isImage ? (
                <img
                  src={file?.url || URL.createObjectURL(file)}
                  alt={file?.name}
                  className="max-w-full h-auto rounded-lg shadow-medical"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              ) : isPDF ? (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-medical p-8">
                  <div className="text-center space-y-4">
                    <Icon name="FileText" size={64} className="text-muted-foreground mx-auto" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">PDF Document</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        PDF preview is not available in this demo. In a production environment, 
                        this would show the actual PDF content.
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>File:</strong> {file?.name}</p>
                        <p><strong>Size:</strong> {(file?.size / 1024 / 1024)?.toFixed(2)} MB</p>
                        {file?.extractedInfo && (
                          <>
                            {file?.extractedInfo?.patientId && (
                              <p><strong>Patient ID:</strong> {file?.extractedInfo?.patientId}</p>
                            )}
                            {file?.extractedInfo?.date && (
                              <p><strong>Document Date:</strong> {file?.extractedInfo?.date}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl bg-muted rounded-lg p-8 text-center">
                  <Icon name="File" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">Preview Not Available</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This file type cannot be previewed directly. Please download to view the content.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with extracted information */}
        {file?.extractedInfo && (
          <div className="border-t border-border p-4 bg-muted/50">
            <h4 className="text-sm font-medium text-foreground mb-2">Extracted Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {file?.extractedInfo?.patientId && (
                <div>
                  <span className="text-muted-foreground">Patient ID:</span>
                  <span className="clinical-data ml-2">{file?.extractedInfo?.patientId}</span>
                </div>
              )}
              {file?.extractedInfo?.date && (
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="clinical-data ml-2">{file?.extractedInfo?.date}</span>
                </div>
              )}
              {file?.extractedInfo?.type && (
                <div>
                  <span className="text-muted-foreground">Document Type:</span>
                  <span className="ml-2 text-primary">{file?.extractedInfo?.type}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentPreviewModal;