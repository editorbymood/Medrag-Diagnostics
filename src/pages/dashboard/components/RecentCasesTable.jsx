import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentCasesTable = () => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const recentCases = [
    {
      id: "C-2024-001",
      patientId: "P-2024-001",
      patientName: "John Doe",
      age: 45,
      symptoms: ["Chest pain", "Shortness of breath"],
      confidence: 87,
      status: "Completed",
      createdAt: "2024-08-16 07:30",
      lastUpdated: "2024-08-16 07:45"
    },
    {
      id: "C-2024-002",
      patientId: "P-2024-002",
      patientName: "Sarah Johnson",
      age: 32,
      symptoms: ["Headache", "Nausea", "Dizziness"],
      confidence: 73,
      status: "In Progress",
      createdAt: "2024-08-16 06:15",
      lastUpdated: "2024-08-16 07:20"
    },
    {
      id: "C-2024-003",
      patientId: "P-2024-003",
      patientName: "Michael Brown",
      age: 58,
      symptoms: ["Fatigue", "Joint pain"],
      confidence: 65,
      status: "Pending Review",
      createdAt: "2024-08-16 05:45",
      lastUpdated: "2024-08-16 06:30"
    },
    {
      id: "C-2024-004",
      patientId: "P-2024-004",
      patientName: "Emily Davis",
      age: 28,
      symptoms: ["Fever", "Cough", "Sore throat"],
      confidence: 92,
      status: "Completed",
      createdAt: "2024-08-15 16:20",
      lastUpdated: "2024-08-15 17:15"
    },
    {
      id: "C-2024-005",
      patientId: "P-2024-005",
      patientName: "Robert Wilson",
      age: 41,
      symptoms: ["Abdominal pain", "Bloating"],
      confidence: 78,
      status: "In Progress",
      createdAt: "2024-08-15 14:30",
      lastUpdated: "2024-08-16 07:10"
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'medical-status-success';
      case 'in progress':
        return 'medical-status-warning';
      case 'pending review':
        return 'medical-status-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="diagnostic-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Cases</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} />
              <span className="hidden sm:inline ml-2">Filter</span>
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline ml-2">Export</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('patient')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Patient</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Symptoms
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('confidence')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Confidence</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Last Updated</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentCases?.map((case_) => (
              <tr key={case_?.id} className="hover:bg-muted/30 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{case_?.patientName}</div>
                      <div className="text-xs text-muted-foreground clinical-data">{case_?.patientId} • Age {case_?.age}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {case_?.symptoms?.slice(0, 2)?.map((symptom, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent-foreground"
                      >
                        {symptom}
                      </span>
                    ))}
                    {case_?.symptoms?.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                        +{case_?.symptoms?.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          case_?.confidence >= 80 ? 'bg-success' :
                          case_?.confidence >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${case_?.confidence}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${getConfidenceColor(case_?.confidence)}`}>
                      {case_?.confidence}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_?.status)}`}>
                    {case_?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{case_?.lastUpdated}</div>
                  <div className="text-xs text-muted-foreground">Created: {case_?.createdAt}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link to={`/ai-diagnosis-results?case=${case_?.id}`}>
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                    </Link>
                    <Link to={`/document-upload?case=${case_?.id}`}>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 23 cases
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCasesTable;