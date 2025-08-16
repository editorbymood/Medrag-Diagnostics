import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FilePreviewCard from './FilePreviewCard';

const UploadedDocumentsList = ({ 
  files, 
  onRemoveFile, 
  onAnnotateFile, 
  onPreviewFile, 
  onReorderFiles 
}) => {
  const [sortBy, setSortBy] = useState('uploadTime');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortOptions = [
    { value: 'uploadTime', label: 'Upload Time' },
    { value: 'name', label: 'File Name' },
    { value: 'size', label: 'File Size' },
    { value: 'category', label: 'Category' }
  ];

  const sortedFiles = [...files]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a?.name?.toLowerCase();
        bValue = b?.name?.toLowerCase();
        break;
      case 'size':
        aValue = a?.size;
        bValue = b?.size;
        break;
      case 'category':
        aValue = a?.category || '';
        bValue = b?.category || '';
        break;
      case 'uploadTime':
      default:
        aValue = new Date(a.uploadTime);
        bValue = new Date(b.uploadTime);
        break;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getTotalSize = () => {
    const totalBytes = files?.reduce((sum, file) => sum + file?.size, 0);
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(totalBytes) / Math.log(k));
    return parseFloat((totalBytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getProcessingStats = () => {
    const completed = files?.filter(f => f?.processingStatus === 'completed')?.length;
    const processing = files?.filter(f => f?.processingStatus === 'processing')?.length;
    const errors = files?.filter(f => f?.processingStatus === 'error')?.length;
    
    return { completed, processing, errors, total: files?.length };
  };

  const stats = getProcessingStats();

  if (files?.length === 0) {
    return (
      <div className="diagnostic-card p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileX" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Documents Uploaded</h3>
        <p className="text-sm text-muted-foreground">
          Upload medical documents to enhance diagnostic accuracy
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Uploaded Documents</h3>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>{files?.length} files</span>
            <span>•</span>
            <span>{getTotalSize()}</span>
            {stats?.processing > 0 && (
              <>
                <span>•</span>
                <span className="text-warning">{stats?.processing} processing</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e?.target?.value)}
            className="text-xs bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="w-8 h-8 p-0"
          >
            <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
          </Button>
        </div>
      </div>
      {/* Processing Status Summary */}
      {(stats?.processing > 0 || stats?.errors > 0) && (
        <div className="diagnostic-card p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">{stats?.completed} Completed</span>
            </div>
            
            {stats?.processing > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-warning font-medium">{stats?.processing} Processing</span>
              </div>
            )}
            
            {stats?.errors > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm text-error font-medium">{stats?.errors} Failed</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Files List */}
      <div className="space-y-3">
        {sortedFiles?.map((file, index) => (
          <FilePreviewCard
            key={file?.id}
            file={file}
            category={file?.category}
            uploadProgress={file?.uploadProgress}
            processingStatus={file?.processingStatus}
            onRemove={onRemoveFile}
            onAnnotate={onAnnotateFile}
            onPreview={onPreviewFile}
          />
        ))}
      </div>
      {/* Bulk Actions */}
      {files?.length > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to remove all documents?')) {
                  files?.forEach(file => onRemoveFile(file?.id));
                }
              }}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            All documents are encrypted and HIPAA compliant
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedDocumentsList;