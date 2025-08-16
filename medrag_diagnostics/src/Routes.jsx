import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import NewCaseSymptomInput from './pages/new-case-symptom-input';
import Login from './pages/login';
import AIDiagnosisResults from './pages/ai-diagnosis-results';
import Dashboard from './pages/dashboard';
import DocumentUpload from './pages/document-upload';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/new-case-symptom-input" element={<NewCaseSymptomInput />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-diagnosis-results" element={<AIDiagnosisResults />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;