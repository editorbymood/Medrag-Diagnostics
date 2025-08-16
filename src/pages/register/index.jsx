import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PersonalInfoSection from './components/PersonalInfoSection';
import ProfessionalCredentialsSection from './components/ProfessionalCredentialsSection';
import SecuritySection from './components/SecuritySection';
import ComplianceSection from './components/ComplianceSection';
import TrustSignalsPanel from './components/TrustSignalsPanel';
import RegistrationProgress from './components/RegistrationProgress';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licenseVerificationStatus, setLicenseVerificationStatus] = useState('pending');
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    specialty: '',
    institutionType: '',
    institutionName: '',
    experience: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptHipaa: false,
    acceptMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  // Mock credentials for testing
  const mockCredentials = {
    email: "doctor@hospital.com",
    password: "MedRAG2024!",
    licenseNumber: "MD123456789"
  };

  useEffect(() => {
    // Simulate license verification when license number is entered
    if (formData?.licenseNumber && formData?.licenseNumber?.length >= 8) {
      setLicenseVerificationStatus('verifying');
      
      setTimeout(() => {
        if (formData?.licenseNumber === mockCredentials?.licenseNumber) {
          setLicenseVerificationStatus('verified');
        } else {
          setLicenseVerificationStatus('failed');
        }
      }, 2000);
    } else {
      setLicenseVerificationStatus('pending');
    }
  }, [formData?.licenseNumber]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 'personal':
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        break;

      case 'professional':
        if (!formData?.licenseNumber?.trim()) {
          newErrors.licenseNumber = 'Medical license number is required';
        } else if (licenseVerificationStatus === 'failed') {
          newErrors.licenseNumber = 'License verification failed. Please check your license number.';
        }
        if (!formData?.specialty) newErrors.specialty = 'Medical specialty is required';
        if (!formData?.institutionType) newErrors.institutionType = 'Institution type is required';
        if (!formData?.institutionName?.trim()) newErrors.institutionName = 'Institution name is required';
        if (!formData?.experience) newErrors.experience = 'Years of experience is required';
        break;

      case 'security':
        if (!formData?.password) {
          newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/?.test(formData?.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
        }
        if (!formData?.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 'compliance':
        if (!formData?.acceptTerms) newErrors.acceptTerms = 'You must accept the terms of service';
        if (!formData?.acceptHipaa) newErrors.acceptHipaa = 'You must acknowledge HIPAA compliance requirements';
        break;
    }

    return newErrors;
  };

  const handleStepValidation = (step) => {
    const stepErrors = validateStep(step);
    setErrors(prev => ({ ...prev, ...stepErrors }));

    if (Object.keys(stepErrors)?.length === 0) {
      if (!completedSteps?.includes(step)) {
        setCompletedSteps(prev => [...prev, step]);
      }
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate all steps
    const allErrors = {
      ...validateStep('personal'),
      ...validateStep('professional'),
      ...validateStep('security'),
      ...validateStep('compliance')
    };

    setErrors(allErrors);

    if (Object.keys(allErrors)?.length > 0) {
      return;
    }

    if (licenseVerificationStatus !== 'verified') {
      setErrors(prev => ({
        ...prev,
        licenseNumber: 'License must be verified before registration'
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show email verification step
      setShowEmailVerification(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return completedSteps?.length === 4 && 
           licenseVerificationStatus === 'verified' &&
           Object.keys(errors)?.length === 0;
  };

  if (showEmailVerification) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Email Verification - MedRAG Diagnostics</title>
        </Helmet>
        <div className="w-full max-w-md">
          <div className="diagnostic-card p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a verification link to <strong>{formData?.email}</strong>. 
              Please check your email and click the link to activate your account.
            </p>
            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowEmailVerification(false)}
              >
                Back to Registration
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Register - MedRAG Diagnostics</title>
        <meta name="description" content="Create your MedRAG account to access AI-powered diagnostic assistance for healthcare professionals." />
      </Helmet>
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Activity" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">MedRAG</h1>
                <p className="text-xs text-muted-foreground -mt-1">Diagnostics</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h2>
              <p className="text-muted-foreground">
                Join thousands of healthcare professionals using AI-powered diagnostic assistance
              </p>
            </div>

            <RegistrationProgress
              currentStep={currentStep}
              completedSteps={completedSteps}
              formValidation={formData}
            />

            <form onSubmit={handleSubmit} className="space-y-8">
              <PersonalInfoSection
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              <ProfessionalCredentialsSection
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                licenseVerificationStatus={licenseVerificationStatus}
              />

              <SecuritySection
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              <ComplianceSection
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />

              {errors?.submit && (
                <div className="diagnostic-card p-4 medical-status-error">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} />
                    <span className="text-sm">{errors?.submit}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isSubmitting}
                  disabled={!isFormValid() || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="sm:w-auto"
                >
                  Back to Login
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                This platform is designed for licensed healthcare professionals only.
              </p>
            </div>
          </div>

          {/* Trust Signals Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TrustSignalsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;