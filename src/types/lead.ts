export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'won' | 'lost';
  createdAt: string;
}

export type ConversionRateState = 'no-leads' | 'zero-conversions' | 'active-conversions';

export interface ConversionRateDetails {
  state: ConversionRateState;
  rate: number | null;
  formattedRate: string;
  headline: string;
  subtext: string;
  wonCount: number;
  totalCount: number;
  showAddAction: boolean;
}

export type ScenarioPreset = 'no-leads' | 'zero-conversions' | 'active-conversions';
