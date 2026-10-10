import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';

interface TopFormsProps {
  formSubmissions: number;
}

export const TopForms: React.FC<TopFormsProps> = ({ formSubmissions }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-[#0066FF]" />
          <h3 className="text-sm font-semibold text-slate-900">Top forms</h3>
        </div>

        <button className="text-xs font-medium text-[#0066FF] hover:underline flex items-center space-x-1">
          <span>View all</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body / List */}
      <div className="h-44 flex flex-col justify-center">
        <div className="border border-slate-100 rounded-lg p-3.5 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-medium">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">General Inquiry Form</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
                <span className="text-[11px] text-slate-400">Created 2 days ago</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">{formSubmissions}</span>
            <p className="text-[10px] text-slate-400">submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
