"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronUp } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
];

interface LanguageDropdownProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 bg-lightGrey border border-orange/30 rounded-lg px-3 py-2 hover:opacity-90 transition-opacity"
      >
        <Globe className="w-5 h-5 text-orange shrink-0" />
        <span className="text-textBlack font-bold text-sm flex-1 text-left">{selectedLang.name}</span>
        <ChevronUp className={`w-4 h-4 text-textGray transition-transform shrink-0 ${isOpen ? '' : 'rotate-180'}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute -bottom-20 md:top-full left-0 w-full md:right-0 md:left-auto md:w-auto md:min-w-[220px] mt-2 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100">
          {/* Header */}
          <div className="text-textGray text-xs font-medium uppercase tracking-wide mb-3">
            SELECT LANGUAGE
          </div>

          {/* Language Options */}
          <div className="space-y-1">
            {languages.map((language) => {
              const isSelected = language.code === selectedLanguage;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between
                    ${isSelected 
                      ? 'bg-iconBg text-orange' 
                      : 'text-textBlack hover:bg-gray-50'
                    }`}
                >
                  <span className="font-medium text-sm">{language.name}</span>
                  {isSelected && (
                    <div className="w-2 h-2 bg-orange rounded-full shrink-0"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;

