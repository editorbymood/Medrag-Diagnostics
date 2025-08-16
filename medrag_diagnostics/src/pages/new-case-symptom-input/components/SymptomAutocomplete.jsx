import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SymptomAutocomplete = ({ 
  value = '', 
  onChange = () => {}, 
  onSymptomSelect = () => {},
  placeholder = "Type to search symptoms...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const medicalSymptoms = [
    { id: 'chest-pain', name: 'Chest Pain', code: 'R06.02', category: 'Cardiovascular' },
    { id: 'shortness-breath', name: 'Shortness of Breath', code: 'R06.00', category: 'Respiratory' },
    { id: 'fatigue', name: 'Fatigue', code: 'R53.1', category: 'General' },
    { id: 'headache', name: 'Headache', code: 'R51', category: 'Neurological' },
    { id: 'nausea', name: 'Nausea', code: 'R11.0', category: 'Gastrointestinal' },
    { id: 'fever', name: 'Fever', code: 'R50.9', category: 'General' },
    { id: 'dizziness', name: 'Dizziness', code: 'R42', category: 'Neurological' },
    { id: 'abdominal-pain', name: 'Abdominal Pain', code: 'R10.9', category: 'Gastrointestinal' },
    { id: 'back-pain', name: 'Back Pain', code: 'M54.9', category: 'Musculoskeletal' },
    { id: 'cough', name: 'Cough', code: 'R05', category: 'Respiratory' },
    { id: 'joint-pain', name: 'Joint Pain', code: 'M25.50', category: 'Musculoskeletal' },
    { id: 'muscle-weakness', name: 'Muscle Weakness', code: 'M62.81', category: 'Musculoskeletal' },
    { id: 'palpitations', name: 'Palpitations', code: 'R00.2', category: 'Cardiovascular' },
    { id: 'skin-rash', name: 'Skin Rash', code: 'R21', category: 'Dermatological' },
    { id: 'weight-loss', name: 'Weight Loss', code: 'R63.4', category: 'General' }
  ];

  useEffect(() => {
    if (value?.length > 0) {
      const filtered = medicalSymptoms?.filter(symptom =>
        symptom?.name?.toLowerCase()?.includes(value?.toLowerCase()) ||
        symptom?.code?.toLowerCase()?.includes(value?.toLowerCase()) ||
        symptom?.category?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setFilteredSymptoms(filtered);
      setIsOpen(filtered?.length > 0);
    } else {
      setFilteredSymptoms([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target) &&
          inputRef?.current && !inputRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e?.target?.value);
  };

  const handleSymptomClick = (symptom) => {
    onChange(symptom?.name);
    onSymptomSelect(symptom);
    setIsOpen(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Cardiovascular': 'text-red-600 bg-red-50',
      'Respiratory': 'text-blue-600 bg-blue-50',
      'Neurological': 'text-purple-600 bg-purple-50',
      'Gastrointestinal': 'text-green-600 bg-green-50',
      'Musculoskeletal': 'text-orange-600 bg-orange-50',
      'Dermatological': 'text-pink-600 bg-pink-50',
      'General': 'text-gray-600 bg-gray-50'
    };
    return colors?.[category] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={inputRef}>
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-10"
        />
        <Icon 
          name="Search" 
          size={16} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
        />
      </div>
      {isOpen && filteredSymptoms?.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-medical-lg max-h-64 overflow-y-auto"
        >
          {filteredSymptoms?.map((symptom) => (
            <div
              key={symptom?.id}
              onClick={() => handleSymptomClick(symptom)}
              className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{symptom?.name}</span>
                  <span className="clinical-data text-xs text-muted-foreground">
                    {symptom?.code}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(symptom?.category)}`}>
                {symptom?.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomAutocomplete;