import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AddLeadModal } from './components/AddLeadModal';
import { DemoControls } from './components/DemoControls';
import { Toast } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { Lead, ScenarioPreset } from './types/lead';

// Helper mock leads generator
const createMockLeads = (total: number, wonCount: number): Lead[] => {
  return Array.from({ length: total }, (_, i) => ({
    id: `mock-${i + 1}`,
    fullName: `Sample Lead ${i + 1}`,
    email: `lead${i + 1}@example.com`,
    phone: `+1 (555) 010-${1000 + i}`,
    status: i < wonCount ? 'won' : 'new',
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
};

export function App() {
  const [currentPreset, setCurrentPreset] = useState<ScenarioPreset>('no-leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeFormsCount] = useState(1);
  const [formSubmissionsCount, setFormSubmissionsCount] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Switch scenario preset
  const handleSelectPreset = (preset: ScenarioPreset) => {
    setCurrentPreset(preset);
    if (preset === 'no-leads') {
      setLeads([]);
      setFormSubmissionsCount(0);
      setToastMessage('Switched to Scenario 1: No Leads (Default initial state).');
    } else if (preset === 'zero-conversions') {
      setLeads(createMockLeads(12, 0));
      setFormSubmissionsCount(0);
      setToastMessage('Switched to Scenario 2: Zero Conversions (12 leads, 0 won).');
    } else if (preset === 'active-conversions') {
      setLeads(createMockLeads(12, 3));
      setFormSubmissionsCount(3);
      setToastMessage('Switched to Scenario 3: Active Conversions (12 leads, 3 won = 25%).');
    }
  };

  // Add new lead from the modal
  const handleSaveLead = (newLeadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
    setToastMessage(`Lead "${newLead.fullName}" added successfully! Total leads is now ${leads.length + 1}.`);
  };

  // Quick action from demo bar: add 1 mock lead
  const handleQuickAddLead = () => {
    const newLead: Lead = {
      id: `quick-${Date.now()}`,
      fullName: `Direct Lead #${leads.length + 1}`,
      email: `lead${leads.length + 1}@leadzam.io`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    setToastMessage(`Added +1 lead. Total leads: ${leads.length + 1}.`);
  };

  // Quick action from demo bar: convert 1 lead to won
  const handleToggleWinLead = () => {
    if (leads.length === 0) return;
    const unwonIndex = leads.findIndex((l) => l.status !== 'won');
    if (unwonIndex !== -1) {
      setLeads((prev) => {
        const next = [...prev];
        next[unwonIndex] = { ...next[unwonIndex], status: 'won' };
        return next;
      });
      const wonTotal = leads.filter((l) => l.status === 'won').length + 1;
      setToastMessage(`Converted a lead to Won! (${wonTotal} of ${leads.length} won).`);
    } else {
      setToastMessage('All existing leads are already marked as Won.');
    }
  };

  // Reset to initial baseline
  const handleReset = () => {
    setCurrentPreset('no-leads');
    setLeads([]);
    setFormSubmissionsCount(0);
    setToastMessage('Reset to initial state: 0 leads, conversion rate unavailable.');
  };

  const wonCount = leads.filter((l) => l.status === 'won').length;

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col font-sans">
      {/* Reviewer / Evaluation Banner for scenario demonstration */}
      <DemoControls
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onQuickAddLead={handleQuickAddLead}
        onToggleWinLead={handleToggleWinLead}
        onReset={handleReset}
        totalLeads={leads.length}
        wonLeads={wonCount}
      />

      <div className="flex flex-1 w-full">
        {/* Sidebar Navigation */}
        <Sidebar
          onAddLeadClick={() => setIsAddModalOpen(true)}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onAddLeadClick={() => setIsAddModalOpen(true)}
            isMobileNavOpen={isMobileNavOpen}
            onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
            showMobileAddLeadButton={leads.length === 0}
          />

          <Dashboard
            leads={leads}
            activeFormsCount={activeFormsCount}
            formSubmissionsCount={formSubmissionsCount}
            currentPreset={currentPreset}
            onOpenAddLeadModal={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      {/* Add Lead Dialog Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveLead}
      />

      {/* Floating Status Toast */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
