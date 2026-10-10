import type { ConversionRateDetails } from '../types/lead.ts';

/**
 * Calculates conversion rate details adhering to LeadZam UX specification:
 * - If total leads = 0: unavailable ('—'), 'No data yet.', prompt to add first lead.
 * - If total leads > 0 and won leads = 0: '0%', formula info, 'No leads have converted yet.'
 * - If total leads > 0 and won leads > 0: calculated percentage, formula info.
 * - Safely guards against division by zero, NaN, and Infinity.
 */
export function calculateConversionRate(totalLeads: number, wonLeads: number): ConversionRateDetails {
  // Safe boundaries
  const total = Math.max(0, Number.isFinite(totalLeads) ? totalLeads : 0);
  const won = Math.max(0, Number.isFinite(wonLeads) ? wonLeads : 0);

  if (total === 0) {
    return {
      state: 'no-leads',
      rate: null,
      formattedRate: '—',
      headline: 'No data yet',
      subtext: 'Your conversion rate will appear once leads are added.',
      wonCount: 0,
      totalCount: 0,
      showAddAction: true,
    };
  }

  const rawRate = (won / total) * 100;
  const safeRate = Number.isFinite(rawRate) ? rawRate : 0;
  // Format nicely: e.g. 25% or 12.5%
  const formattedRate = safeRate % 1 === 0 ? `${safeRate.toFixed(0)}%` : `${safeRate.toFixed(1)}%`;

  if (won === 0) {
    return {
      state: 'zero-conversions',
      rate: 0,
      formattedRate: '0%',
      headline: 'Won ÷ total leads',
      subtext: 'No leads have converted yet.',
      wonCount: 0,
      totalCount: total,
      showAddAction: false,
    };
  }

  return {
    state: 'active-conversions',
    rate: safeRate,
    formattedRate,
    headline: 'Won ÷ total leads',
    subtext: `${won} of ${total} leads converted.`,
    wonCount: won,
    totalCount: total,
    showAddAction: false,
  };
}
