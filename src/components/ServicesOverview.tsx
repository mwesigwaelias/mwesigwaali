import React from 'react';
import { SERVICES_CATALOG } from '../data';
import { ArrowRight, Smartphone, Layers, Cpu, Sparkles, MapPin, Award, Users, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mobile: Smartphone,
  web: Layers,
  desktop: Cpu,
  ai: Sparkles,
};

interface ServicesOverviewProps {
  onSelectServiceTab: (tabId: string) => void;
}

export default function ServicesOverview({ onSelectServiceTab }: ServicesOverviewProps) {
  
  const companyHighlights = [
    { label: 'Core Kampala Team', value: '15+ Craftspersons', icon: Users, desc: 'Highly skilled local engineers with globally certified capabilities.' },
    { label: 'Successful Launches', value: '45+ Solutions', icon: CheckCircle, desc: 'Scaling across agribusiness, fintech, digital portals, and logistics.' },
    { label: 'Uganda Innovation Hub', value: 'Kampala, Uganda', icon: MapPin, desc: 'Strategically located in the tech core of East Africa.' },
    { label: 'Architecture SLA', value: '99.99% Core uptime', icon: Award, desc: 'Enterprise-grade services built with Docker, Django and NestJS.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-transparent text-slate-800 font-sans text-left">
      
      {/* Visual Ambient Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50/70 via-rose-50/30 to-white border border-amber-100 p-8 md:p-12 mb-16 shadow-md shadow-amber-100/10">
        <div className="absolute top-0 right-0 p-8 select-none text-amber-100 pointer-events-none hidden lg:block">
          <Sparkles className="h-56 w-56 stroke-[0.4] translate-x-12 -translate-y-12 rotate-12 opacity-30 animate-pulse text-amber-400" />
        </div>
        
        <div className="max-w-3xl">
          {/* Tag */}
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px] font-bold uppercase tracking-widest mb-6 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping"></span>
            <span>Kampala Tech Pioneers</span>
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Engineering bespoke code that drives Africa’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-red-650 to-amber-700">innovative future</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Mwesigwaali is a premier software engineering house based in **Kampala, Uganda**. We combine high-speed React web frames, decorator-driven NestJS APIs, secure ASP.NET enterprise systems, robust Django pipelines, and localized artificial intelligence models to solve real-world problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onSelectServiceTab('estimator')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 font-bold text-xs uppercase tracking-wider font-mono text-white hover:scale-103 transition cursor-pointer shadow-lg shadow-amber-600/10 flex items-center space-x-2"
            >
              <span>Build Project Cost Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onSelectServiceTab('ai-chat')}
              className="px-6 py-3 rounded-xl border border-slate-205 hover:border-slate-300 bg-white hover:bg-slate-50 font-bold text-xs uppercase tracking-wider font-mono text-slate-700 hover:text-slate-900 transition shadow-sm cursor-pointer"
            >
              Consult Solutions Architect
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-16">
        <div className="mb-8 select-none">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            Our Architectural Specialities
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            We deliver highly optimized software blueprints targeting diverse operating fields. Each build incorporates client-driven databases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_CATALOG.map((serv) => {
            const Icon = iconMap[serv.id] || Sparkles;
            return (
              <div
                key={serv.id}
                className="group p-6 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/60 hover:border-amber-400/40 hover:shadow-md hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-100 text-amber-600 group-hover:text-red-600 group-hover:bg-red-50 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-amber-800 bg-amber-50 border border-amber-200/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {serv.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-amber-800 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {serv.description}
                  </p>
                </div>

                <div>
                  <div className="border-t border-slate-100 pt-4 mb-4 flex flex-wrap gap-1">
                    {serv.techs.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[9px] hover:bg-slate-200 transition">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectServiceTab('estimator')}
                    className="text-xs font-mono font-bold uppercase tracking-wide text-amber-700 hover:text-amber-900 flex items-center space-x-1"
                  >
                    <span>Configure model</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Innovation team highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-slate-200">
        {companyHighlights.map((high, idx) => {
          const Icon = high.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-white text-left shadow-sm shadow-slate-100/50">
              <div className="p-2 w-fit rounded-lg bg-amber-50 text-amber-600 mb-3">
                <Icon className="h-4 w-4" />
              </div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                {high.label}
              </div>
              <div className="font-sans text-base font-extrabold text-slate-900 mt-1">
                {high.value}
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {high.desc}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
