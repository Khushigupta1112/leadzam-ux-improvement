import React from 'react';
import { Sparkles, RotateCcw, Plus, Award } from 'lucide-react';
import { ScenarioPreset } from '../types/lead';

interface DemoControlsProps {
  currentPreset: ScenarioPreset;
  onSelectPreset: (preset: ScenarioPreset) => void;
  onQuickAddLead: () => void;
  onToggleWinLead: () => void;
  onReset: () => void;
  totalLeads: number;
  wonLeads: number;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  currentPreset,
  onSelectPreset,
  onQuickAddLead,
  onToggleWinLead,
  onReset,
  totalLeads,
  wonLeads,
}) => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[10px]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prototype Reviewer Controls</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">|</span>
        <span className="text-slate-400 hidden sm:inline text-[11px]">
          Current state: <strong className="text-white">{totalLeads} leads</strong> ({wonLeads} won)
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center flex-wrap gap-1.5">
        <span className="text-slate-400 text-[11px] mr-1 hidden md:inline">Presets:</span>
        <button
          onClick={() => onSelectPreset('no-leads')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
            currentPreset === 'no-leads'
              ? 'bg-[#0066FF] text-white shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          1. No Leads (Default)
        </button>

        <button
          onClick={() => onSelectPreset('zero-conversions')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
            currentPreset === 'zero-conversions'
              ? 'bg-[#0066FF] text-white shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          2. Zero Conversions (12 leads, 0 won)
        </button>

        <button
          onClick={() => onSelectPreset('active-conversions')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
            currentPreset === 'active-conversions'
              ? 'bg-[#0066FF] text-white shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          3. Active Conversions (3 won / 12 leads)
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

        {/* Quick Testing Actions */}
        <button
          onClick={onQuickAddLead}
          title="Quickly add 1 lead to current state"
          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-[11px] flex items-center space-x-1"
        >
          <Plus className="w-3 h-3 text-[#0066FF]" />
          <span>+1 Lead</span>
        </button>

        <button
          onClick={onToggleWinLead}
          disabled={totalLeads === 0}
          title={totalLeads === 0 ? 'Add leads first to convert' : 'Mark 1 lead as won'}
          className={`px-2 py-1 rounded-md text-[11px] flex items-center space-x-1 ${
            totalLeads === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-slate-800 hover:bg-slate-700 text-emerald-400'
          }`}
        >
          <Award className="w-3 h-3" />
          <span>+1 Won</span>
        </button>

        <button
          onClick={onReset}
          title="Reset to initial No Leads state"
          className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          aria-label="Reset prototype to initial state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
