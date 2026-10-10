import React from 'react';
import { Home, ChevronRight, Compass, Moon, Clock, Bell, Menu, X, Plus } from 'lucide-react';

interface HeaderProps {
  onAddLeadClick: () => void;
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  showMobileAddLeadButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onAddLeadClick,
  isMobileNavOpen,
  onToggleMobileNav,
  showMobileAddLeadButton = true,
}) => {
  return (
    <header className="w-full bg-white border-b border-[#E2E8F0]">
      {/* Main Top Nav Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5">
        {/* Desktop Breadcrumbs */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500 font-normal">
          <button className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Home">
            <Home className="w-4 h-4" />
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-800 font-medium">Admin Dashboard</span>
        </div>

        {/* Mobile Header: Logo + Title + Menu Toggle */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center justify-center w-7 h-7 text-[#0066FF]">
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                <path
                  d="M7 16.5L12.5 22L25 9.5L22 7L12.5 16.5L9.5 13.5L7 16.5Z"
                  fill="#0066FF"
                />
              </svg>
            </div>
            <span className="font-semibold text-slate-900 text-base">Admin Dashboard</span>
          </div>

          <button
            onClick={onToggleMobileNav}
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3.5">
          <button
            type="button"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-[#0066FF] bg-[#EBF3FF] border border-[#C9DEFF] rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Finish setup</span>
          </button>

          <div className="flex items-center space-x-1 pl-1 text-slate-400">
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Activity history"
            >
              <Clock className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-only CTA as featured in Mobile View.png */}
      {showMobileAddLeadButton && (
        <div className="md:hidden px-4 pt-3 pb-2 bg-[#F8FAFC]">
          <button
            onClick={onAddLeadClick}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add first lead</span>
          </button>
        </div>
      )}
    </header>
  );
};
