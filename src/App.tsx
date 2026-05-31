import React, { useState } from 'react';
import Header from './components/Header';
import ServicesOverview from './components/ServicesOverview';
import TechnologySandbox from './components/TechnologySandbox';
import BespokeEstimator from './components/BespokeEstimator';
import AIConsultantChat from './components/AIConsultantChat';
import AdminLogViewer from './components/AdminLogViewer';
import MwesigwaLogo from './components/MwesigwaLogo';
import { Sparkles, MapPin, Coffee, Code2, Globe, Mail, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('services');
  const [suggestionTech, setSuggestionTech] = useState<string | undefined>(undefined);
  const [customAgentPrompt, setCustomAgentPrompt] = useState<string | undefined>(undefined);
  const [reloadLedgerTrigger, setReloadLedgerTrigger] = useState<number>(0);

  // Callback when user wants to inquire with a specific tech from Sandbox page
  const handleInquireWithTech = (techName: string) => {
    setSuggestionTech(techName);
    setActiveTab('estimator');
  };

  // Callback when cost estimator succeeds, notifies ledger view to sync PostgreSQL
  const handleEstimatorSuccess = () => {
    setReloadLedgerTrigger((prev) => prev + 1);
  };

  // Callback when user requests deeper solution advisor dialogs on an estimate proposal
  const handleConsultAgent = (promptText: string) => {
    setCustomAgentPrompt(promptText);
    setActiveTab('ai-chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Absolute background visual ambient glow dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/10 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Global Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary Page layout Container */}
      <main className="flex-grow z-10">
        {activeTab === 'services' && (
          <ServicesOverview onSelectServiceTab={(tabId) => setActiveTab(tabId)} />
        )}
        
        {activeTab === 'sandbox' && (
          <TechnologySandbox onSuggestInquire={handleInquireWithTech} />
        )}

        {activeTab === 'estimator' && (
          <BespokeEstimator
            initialTech={suggestionTech}
            onInquirySubmitted={handleEstimatorSuccess}
            onConsultAgent={handleConsultAgent}
          />
        )}

        {activeTab === 'ai-chat' && (
          <AIConsultantChat
            customMessagePrompt={customAgentPrompt}
            clearedPromptTrigger={() => setCustomAgentPrompt(undefined)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminLogViewer reloadTrigger={reloadLedgerTrigger} />
        )}
      </main>

      {/* Premium Footer */}
      <footer className="z-10 border-t border-slate-200 bg-slate-100 py-12 text-slate-500 text-sm text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MwesigwaLogo size={32} />
              <span className="font-sans font-bold text-slate-800 tracking-wide">Mwesigwaali</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              High-fidelity bespoke software engineering based in Kampala, Uganda. Developing Android/iOS apps, Desktop app, Web apps, Websites. Frontend with React JS, Next JS, React native, and backends Django suites, NestJS networks, ASP.NET backends, and agricultural visual prediction modules.
            </p>
          </div>

          {/* Col 2: Services shortcuts */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-4">
              Our Capabilities
            </h4>
            <ul className="space-y-2 font-sans text-slate-600">
              <li>• Cross-Platform Mobile Apps</li>
              <li>• Web Application</li>
              <li>• Websites</li>
              <li>• Django Machine Learning models</li>
              <li>• High-Performance ASP.NET Core</li>
            </ul>
          </div>

          {/* Col 3: Tech Hub details */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
              Engineering Office
            </h4>
            <ul className="space-y-2 text-slate-600 font-sans">
              <li className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>Kampala, Uganda (East Africa)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <a href="mailto:mwesigwaali@gmail.com" className="hover:text-amber-800 transition font-medium">mwesigwaali@gmail.com</a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <a href="tel:+256787820883" className="hover:text-emerald-800 transition font-mono">+256 787 820 883</a>
              </li>

              <li className="flex items-center gap-1.5">
                <Coffee className="h-3.5 w-3.5 text-red-600 shrink-0" />
                <span>Uganda Premium Coffee Fuelled ☕</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Supabase/GitHub status */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
              Database Sync
            </h4>
            <p className="leading-relaxed text-slate-600 mb-3">
              Integrating a relational Postgres backend, Mysql and NoSQL with ManoDB with Node JS, NestJS, Django, ASP.NET.
            </p>
            <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-teal-50 border border-teal-200 font-mono text-[10px] text-teal-800">
              <Code2 className="h-3 w-3" />
              <span>CI/CD ACTIONS: CONFIGURED</span>
            </div>
          </div>

        </div>

        {/* Legal area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Mwesigwaali. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Kampala Tech Code SLA</span>
            <span>Premium Bespoke Engineering Center</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
