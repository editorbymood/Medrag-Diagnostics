import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComplianceSection = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showHipaa, setShowHipaa] = useState(false);

  const termsContent = `Terms of Service\n\nBy creating an account with MedRAG Diagnostics, you agree to the following terms:\n\n1. Professional Use Only: This platform is designed exclusively for licensed healthcare professionals for diagnostic assistance purposes.\n\n2. Clinical Responsibility: All diagnostic decisions remain the sole responsibility of the treating physician. MedRAG provides assistance only and does not replace clinical judgment.\n\n3. Data Security: We implement industry-standard security measures to protect patient and user data in compliance with healthcare regulations.\n\n4. Accuracy Disclaimer: While our AI system is trained on extensive medical literature, results should always be verified against clinical findings and professional judgment.\n\n5. License Verification: Users must maintain valid medical licenses and provide accurate professional credentials.\n\n6. Prohibited Uses: The platform may not be used for emergency situations, direct patient care without physician oversight, or any unlawful purposes.\n\n7. Updates and Changes: We reserve the right to update these terms with appropriate notice to users.\n\nBy checking this box, you acknowledge that you have read, understood, and agree to be bound by these terms.`;

  const hipaaContent = `HIPAA Compliance Agreement\n\nMedRAG Diagnostics is committed to protecting patient health information in accordance with the Health Insurance Portability and Accountability Act (HIPAA).\n\nOur Commitments:\n\n1. Data Encryption: All patient data is encrypted both in transit and at rest using AES-256 encryption standards.\n\n2. Access Controls: Strict role-based access controls ensure only authorized healthcare professionals can access patient information.\n\n3. Audit Trails: Comprehensive logging of all system access and data modifications for compliance monitoring.\n\n4. Business Associate Agreements: All third-party services used comply with HIPAA requirements through appropriate business associate agreements.\n\n5. Data Minimization: We collect and process only the minimum necessary patient information required for diagnostic assistance.\n\n6. Breach Notification: Immediate notification procedures are in place for any potential data breaches as required by law.\n\n7. User Training: Regular security awareness training and updates on HIPAA compliance requirements.\n\nYour Responsibilities:\n\n1. Secure Access: Maintain secure login credentials and never share account access.\n\n2. Patient Consent: Ensure appropriate patient consent for using AI diagnostic assistance tools.\n\n3. Data Accuracy: Provide accurate patient information and maintain data integrity.\n\n4. Incident Reporting: Report any suspected security incidents or breaches immediately.\n\nBy checking this box, you acknowledge understanding of HIPAA requirements and agree to comply with all applicable privacy and security regulations.`;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Legal Compliance</h3>
        
        <div className="space-y-4">
          <div className="diagnostic-card p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                name="acceptTerms"
                checked={formData?.acceptTerms}
                onChange={onChange}
                error={errors?.acceptTerms}
                required
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I agree to the Terms of Service
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Please read and accept our terms of service to continue
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowTerms(true)}
                  className="p-0 h-auto text-xs text-primary hover:underline mt-1"
                >
                  <Icon name="ExternalLink" size={12} className="mr-1" />
                  Read Terms of Service
                </Button>
              </div>
            </div>
          </div>

          <div className="diagnostic-card p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                name="acceptHipaa"
                checked={formData?.acceptHipaa}
                onChange={onChange}
                error={errors?.acceptHipaa}
                required
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I acknowledge HIPAA compliance requirements
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Understand and agree to HIPAA privacy and security requirements
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowHipaa(true)}
                  className="p-0 h-auto text-xs text-primary hover:underline mt-1"
                >
                  <Icon name="Shield" size={12} className="mr-1" />
                  Read HIPAA Agreement
                </Button>
              </div>
            </div>
          </div>

          <div className="diagnostic-card p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                name="acceptMarketing"
                checked={formData?.acceptMarketing}
                onChange={onChange}
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I agree to receive product updates and medical insights (Optional)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Receive newsletters about new features, medical research updates, and platform improvements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Terms Modal */}
      {showTerms && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowTerms(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-lg shadow-medical-lg z-50">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Terms of Service</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTerms(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {termsContent}
              </pre>
            </div>
            <div className="flex justify-end p-4 border-t border-border">
              <Button
                variant="default"
                onClick={() => setShowTerms(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
      {/* HIPAA Modal */}
      {showHipaa && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowHipaa(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-lg shadow-medical-lg z-50">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">HIPAA Compliance Agreement</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHipaa(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {hipaaContent}
              </pre>
            </div>
            <div className="flex justify-end p-4 border-t border-border">
              <Button
                variant="default"
                onClick={() => setShowHipaa(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ComplianceSection;