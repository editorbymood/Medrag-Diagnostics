import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'dr.smith@hospital.com',
    password: 'MedRAG2024!'
  };

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store auth token (mock)
        localStorage.setItem('medrag_auth_token', 'mock_jwt_token_' + Date.now());
        localStorage.setItem('medrag_user', JSON.stringify({
          id: 'dr_001',
          name: 'Dr. Sarah Smith',
          email: formData?.email,
          role: 'physician',
          specialization: 'Internal Medicine'
        }));
        
        navigate('/dashboard');
      } else {
        setErrors({
          submit: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        submit: 'Authentication failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="Enter your professional email"
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors?.password}
          required
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>
      </div>
      {errors?.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          New to MedRAG?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;