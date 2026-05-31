import React, { useState, useMemo } from 'react';
import { Layers, Database, Sparkles, Smartphone, ShieldAlert, Cpu, ArrowRight, Loader2, ArrowLeft, CheckCircle2, ListChecks } from 'lucide-react';
import { submitInquiry } from '../lib/supabase';
import { ProjectInquiry } from '../types';

interface BespokeEstimatorProps {
  initialTech?: string;
  onInquirySubmitted: () => void;
  onConsultAgent: (message: string) => void;
}

export default function BespokeEstimator({ initialTech, onInquirySubmitted, onConsultAgent }: BespokeEstimatorProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // Active estimation state
  const [projectType, setProjectType] = useState<'mobile' | 'web' | 'desktop' | 'ai' | 'full-stack'>('web');
  const [selectedTech, setSelectedTech] = useState<string[]>(initialTech ? [initialTech] : ['React + Vite', 'Supabase']);
  const [integrations, setIntegrations] = useState<string[]>([]);
  
  // Field values
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('3 Months');

  const platforms = [
    { id: 'web', label: 'Enterprise Web Platform', basePrice: 500, icon: Layers, desc: 'Responsive SaaS portal built with React Vite and modular dashboards.' },
    { id: 'mobile', label: 'Native Mobile Workspace', basePrice: 700, icon: Smartphone, desc: 'Flutter or React Native cross-platform app compiled for iOS & Android.' },
    { id: 'desktop', label: 'Bespoke Desktop Client', basePrice: 700, icon: Cpu, desc: 'Offline-capable administrative client built with C#/.NET or Flutter Desktop.' },
    { id: 'ai', label: 'AI Prediction Pipeline', basePrice: 1000, icon: Sparkles, desc: 'Neural networks, PyTorch engines, computer vision crop analysis or custom LLM grounding.' },
  ];

  const integrationOptions = [
    { id: 'mobile_money', label: 'MTN & Airtel Mobile Money Integrations', price: 1000, desc: 'Secure webhook callbacks handles local transaction registries.' },
    { id: 'auth_jwt', label: 'Multi-Role JWT Auth & Auditing', price: 800, desc: 'Strict identity permissions guards enterprise dashboard pages.' },
    { id: 'supabase_realtime', label: 'Supabase Real-time Sync', price: 500, desc: 'No-delay updates across client device networks using WebSockets.' },
    { id: 'custom_vision', label: 'Computer Vision Core Models', price: 500, desc: 'PyTorch leaf defect detection or customized prediction indexes.' },
    { id: 'reporting_pdf', label: 'Automated Document & PDF Generator', price: 500, desc: 'Transactional load sheets and exportable spreadsheets.' },
  ];

  const techStackOptions = [
    'React + Vite', 'Express + Node', 'NestJS Engine', 'Django Suite', 'ASP.NET Core', 'Supabase', 'Flutter & Native Mobile', 'Artificial Intelligence SDKs'
  ];

  // Calculations
  const calculatedEstimate = useMemo(() => {
    const matchedPlatform = platforms.find((p) => p.id === projectType);
    const platformPrice = matchedPlatform ? matchedPlatform.basePrice : 1000;
    
    // Sum integration costs
    const integrationsPrice = integrations.reduce((sum, item) => {
      const option = integrationOptions.find((o) => o.id === item);
      return sum + (option ? option.price : 0);
    }, 0);

    const total = platformPrice + integrationsPrice;
    
    // Standard UGX mapping (rate ~ 3750 UGX per USD for East-Africa context)
    const ugxEst = total * 3740;

    return {
      usd: total,
      ugx: ugxEst,
      days: Math.round(total / 80) + 14 // standard effort metric
    };
  }, [projectType, integrations]);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleTech = (techName: string) => {
    setSelectedTech((prev) =>
      prev.includes(techName) ? prev.filter((t) => t !== techName) : [...prev, techName]
    );
  };

  const currentSelectionDetails = useMemo(() => {
    let text = `Enterprise software estimate: ${projectType.toUpperCase()} architecture using ${selectedTech.join(', ')}. `;
    if (integrations.length > 0) {
      text += `Required modules: ${integrations.map(i => integrationOptions.find(o => o.id === i)?.label).join(', ')}.`;
    }
    return text;
  }, [projectType, selectedTech, integrations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !description) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setLoading(true);

    const inquiryDraft: Omit<ProjectInquiry, 'id' | 'created_at' | 'status'> = {
      client_name: clientName,
      client_email: clientEmail,
      company_name: companyName || 'Bespoke Client',
      project_type: projectType,
      budget_range: `$${calculatedEstimate.usd.toLocaleString()} USD (~ UGX ${Math.round(calculatedEstimate.ugx / 1000).toLocaleString()}k)`,
      timeline: `${timeline} (Approx. ${calculatedEstimate.days} working days)`,
      description: `${description}\n\n[SYSTEM DESIGN BLUEPRINT]\n${currentSelectionDetails}`,
      selected_tech: selectedTech,
    };

    try {
      await submitInquiry(inquiryDraft);
      setSubmitted(true);
      onInquirySubmitted();
    } catch (err) {
      console.error('Failed submitting project blueprint:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerAIChatConsult = () => {
    const customPromptPrompt = `Hello Elias! I just computed a software cost estimation on your Bespoke Estimator. 
Here are my specs:
- Service Platform: ${projectType.toUpperCase()}
- Tech Stack chosen: ${selectedTech.join(', ')}
- Budget calculated: $${calculatedEstimate.usd.toLocaleString()} USD (approx ${calculatedEstimate.days} working days)
- Integrations: ${integrations.join(', ')}

Please review this deployment design, advise me on the choice of NestJS vs Django or ASP.NET based on these components, and outline how your team based in Kampala, Uganda will help construct this!`;
    onConsultAgent(customPromptPrompt);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-transparent text-slate-800 font-sans">
      
      {/* Title */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Bespoke <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-650">Project Planner & Estimator</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-650 leading-relaxed font-sans">
          Configure baseline platform nodes and select technical packages in real-time. Our dynamic engine forecasts deployment efforts, budget models, and cloud architectural components.
        </p>
      </div>

      {submitted ? (
        // Success complete UI
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-md font-sans">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Proposal Blueprint Dispatched successfully!
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed font-sans">
            Mambo sasa! Your project blueprint has been compiled and saved securely on our **Supabase integration ledger**. Our elite technical engineers in Kampala, Uganda will review the pipeline components. For direct inquiry, contact Elias Mwesigwa at **mwesigwaali@gmail.com** or call **+256 787 820 883**.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-205 border-slate-200 text-left font-sans">
            <h4 className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              Generated Ledger Details:
            </h4>
            <div className="space-y-1.5 text-xs font-mono text-slate-600">
              <div><span className="text-slate-400">Client:</span> {clientName} ({clientEmail})</div>
              <div><span className="text-slate-400">Design Model:</span> {projectType.toUpperCase()} Pipeline</div>
              <div><span className="text-slate-400">Estimated Budget:</span> ${calculatedEstimate.usd.toLocaleString()} USD</div>
              <div><span className="text-slate-400">Calculated Dev Effort:</span> ~{calculatedEstimate.days} working days</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-205 border-slate-200 bg-white hover:bg-slate-50 font-mono text-xs font-bold uppercase tracking-wider text-slate-705 text-slate-700 transition cursor-pointer"
            >
              Configure Another Node
            </button>
            <button
              onClick={triggerAIChatConsult}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-red-650 hover:scale-103 font-mono text-xs font-bold uppercase tracking-wider text-white transition shadow-sm cursor-pointer"
            >
              Discuss With Virtual AI Advisor
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Modular Form configuration (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1 last:flex-initial">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold border transition ${
                    step === s
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm shadow-amber-500/10'
                      : step > s
                      ? 'bg-slate-50 border-slate-200 text-emerald-600 font-bold'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`h-0.5 flex-1 mx-2 ${
                      step > s ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1: Platform Foundation */}
            {step === 1 && (
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Step 1: Choose Your Core Platform Platform
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select the operational environment targeting your user market context.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((plat) => {
                    const Icon = plat.icon;
                    const isSelected = projectType === plat.id;
                    return (
                      <div
                        key={plat.id}
                        onClick={() => setProjectType(plat.id as any)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50/40 border-amber-400 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2 w-fit rounded-lg mb-3 ${
                          isSelected ? 'bg-amber-100 text-amber-850' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1.5">{plat.label}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">{plat.desc}</p>
                        <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest">
                          Starts at ${plat.basePrice.toLocaleString()} USD
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Next step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Custom Integrations Ecosystem */}
            {step === 2 && (
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Step 2: Core Stack & Extended Modules
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Integrate local mobile money endpoints and high-volume background transactional models.
                  </p>
                </div>

                {/* Tech stack checkboxes */}
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Select Your Preferred Frameworks (Multi-Select)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {techStackOptions.map((tech) => {
                      const isSelected = selectedTech.includes(tech);
                      return (
                        <div
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`px-3 py-2.5 rounded-lg border text-center font-mono text-[10px] cursor-pointer transition select-none truncate ${
                            isSelected
                              ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
                          }`}
                        >
                          {tech}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Integrations checklist */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Select Operational Modules
                  </span>
                  <div className="space-y-2.5">
                    {integrationOptions.map((opt) => {
                      const isSelected = integrations.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleIntegration(opt.id)}
                          className={`flex items-start space-x-3.5 p-3.5 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'bg-slate-50 border-amber-400 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="mt-0.5 rounded border-slate-300 bg-white text-amber-500 focus:ring-amber-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h5 className="text-xs font-semibold text-slate-900">{opt.label}</h5>
                              <span className="font-mono text-xs text-emerald-700 font-bold ml-2">
                                +${opt.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{opt.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Next step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Dispatch Specs */}
            {step === 3 && (
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Step 3: Business Scope & Timeline Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Help us customize the software lifecycle mapping.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 tracking-widest mb-1.5 font-mono">
                        Organization / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Buganda Exports Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 tracking-widest mb-1.5 font-mono">
                        Target Timeline Goal
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="1 Month">1 Month (Urgent Prototype)</option>
                        <option value="3 Months">3 Months (Standard Production Cycle)</option>
                        <option value="4 - 6 Months">4 - 6 Months (Enterprise Framework)</option>
                        <option value="6+ Months">6+ Months (Robust Multi-Tenant setup)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 tracking-widest mb-1.5 font-mono">
                      Project Objective & Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please outline your features, user capacity, offline cash targets, leaf disease computer vision specs, etc..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-amber-505 focus:border-amber-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Review Design</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review Ledger Insertion */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Step 4: Contact Ledger Deployment
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide credentials to dispatch and store this architectural estimate securely on Supabase database.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elias Mwesigwa"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-xl border border-slate-205 border-slate-200 bg-white px-4 py-3 text-sm text-slate-805 text-slate-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. mwesigwaali@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-205 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-205 border-amber-200 bg-amber-50/50 text-slate-700 text-xs leading-relaxed space-y-2">
                  <div className="flex items-center space-x-2 text-amber-800 font-bold mb-1 font-mono">
                    <ListChecks className="h-4 w-4" />
                    <span>Selected Pipeline Blueprint summary</span>
                  </div>
                  <div>• Foundation: <span className="text-slate-900 font-bold">{platforms.find(p => p.id === projectType)?.label}</span></div>
                  <div>• Tech Stack Integrators: <span className="text-slate-900 font-mono text-[10px]">{selectedTech.join(' | ')}</span></div>
                  <div>• Service Extensions: <span className="text-slate-900">{integrations.length > 0 ? integrations.map(i => integrationOptions.find(o => o.id === i)?.label).join(', ') : 'None'}</span></div>
                  <div>• Targeted Lifecycle: <span className="text-slate-900 font-bold">{timeline}</span></div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100 font-mono">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-red-650 text-white font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 hover:scale-103 shadow shadow-amber-600/10 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending blueprint...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Submit Blueprint</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Side: Estimated pricing ticker & Architecture block diagram (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Pricing card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-3 select-none text-slate-100 pointer-events-none">
                <Database className="h-16 w-16 stroke-1 rotate-12 opacity-80" />
              </div>
              
              <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                Forecasted Budget (USD)
              </h3>
              <div className="mt-2 flex items-baseline text-slate-900">
                <span className="text-4xl font-extrabold tracking-tight">
                  ${calculatedEstimate.usd.toLocaleString()}
                </span>
                <span className="ml-1 text-sm text-slate-400 font-sans">USD</span>
              </div>

              <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>EST. EFFORT</span>
                <span className="font-bold text-slate-800 uppercase">{calculatedEstimate.days} working days</span>
              </div>

              {/* UGX mapping indicator */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                  Uganda Shillings Equivalent:
                </span>
                <span className="font-sans text-sm font-black text-slate-900 block mt-1">
                  ~ UGX {Math.round(calculatedEstimate.ugx).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                  Calculated using standard local development multipliers
                </span>
              </div>
            </div>

            {/* Dynamic Architecture Node diagram */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
              <h3 className="font-mono text-xs font-bold text-slate-550 text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Deployment Blueprint</span>
                <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider">
                  Live Flow
                </span>
              </h3>

              {/* Flow blocks */}
              <div className="space-y-4">
                
                {/* 1. Client Trigger node */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Input Layer</div>
                    <div className="text-xs font-bold text-slate-850 text-slate-800">Client Portal</div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase">
                    {projectType === 'mobile' ? 'Mobile UI' : 'HTTPS SPA'}
                  </span>
                </div>

                <div className="flex justify-center select-none">
                  <div className="h-4 w-0.5 bg-gradient-to-b from-[#0d9488] to-amber-500 animate-pulse" />
                </div>

                {/* 2. Routing node */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Service dispatch API</div>
                    <div className="text-xs font-bold text-slate-700">
                      {selectedTech.includes('NestJS Engine') ? 'NestJS Controller' : selectedTech.includes('Django Suite') ? 'Django Viewset' : selectedTech.includes('ASP.NET Core') ? 'C# Controller' : 'Express/Vite Server'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase">
                    {selectedTech.includes('Django Suite') ? 'Django' : selectedTech.includes('ASP.NET Core') ? '.NET Core' : 'Node.js'}
                  </span>
                </div>

                <div className="flex justify-center select-none">
                  <div className="h-4 w-0.5 bg-gradient-to-b from-amber-500 to-red-500 animate-pulse" />
                </div>

                {/* 3. Database Layer node */}
                <div className="p-3 rounded-xl border border-teal-200 bg-teal-50/50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-teal-600 uppercase">Durable ledger</div>
                    <div className="text-xs font-bold text-teal-900 font-semibold">PostgreSQL + Realtime</div>
                  </div>
                  <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded uppercase">
                    Supabase
                  </span>
                </div>

              </div>

              <p className="mt-4 text-[10px] leading-relaxed text-slate-400 font-mono">
                Updating your preferred technologies or base platform foundation automatically reroutes proxy layers and ledger triggers inside this blueprint diagram in real time.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
