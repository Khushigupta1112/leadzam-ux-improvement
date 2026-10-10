import React from 'react';
import {
  Shield,
  FileText,
  Users,
  Clock,
  Phone,
  BarChart2,
  MessageSquare,
  Cable,
  GitBranch,
  Settings,
  Download,
  Trash2,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  onAddLeadClick: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onAddLeadClick,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { icon: Shield, label: 'Admin Dashboard', active: true },
    { icon: FileText, label: 'Forms & Documents', active: false },
    { icon: Users, label: 'Contacts & Leads', active: false },
    { icon: Clock, label: 'Activity Log', active: false },
    { icon: Phone, label: 'Calls', active: false },
    { icon: BarChart2, label: 'Analytics', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Cable, label: 'Integrations', active: false },
    { icon: GitBranch, label: 'Pipelines', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: Download, label: 'Export Data', active: false },
    { icon: Trash2, label: 'Trash', active: false },
  ];

  const content = (
    <div className="flex flex-col items-center justify-between h-full py-4 w-16 bg-white border-r border-[#E2E8F0]">
      {/* Top section: Logo + Quick Add + Main Nav */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {/* LeadZam Logo */}
        <div className="flex items-center justify-center w-10 h-10 mb-1" title="LeadZam">
          <svg className="w-8 h-8 text-[#0066FF]" viewBox="0 0 32 32" fill="none">
            <path
              d="M7 16.5L12.5 22L25 9.5L22 7L12.5 16.5L9.5 13.5L7 16.5Z"
              fill="#0066FF"
            />
            <path
              d="M17 4L8 16H15L13 28L24 14H17L19 4Z"
              fill="currentColor"
              className="opacity-90"
            />
          </svg>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={onAddLeadClick}
          aria-label="Add new lead"
          title="Add new lead"
          className="w-10 h-10 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066FF]"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Nav list */}
        <nav className="flex flex-col items-center space-y-1 w-full px-2" aria-label="Main Navigation">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                title={item.label}
                aria-label={item.label}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  item.active
                    ? 'bg-[#EBF3FF] text-[#0066FF]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Avatar */}
      <div className="pt-4 border-t border-slate-100 w-full flex justify-center">
        <div
          title="khushi gupta (Admin)"
          className="w-9 h-9 rounded-full bg-[#0066FF] text-white font-semibold text-xs flex items-center justify-center ring-2 ring-white shadow-sm cursor-pointer hover:opacity-95"
        >
          KH
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (fixed/static on left) */}
      <aside className="hidden md:block h-screen sticky top-0 z-30 flex-shrink-0" aria-label="Sidebar">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
