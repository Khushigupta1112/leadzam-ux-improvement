import React, { useState } from 'react';
import { X, ArrowRight, ChevronRight, Check } from 'lucide-react';

interface SetupStep {
  id: string;
  label: string;
  actionText: string;
  completed: boolean;
}

export const SetupChecklist: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [steps, setSteps] = useState<SetupStep[]>([
    { id: '1', label: 'Connect a lead source', actionText: 'Open Integrations', completed: false },
    { id: '2', label: 'Invite your team', actionText: 'Open Users', completed: false },
    { id: '3', label: 'See every setting once', actionText: 'Open Settings', completed: false },
    { id: '4', label: 'Add an active pipeline stage', actionText: 'Open Lead Stages', completed: false },
    { id: '5', label: 'Find your leads', actionText: 'Open All Leads', completed: false },
    { id: '6', label: 'Move a lead through your pipeline', actionText: 'Open All Leads', completed: false },
  ]);

  const toggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;

  if (!isVisible) {
    return (
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsVisible(true)}
          className="text-xs text-[#0066FF] hover:underline flex items-center space-x-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
        >
          <span>Show workspace setup checklist ({completedCount}/6 done)</span>
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Workspace setup checklist"
      className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden mb-6 transition-all"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#F1F5F9]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Finish setting up your workspace
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {completedCount} of {steps.length} done
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss setup checklist"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-[#0066FF] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="divide-y divide-[#F1F5F9]">
        {steps.map((step) => (
          <div
            key={step.id}
            className="px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/60 transition-colors gap-2"
          >
            <button
              onClick={() => toggleStep(step.id)}
              className="flex items-center space-x-3 text-left group"
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                  step.completed
                    ? 'bg-[#0066FF] border-[#0066FF] text-white'
                    : 'border-slate-300 group-hover:border-[#0066FF]'
                }`}
              >
                {step.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span
                className={`text-sm ${
                  step.completed
                    ? 'line-through text-slate-400'
                    : 'text-slate-800 group-hover:text-slate-900 font-normal'
                }`}
              >
                {step.label}
              </span>
            </button>

            <button
              onClick={() => toggleStep(step.id)}
              className="flex items-center space-x-1 text-xs font-medium text-[#0066FF] hover:text-[#0052CC] self-start sm:self-auto pl-8 sm:pl-0 transition-colors"
            >
              <span>{step.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="px-4 sm:px-5 py-3 bg-[#FAFCFF] border-t border-[#F1F5F9]">
        <button className="text-xs font-medium text-slate-600 hover:text-[#0066FF] flex items-center space-x-1 transition-colors">
          <span>See the full setup guide</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
