import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiagnosticChart = () => {
  const [chartType, setChartType] = useState('accuracy');
  const [timeRange, setTimeRange] = useState('7d');

  const accuracyData = [
    { date: '08/10', accuracy: 78, cases: 15 },
    { date: '08/11', accuracy: 82, cases: 18 },
    { date: '08/12', accuracy: 85, cases: 22 },
    { date: '08/13', accuracy: 79, cases: 16 },
    { date: '08/14', accuracy: 88, cases: 24 },
    { date: '08/15', accuracy: 91, cases: 19 },
    { date: '08/16', accuracy: 84, cases: 12 }
  ];

  const volumeData = [
    { date: '08/10', completed: 12, pending: 3, total: 15 },
    { date: '08/11', completed: 15, pending: 3, total: 18 },
    { date: '08/12', completed: 18, pending: 4, total: 22 },
    { date: '08/13', completed: 13, pending: 3, total: 16 },
    { date: '08/14', completed: 20, pending: 4, total: 24 },
    { date: '08/15', completed: 16, pending: 3, total: 19 },
    { date: '08/16', completed: 9, pending: 3, total: 12 }
  ];

  const chartConfig = {
    accuracy: {
      title: 'Diagnostic Accuracy Trends',
      data: accuracyData,
      component: LineChart,
      children: (
        <Line
          type="monotone"
          dataKey="accuracy"
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
        />
      )
    },
    volume: {
      title: 'Case Volume',
      data: volumeData,
      component: BarChart,
      children: (
        <>
          <Bar dataKey="completed" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="pending" fill="var(--color-warning)" radius={[2, 2, 0, 0]} />
        </>
      )
    }
  };

  const currentChart = chartConfig?.[chartType];
  const ChartComponent = currentChart?.component;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-medical p-3">
          <p className="text-sm font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}${chartType === 'accuracy' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="diagnostic-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">{currentChart?.title}</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setChartType('accuracy')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  chartType === 'accuracy' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Accuracy
              </button>
              <button
                onClick={() => setChartType('volume')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  chartType === 'volume' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Volume
              </button>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-muted-foreground">
              {chartType === 'accuracy' ? 'Accuracy %' : 'Completed'}
            </span>
          </div>
          {chartType === 'volume' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-muted-foreground">Pending</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="w-full h-80" aria-label={`${currentChart?.title} Chart`}>
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={currentChart?.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                domain={chartType === 'accuracy' ? [0, 100] : [0, 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              {currentChart?.children}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {chartType === 'accuracy' ? '84%' : '103'}
            </div>
            <div className="text-xs text-muted-foreground">
              {chartType === 'accuracy' ? 'Avg. Accuracy' : 'Total Cases'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-success">
              {chartType === 'accuracy' ? '+6%' : '+15'}
            </div>
            <div className="text-xs text-muted-foreground">
              {chartType === 'accuracy' ? 'vs Last Week' : 'vs Last Week'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {chartType === 'accuracy' ? '91%' : '24'}
            </div>
            <div className="text-xs text-muted-foreground">
              {chartType === 'accuracy' ? 'Peak Score' : 'Peak Day'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticChart;