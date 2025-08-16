import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SecuritySection = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^A-Za-z0-9]/?.test(password)) score++;

    const strengthLevels = {
      0: { text: 'Very Weak', color: 'text-error' },
      1: { text: 'Weak', color: 'text-error' },
      2: { text: 'Fair', color: 'text-warning' },
      3: { text: 'Good', color: 'text-warning' },
      4: { text: 'Strong', color: 'text-success' },
      5: { text: 'Very Strong', color: 'text-success' }
    };

    return { score, ...strengthLevels?.[score] };
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Security</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={onChange}
              error={errors?.password}
              description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
            
            {formData?.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Password Strength:</span>
                  <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                    {passwordStrength?.text}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordStrength?.score <= 1 ? 'bg-error' :
                      passwordStrength?.score <= 3 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={onChange}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;