import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import CaseContextSidebar from '../../components/ui/CaseContextSidebar';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import RecentCasesTable from './components/RecentCasesTable';
import SummaryWidgets from './components/SummaryWidgets';
import DiagnosticChart from './components/DiagnosticChart';
import QuickAccessTiles from './components/QuickAccessTiles';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSave = () => {
    console.log('Dashboard state saved');
  };

  const handleExport = () => {
    console.log('Dashboard data exported');
  };

  const handleAddNote = (note) => {
    console.log('Note added:', note);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:mr-80' : ''}`}>
          <div className="pt-20 px-6 pb-6">
            <Breadcrumbs />
            
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome back, Dr. Smith
                  </h1>
                  <p className="text-muted-foreground">
                    {formatDate(currentTime)} • {formatTime(currentTime)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Wifi" size={16} className="text-success" />
                    <span>System Online</span>
                  </div>
                  
                  <Link to="/new-case-symptom-input">
                    <Button variant="default" size="lg" className="shadow-medical">
                      <Icon name="Plus" size={20} />
                      New Case
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden"
                  >
                    <Icon name="PanelRight" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            <QuickActionToolbar
              currentStep="dashboard"
              onSave={handleSave}
              onExport={handleExport}
              onAddNote={handleAddNote}
              saveStatus="saved"
            />

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-8 space-y-6">
                {/* Recent Cases Table */}
                <RecentCasesTable />
                
                {/* Diagnostic Chart */}
                <DiagnosticChart />
              </div>

              {/* Right Column - Widgets */}
              <div className="xl:col-span-4 space-y-6">
                {/* Summary Widgets */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
                  <SummaryWidgets />
                </div>

                {/* System Status */}
                <div className="diagnostic-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">System Status</h3>
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI Engine</span>
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm font-medium text-success">Online</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm font-medium text-success">Connected</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">PubMed API</span>
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm font-medium text-success">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Backup</span>
                      <span className="text-sm clinical-data">08/16 06:00</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="diagnostic-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cases This Month</span>
                      <span className="text-lg font-bold text-foreground">247</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Processing Time</span>
                      <span className="text-lg font-bold text-foreground">3.2m</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="text-lg font-bold text-success">96.8%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2 mt-4">
                      <div className="bg-success h-2 rounded-full" style={{ width: '96.8%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Section */}
            <div className="mt-8">
              <QuickAccessTiles />
            </div>
          </div>
        </div>

        {/* Case Context Sidebar */}
        <CaseContextSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </div>
  );
};

export default Dashboard;