import React from 'react';
import { BarChart3 } from 'lucide-react';

interface LeadsOverTimeProps {
  totalLeads: number;
  wonLeads: number;
}

export const LeadsOverTime: React.FC<LeadsOverTimeProps> = ({ totalLeads, wonLeads }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-[#0066FF]" />
          <h3 className="text-sm font-semibold text-slate-900">Leads over time</h3>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span>Leads</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Conversions</span>
          </div>
        </div>
      </div>

      {/* Body / Chart Area */}
      <div className="h-44 flex flex-col items-center justify-center text-center p-4">
        {totalLeads === 0 ? (
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-600">No timeline activity</p>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Lead generation activity and conversion milestones will be plotted here automatically.
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {/* Simple visual bar chart representing lead distribution */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              // Distribute mock leads for visualization
              const leadHeight = Math.min(100, Math.max(15, (totalLeads * 8 + (idx * 9)) % 90));
              const wonHeight = wonLeads > 0 ? Math.min(leadHeight, Math.max(10, (wonLeads * 14 + idx * 5) % leadHeight)) : 0;
              return (
                <div key={day} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full max-w-[28px] flex items-end justify-center gap-1 h-32">
                    <div
                      className="w-2.5 bg-[#0066FF] rounded-t-xs transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${leadHeight}%` }}
                      title={`${day}: Leads`}
                    />
                    {wonLeads > 0 && (
                      <div
                        className="w-2.5 bg-[#10B981] rounded-t-xs transition-all duration-300 group-hover:brightness-110"
                        style={{ height: `${wonHeight}%` }}
                        title={`${day}: Conversions`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-medium">{day}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
