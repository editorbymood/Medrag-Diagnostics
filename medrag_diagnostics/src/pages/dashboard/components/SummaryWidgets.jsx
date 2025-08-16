import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryWidgets = () => {
  const widgets = [
    {
      id: 'daily-cases',
      title: 'Today\'s Cases',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: 'FileText',
      color: 'primary',
      description: 'New cases processed'
    },
    {
      id: 'avg-confidence',
      title: 'Avg. Confidence',
      value: '84%',
      change: '+2%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'success',
      description: 'Diagnostic accuracy'
    },
    {
      id: 'pending-reviews',
      title: 'Pending Reviews',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'warning',
      description: 'Awaiting review'
    },
    {
      id: 'system-alerts',
      title: 'System Alerts',
      value: '2',
      change: '0',
      changeType: 'neutral',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Require attention'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'text-primary'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          icon: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          icon: 'text-error'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          icon: 'text-muted-foreground'
        };
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase':
        return <Icon name="TrendingUp" size={12} className="text-success" />;
      case 'decrease':
        return <Icon name="TrendingDown" size={12} className="text-error" />;
      default:
        return <Icon name="Minus" size={12} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {widgets?.map((widget) => {
        const colors = getColorClasses(widget?.color);
        
        return (
          <div key={widget?.id} className="diagnostic-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${colors?.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={widget?.icon} size={20} className={colors?.icon} />
              </div>
              <div className="flex items-center space-x-1">
                {getChangeIcon(widget?.changeType)}
                <span className={`text-xs font-medium ${
                  widget?.changeType === 'increase' ? 'text-success' :
                  widget?.changeType === 'decrease' ? 'text-error' : 'text-muted-foreground'
                }`}>
                  {widget?.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">{widget?.title}</h3>
              <div className="text-2xl font-bold text-foreground">{widget?.value}</div>
              <p className="text-xs text-muted-foreground">{widget?.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryWidgets;