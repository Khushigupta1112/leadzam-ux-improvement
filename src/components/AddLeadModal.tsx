import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Lead } from '../types/lead';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLead: Omit<Lead, 'id' | 'createdAt'>) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Touched states for blur-based validation
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
  });

  // Track if a submit attempt has occurred
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setPhone('');
      setTouched({ fullName: false, email: false });
      setHasSubmitted(false);

      // Focus the first input
      setTimeout(() => {
        fullNameInputRef.current?.focus();
      }, 50);

      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Validation logic
  const isFullNameEmpty = fullName.trim() === '';
  const fullNameError = isFullNameEmpty ? "Enter the lead's full name." : '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailError = '';
  if (email.trim() === '') {
    emailError = "Enter the lead's email address.";
  } else if (!emailRegex.test(email.trim())) {
    emailError = 'Enter a valid email address.';
  }

  // Determine whether to display inline errors
  const showFullNameError = (hasSubmitted || touched.fullName) && !!fullNameError;
  const showEmailError = (hasSubmitted || touched.email) && !!emailError;
  const showTopBanner = hasSubmitted && (isFullNameEmpty || !!emailError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (fullNameError || emailError) {
      return;
    }

    onSave({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() ? phone.trim() : undefined,
      status: 'new',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-lead-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-[490px] overflow-hidden border border-slate-200 transform transition-all animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-start justify-between">
          <div>
            <h2 id="add-lead-title" className="text-xl font-bold text-slate-900">
              Add lead
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Create your first lead to start tracking your pipeline.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-4 space-y-4">
          {/* Top Banner Alert (matches Add Lead — Validation Error.png) */}
          {showTopBanner && (
            <div
              role="alert"
              className="bg-[#FEF2F2] border border-[#FCA5A5]/60 text-[#B91C1C] rounded-lg px-3.5 py-2.5 text-xs font-medium flex items-center space-x-2 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <span>Lead not saved. Complete the required fields below.</span>
            </div>
          )}

          {/* Full Name Field */}
          <div>
            <label
              htmlFor="lead-full-name"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Full name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="lead-full-name"
              ref={fullNameInputRef}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
              aria-invalid={showFullNameError}
              aria-describedby={showFullNameError ? 'full-name-error' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-colors ${
                showFullNameError
                  ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                  : 'border-slate-300 focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]'
              }`}
              placeholder=""
            />
            {showFullNameError && (
              <p
                id="full-name-error"
                className="mt-1.5 text-xs text-[#DC2626] flex items-center space-x-1"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{fullNameError}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="lead-email"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Email <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? 'email-error' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-colors ${
                showEmailError
                  ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                  : 'border-slate-300 focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]'
              }`}
              placeholder=""
            />
            {showEmailError && (
              <p
                id="email-error"
                className="mt-1.5 text-xs text-[#DC2626] flex items-center space-x-1"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="lead-phone"
              className="block text-xs font-semibold text-slate-800 mb-1.5"
            >
              Phone (optional)
            </label>
            <input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
              placeholder=""
            />
          </div>

          {/* Helper note & Buttons */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">* Required fields</span>
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-[#0052CC] rounded-lg shadow-xs transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
