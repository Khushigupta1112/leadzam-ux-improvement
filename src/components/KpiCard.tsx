import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import { ConversionRateDetails } from '../types/lead';

interface StandardKpiProps {
  type: 'standard';
  title: string;
  icon: LucideIcon;
  value: string | number;
  subtext: string;
}

interface ConversionKpiProps {
  type: 'conversion';
  title: string;
  icon: LucideIcon;
  details: ConversionRateDetails;
  onAddFirstLeadClick: () => void;
}

export type KpiCardProps = StandardKpiProps | ConversionKpiProps;

export const KpiCard: React.FC<KpiCardProps> = (props) => {
  const Icon = props.icon;

  if (props.type === 'standard') {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[148px]">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-[#0066FF] stroke-[2]" />
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            {props.title}
          </span>
        </div>

        {/* Value */}
        <div className="my-2.5">
          <span className="text-3xl sm:text-[34px] font-bold text-slate-900 tracking-tight leading-none">
            {props.value}
          </span>
        </div>

        {/* Subtext */}
        <div className="text-xs text-slate-500 font-normal">
          {props.subtext}
        </div>
      </div>
    );
  }

  // Conversion Rate KPI Card
  const { details, onAddFirstLeadClick } = props;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[148px]">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-[#0066FF] stroke-[2]" />
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          {props.title}
        </span>
      </div>

      {/* State-specific Body */}
      {details.state === 'no-leads' ? (
        <div className="flex flex-col flex-1 justify-center py-2">
          {/* Dash + "No data yet" */}
          <div className="flex items-center space-x-2.5 my-1">
            <span className="w-6 h-[3px] bg-slate-900 rounded-full inline-block" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-700">
              {details.headline}
            </span>
          </div>

          {/* Subtitle explanation */}
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {details.subtext}
          </p>

          {/* Add first lead CTA */}
          <div className="mt-3">
            <button
              onClick={onAddFirstLeadClick}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066FF]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add first lead</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-center py-1">
          {/* Numeric Rate (0% or calculated %) */}
          <div className="my-1.5">
            <span className="text-3xl sm:text-[34px] font-bold text-slate-900 tracking-tight leading-none">
              {details.formattedRate}
            </span>
          </div>

          {/* Breakdown & Context */}
          <div className="space-y-0.5 text-xs text-slate-500">
            <p className="text-slate-500">{details.headline}</p>
            <p className="text-slate-700 font-medium">Won Leads: {details.wonCount}</p>
            <p className="text-slate-500">{details.subtext}</p>
          </div>
        </div>
      )}
    </div>
  );
};
