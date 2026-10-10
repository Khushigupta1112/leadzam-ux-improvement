import React from 'react';
import { Shield, Clock, Users, FileText, Mail, TrendingUp } from 'lucide-react';
import { Lead, ScenarioPreset } from '../types/lead';
import { calculateConversionRate } from '../utils/conversionRate';
import { SetupChecklist } from '../components/SetupChecklist';
import { KpiCard } from '../components/KpiCard';
import { LeadsOverTime } from '../components/LeadsOverTime';
import { TopForms } from '../components/TopForms';

interface DashboardProps {
  leads: Lead[];
  activeFormsCount: number;
  formSubmissionsCount: number;
  currentPreset: ScenarioPreset;
  onOpenAddLeadModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  leads,
  activeFormsCount,
  formSubmissionsCount,
  currentPreset,
  onOpenAddLeadModal,
}) => {
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === 'won').length;

  const conversionDetails = calculateConversionRate(totalLeads, wonLeads);

  const isMockScenario = currentPreset === 'zero-conversions' || currentPreset === 'active-conversions';

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
      {/* Workspace Setup Checklist */}
      <SetupChecklist />

      {/* Admin Dashboard Heading & Trial Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] border border-[#C9DEFF]/60 text-[#0066FF] flex items-center justify-center flex-shrink-0 shadow-xs">
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Good afternoon, khushi gupta. Here's your organization overview.
            </p>
          </div>
        </div>

        {/* Right side: Mock data indicator & CRM Trial Badge */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          {isMockScenario && (
            <span className="text-xs text-slate-400 font-normal hidden sm:inline">
              Illustrative mock data
            </span>
          )}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#EBF3FF] text-[#0066FF] border border-[#C9DEFF] rounded-lg text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>CRM trial 14 days left</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section aria-label="Key Performance Indicators" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. TOTAL LEADS */}
          <KpiCard
            type="standard"
            title="TOTAL LEADS"
            icon={Users}
            value={totalLeads}
            subtext="Forms, imports & manual"
          />

          {/* 2. ACTIVE FORMS */}
          <KpiCard
            type="standard"
            title="ACTIVE FORMS"
            icon={FileText}
            value={activeFormsCount}
            subtext="Currently collecting"
          />

          {/* 3. FORM SUBMISSIONS */}
          <KpiCard
            type="standard"
            title="FORM SUBMISSIONS"
            icon={Mail}
            value={formSubmissionsCount}
            subtext="Via forms & WhatsApp"
          />

          {/* 4. CONVERSION RATE */}
          <KpiCard
            type="conversion"
            title="CONVERSION RATE"
            icon={TrendingUp}
            details={conversionDetails}
            onAddFirstLeadClick={onOpenAddLeadModal}
          />
        </div>
      </section>

      {/* Bottom Dashboard Grid: Leads Over Time & Top Forms */}
      <section aria-label="Detailed Analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LeadsOverTime totalLeads={totalLeads} wonLeads={wonLeads} />
        </div>
        <div className="lg:col-span-1">
          <TopForms formSubmissions={formSubmissionsCount} />
        </div>
      </section>
    </main>
  );
};
