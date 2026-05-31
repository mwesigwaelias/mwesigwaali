import React, { useState } from 'react';
import { Cpu, Code2, Server, Database, Terminal, Smartphone, Brain, Play, Check, TerminalSquare } from 'lucide-react';
import { MWESIGWAALI_TECHS } from '../data';
import { Technology } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Code2,
  Server,
  Database,
  Terminal,
  Smartphone,
  Brain
};

interface TechnologySandboxProps {
  onSuggestInquire: (tech: string) => void;
}

export default function TechnologySandbox({ onSuggestInquire }: TechnologySandboxProps) {
  const [selectedTech, setSelectedTech] = useState<Technology>(MWESIGWAALI_TECHS[0]);
  const [filter, setFilter] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string[]>([]);

  const filteredTechs = MWESIGWAALI_TECHS.filter((tech) => {
    if (filter === 'all') return true;
    return tech.category === filter;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = (tech: Technology) => {
    setIsRunningSim(true);
    setSimOutput([
      `[info] mwesigwaali-hub-agent: connecting to uganda-server-node-1...`,
      `[info] docker: spawning microservice thread [${tech.id}]...`,
      `[loader] loading tech assemblies: ${tech.languages.join(', ')}...`
    ]);

    setTimeout(() => {
      setSimOutput((prev) => [
        ...prev,
        `[builder] successfully verified standard syntax schemas`,
        `[runner] initializing process engine in Kampalian subnet...`
      ]);
    }, 800);

    setTimeout(() => {
      setSimOutput((prev) => [
        ...prev,
        `[success] API endpoint is listening on local port 3000 ✔`,
        `[success] Mwesigwaali core compiled in 410ms. All services operational! 🚀`
      ]);
      setIsRunningSim(false);
    }, 1600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-transparent text-slate-800">
      
      {/* Tab-like Title */}
      <div className="mb-10 text-center">
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">Tech Stack Sandbox</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 font-sans">
          Mwesigwaali utilizes a highly tailored, modernized stack targeting ultra-scalable full-stack, desktop, and AI pipelines. Click any asset below to spin up a developer workspace simulation.
        </p>
      </div>

      {/* Filter Categories Menu */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-slate-200 pb-6">
        {[
          { id: 'all', label: 'All Tech' },
          { id: 'frontend', label: 'Frontend Engine' },
          { id: 'backend', label: 'Enterprise API Nodes' },
          { id: 'mobile', label: 'Mobile Architectures' },
          { id: 'ai-devops', label: 'AI & Devops Suite' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setFilter(cat.id);
              // reset selection to first matching tech
              const found = MWESIGWAALI_TECHS.find((t) => cat.id === 'all' || t.category === cat.id);
              if (found) setSelectedTech(found);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all border ${
              filter === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-red-650 text-white border-transparent shadow shadow-amber-600/10'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Modular Navigation Cards list of Technologies */}
        <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          {filteredTechs.map((tech) => {
            const IconComponent = iconMap[tech.logo] || Code2;
            const isSelected = selectedTech.id === tech.id;
            return (
              <div
                key={tech.id}
                onClick={() => {
                  setSelectedTech(tech);
                  setSimOutput([]);
                }}
                className={`group p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-l from-slate-50 to-amber-50/50 border-amber-400 shadow-sm shadow-slate-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-lg transition-colors ${
                    isSelected ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500 group-hover:text-amber-800 group-hover:bg-amber-50/50'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-amber-900 tracking-tight truncate m-0">
                        {tech.name}
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#0d9488]">
                        {tech.languages[0]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-550 leading-relaxed line-clamp-2">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Virtual IDE and Capabilities Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main IDE Terminal Emulator */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {/* Window chrome header */}
            <div className="flex items-center justify-between bg-slate-100 px-4 py-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-450 bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-450 bg-amber-450 bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-450 bg-emerald-400" />
                <span className="pl-2 font-mono text-xs text-slate-500 select-none flex items-center gap-1.5">
                  <TerminalSquare className="h-3.5 w-3.5 text-amber-600" />
                  mwesigwa_prototype_{selectedTech.id}.ts
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyCode(selectedTech.proCode)}
                  className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-705 text-slate-700 font-mono text-[10px] uppercase tracking-wider font-bold transition border border-slate-200 flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy Snippet</span>
                  )}
                </button>
                <button
                  onClick={() => runSimulation(selectedTech)}
                  disabled={isRunningSim}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-[10px] uppercase tracking-wider font-bold transition flex items-center space-x-1 disabled:opacity-60 cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-slate-950" />
                  <span>{isRunningSim ? 'Compiling...' : 'Run Stack'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Editor Content */}
            <div className="p-4 font-mono text-xs overflow-x-auto select-text leading-relaxed bg-slate-900 border-b border-slate-800">
              <pre className="text-amber-200">
                <code>{selectedTech.proCode}</code>
              </pre>
            </div>

            {/* Interactive Sandbox Console Log Area */}
            {(simOutput.length > 0 || isRunningSim) && (
              <div className="bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-300 max-h-[160px] overflow-y-auto">
                <div className="text-slate-500 uppercase font-bold text-[9px] tracking-wider mb-2 select-none">
                  Kampala Compiler logs:
                </div>
                {simOutput.map((log, idx) => {
                  let textClass = 'text-slate-400';
                  if (log.includes('✔') || log.includes('🚀')) textClass = 'text-teal-400 font-bold';
                  if (log.includes('[loader]')) textClass = 'text-slate-500';
                  return (
                    <div key={idx} className={textClass}>
                      {log}
                    </div>
                  );
                })}
                {isRunningSim && (
                  <span className="inline-block h-3.5 w-1.5 bg-amber-500 animate-pulse ml-0.5" />
                )}
              </div>
            )}
          </div>

          {/* Technology Specifications Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-xl border border-slate-205 border-slate-200 bg-white text-left shadow-sm">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-700">
                Architectural Features
              </h4>
              <ul className="mt-3 space-y-2 text-slate-650 text-slate-650 text-slate-600 font-sans text-xs">
                {selectedTech.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white text-left flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-teal-800">
                  Integrations ecosystem
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-510 text-slate-500 font-sans">
                  Compiled natively to deploy on premium Linux architectures, including instant integration to secure PostgreSQL backends and automated webhook dispatches.
                </p>
              </div>
              <button
                onClick={() => onSuggestInquire(selectedTech.name)}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-950 text-xs font-mono font-bold tracking-wider uppercase text-white transition text-center cursor-pointer shadow-sm"
              >
                Inquire With {selectedTech.name}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
