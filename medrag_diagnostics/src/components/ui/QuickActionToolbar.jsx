import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = ({ 
  currentStep = 'symptom-input',
  onSave = () => {},
  onExport = () => {},
  onAddNote = () => {},
  saveStatus = 'saved', // 'saving', 'saved', 'error'
  className = ""
}) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [note, setNote] = useState('');

  const stepConfig = {
    'symptom-input': {
      title: 'Symptom Input',
      actions: ['save', 'note', 'clear']
    },
    'document-upload': {
      title: 'Document Upload',
      actions: ['save', 'note', 'preview']
    },
    'ai-results': {
      title: 'AI Diagnosis Results',
      actions: ['save', 'export', 'note', 'share']
    }
  };

  const currentConfig = stepConfig?.[currentStep] || stepConfig?.['symptom-input'];

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'saved':
        return <Icon name="Check" size={16} className="text-success" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Save" size={16} />;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Save Error';
      default:
        return 'Save Draft';
    }
  };

  const handleSaveNote = () => {
    onAddNote(note);
    setNote('');
    setIsNoteModalOpen(false);
  };

  const renderAction = (action) => {
    switch (action) {
      case 'save':
        return (
          <Button
            key="save"
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2"
          >
            {getSaveStatusIcon()}
            <span className="hidden sm:inline">{getSaveStatusText()}</span>
          </Button>
        );

      case 'export':
        return (
          <Button
            key="export"
            variant="outline"
            size="sm"
            onClick={onExport}
            className="flex items-center space-x-2"
          >
            <Icon name="Download" size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
        );

      case 'note':
        return (
          <Button
            key="note"
            variant="outline"
            size="sm"
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="StickyNote" size={16} />
            <span className="hidden sm:inline">Add Note</span>
          </Button>
        );

      case 'clear':
        return (
          <Button
            key="clear"
            variant="outline"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all data?')) {
                // Handle clear action
                console.log('Clear data');
              }
            }}
            className="flex items-center space-x-2 text-error hover:text-error"
          >
            <Icon name="Trash2" size={16} />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        );

      case 'preview':
        return (
          <Button
            key="preview"
            variant="outline"
            size="sm"
            onClick={() => {
              // Handle preview action
              console.log('Preview documents');
            }}
            className="flex items-center space-x-2"
          >
            <Icon name="Eye" size={16} />
            <span className="hidden sm:inline">Preview</span>
          </Button>
        );

      case 'share':
        return (
          <Button
            key="share"
            variant="outline"
            size="sm"
            onClick={() => {
              // Handle share action
              console.log('Share results');
            }}
            className="flex items-center space-x-2"
          >
            <Icon name="Share2" size={16} />
            <span className="hidden sm:inline">Share</span>
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={`sticky top-20 z-30 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-medical p-3 mb-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{currentConfig?.title}</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Last saved: 2 min ago</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentConfig?.actions?.map(renderAction)}
          </div>
        </div>
      </div>
      {/* Note Modal */}
      {isNoteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsNoteModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg shadow-medical-lg z-50">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Add Case Note</h3>
            </div>
            <div className="p-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e?.target?.value)}
                placeholder="Enter your clinical note..."
                className="w-full h-32 p-3 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-end space-x-2 p-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsNoteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveNote}
                disabled={!note?.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickActionToolbar;