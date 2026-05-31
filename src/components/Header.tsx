import React from 'react';
import { Layers, Database, Sparkles, Code2, Cpu, FileText } from 'lucide-react';
import { databaseMode } from '../lib/supabase';
import MwesigwaLogo from './MwesigwaLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const isLive = databaseMode === 'live';

  const menuItems = [
    { id: 'services', label: 'Bespoke Services', icon: Layers },
    { id: 'sandbox', label: 'Tech Stack Sandbox', icon: Code2 },
    { id: 'estimator', label: 'Bespoke Estimator', icon: Cpu },
    { id: 'ai-chat', label: 'Virtual Advisor', icon: Sparkles },
    { id: 'admin', label: 'Inquiry Registry', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('services')}>
          <div className="relative hover:scale-105 transition-all duration-300">
            <MwesigwaLogo size={42} />
            {/* Dynamic visual beacon */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 animate-pulse"></span>
            </span>
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold tracking-tight text-slate-900 m-0">
              Mwesigwaali
            </h1>
            <p className="font-mono text-[10px] tracking-widest text-[#b45309] uppercase font-bold opacity-90">
              Uganda Software Hub
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 to-red-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Database Status and Micro Action */}
        <div className="flex items-center space-x-3">
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono border ${
              isLive
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
            title={
              isLive
                ? 'Fully connected to Supabase live database'
                : 'Running on high-integrity client side LocalStorage database'
            }
          >
            <Database className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">DB:</span>
            <span className="font-bold uppercase tracking-wider">{databaseMode}</span>
          </div>
        </div>

      </div>

      {/* Mobile nav rail for dense mobile viewports */}
      <div className="lg:hidden flex border-t border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide py-2 px-3 space-x-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-all ${
                isActive
                  ? 'text-slate-900 bg-slate-200/80'
                  : 'text-slate-500 hover:text-slate-905 hover:bg-slate-100/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5 text-amber-600" />
              <span>{item.label.split(' ').pop()}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
