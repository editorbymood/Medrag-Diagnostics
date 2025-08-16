import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTiles = () => {
  const quickActions = [
    {
      id: 'new-case',
      title: 'New Case',
      description: 'Start diagnostic workflow',
      icon: 'Plus',
      color: 'primary',
      path: '/new-case-symptom-input',
      featured: true
    },
    {
      id: 'upload-docs',
      title: 'Upload Documents',
      description: 'Add medical records',
      icon: 'Upload',
      color: 'accent',
      path: '/document-upload'
    },
    {
      id: 'view-results',
      title: 'AI Results',
      description: 'Review diagnoses',
      icon: 'Brain',
      color: 'success',
      path: '/ai-diagnosis-results'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Export case summary',
      icon: 'FileText',
      color: 'secondary',
      action: 'generate-report'
    },
    {
      id: 'search-cases',
      title: 'Search Cases',
      description: 'Find patient records',
      icon: 'Search',
      color: 'muted',
      action: 'search'
    },
    {
      id: 'medical-guidelines',
      title: 'Guidelines',
      description: 'Access medical references',
      icon: 'BookOpen',
      color: 'warning',
      action: 'guidelines'
    }
  ];

  const getColorClasses = (color, featured = false) => {
    const baseClasses = featured 
      ? 'diagnostic-card hover:shadow-medical-lg transform hover:scale-105 transition-all duration-200 border-2'
      : 'diagnostic-card hover:shadow-medical transform hover:scale-102 transition-all duration-200';

    switch (color) {
      case 'primary':
        return `${baseClasses} ${featured ? 'border-primary bg-primary/5' : 'hover:border-primary/20'}`;
      case 'accent':
        return `${baseClasses} ${featured ? 'border-accent bg-accent/5' : 'hover:border-accent/20'}`;
      case 'success':
        return `${baseClasses} ${featured ? 'border-success bg-success/5' : 'hover:border-success/20'}`;
      case 'warning':
        return `${baseClasses} ${featured ? 'border-warning bg-warning/5' : 'hover:border-warning/20'}`;
      case 'secondary':
        return `${baseClasses} ${featured ? 'border-secondary bg-secondary/5' : 'hover:border-secondary/20'}`;
      default:
        return `${baseClasses} hover:border-border`;
    }
  };

  const getIconColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'accent':
        return 'text-accent bg-accent/10';
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'secondary':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case 'generate-report': console.log('Generate report clicked');
        break;
      case 'search': console.log('Search cases clicked');
        break;
      case 'guidelines': console.log('Medical guidelines clicked');
        break;
      default:
        break;
    }
  };

  const renderTile = (action) => {
    const content = (
      <div className={`p-6 cursor-pointer ${getColorClasses(action?.color, action?.featured)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColorClasses(action?.color)}`}>
            <Icon name={action?.icon} size={20} />
          </div>
          {action?.featured && (
            <div className="flex items-center space-x-1 text-xs font-medium text-primary">
              <Icon name="Star" size={12} />
              <span>Featured</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${action?.featured ? 'text-primary' : 'text-foreground'}`}>
            {action?.title}
          </h3>
          <p className="text-sm text-muted-foreground">{action?.description}</p>
        </div>

        {action?.featured && (
          <div className="mt-4 flex items-center text-primary text-sm font-medium">
            <span>Get Started</span>
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </div>
        )}
      </div>
    );

    if (action?.path) {
      return (
        <Link key={action?.id} to={action?.path}>
          {content}
        </Link>
      );
    }

    return (
      <div key={action?.id} onClick={() => handleAction(action?.action)}>
        {content}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map(renderTile)}
      </div>
      <div className="diagnostic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Case C-2024-001 completed</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Documents uploaded for P-2024-002</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="AlertCircle" size={16} className="text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Review required for Case C-2024-003</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessTiles;