import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ConfidenceVisualization = ({ diagnoses, viewType = 'bar', onViewTypeChange }) => {
  const chartData = diagnoses?.slice(0, 5)?.map((diagnosis, index) => ({
    name: diagnosis?.condition?.length > 15 ? diagnosis?.condition?.substring(0, 15) + '...' : diagnosis?.condition,
    fullName: diagnosis?.condition,
    confidence: diagnosis?.confidence,
    rank: index + 1
  }));

  const pieData = diagnoses?.slice(0, 4)?.map((diagnosis, index) => ({
    name: diagnosis?.condition,
    value: diagnosis?.confidence,
    color: index === 0 ? '#2563EB' : index === 1 ? '#059669' : index === 2 ? '#D97706' : '#DC2626'
  }));

  const getBarColor = (confidence) => {
    if (confidence >= 80) return '#059669';
    if (confidence >= 60) return '#D97706';
    return '#DC2626';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-medical-lg p-3">
          <p className="font-medium text-foreground">{payload?.[0]?.payload?.fullName}</p>
          <p className="text-sm text-primary">
            Confidence: {payload?.[0]?.value}%
          </p>
          <p className="text-xs text-muted-foreground">
            Rank: #{payload?.[0]?.payload?.rank}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-medical-lg p-3">
          <p className="font-medium text-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm text-primary">
            Confidence: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="diagnostic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Confidence Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewTypeChange('bar')}
          >
            <Icon name="BarChart3" size={14} />
          </Button>
          <Button
            variant={viewType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewTypeChange('pie')}
          >
            <Icon name="PieChart" size={14} />
          </Button>
        </div>
      </div>
      <div className="h-80">
        {viewType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 100]}
                label={{ value: 'Confidence (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="confidence" 
                fill={(entry) => getBarColor(entry?.confidence)}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-xs text-muted-foreground">High (80%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-xs text-muted-foreground">Medium (60-79%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-xs text-muted-foreground">Low (&lt;60%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">Trending Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceVisualization;