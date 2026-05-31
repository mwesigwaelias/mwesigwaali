import React, { useState, useEffect } from 'react';
import { Database, Calendar, Smartphone, Layers, RefreshCw, Sparkles, Filter, ExternalLink, HelpCircle, Loader2 } from 'lucide-react';
import { getInquiries, databaseMode } from '../lib/supabase';
import { ProjectInquiry } from '../types';

interface AdminLogViewerProps {
  reloadTrigger: number;
}

export default function AdminLogViewer({ reloadTrigger }: AdminLogViewerProps) {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const isLive = databaseMode === 'live';

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Error loading ledger logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [reloadTrigger]);

  const filteredInquiries = inquiries.filter((inq) => {
    // 1. Project type filter
    if (filterType !== 'all' && inq.project_type !== filterType) {
      return false;
    }
    // 2. Search term match
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = inq.client_name.toLowerCase().includes(term);
      const matchEmail = inq.client_email.toLowerCase().includes(term);
      const matchDesc = inq.description.toLowerCase().includes(term);
      const matchCompany = inq.company_name?.toLowerCase().includes(term) || false;
      return matchName || matchEmail || matchDesc || matchCompany;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-[#070b14] text-slate-100 font-sans">
      
      {/* Title */}
      <div className="mb-8 text-center flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5">
        <div className="text-left">
          <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Database className="h-6 w-6 text-amber-400" />
            Inquiry Ledger <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Registry Log</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Real-time spreadsheet displaying incoming software proposals fetched directly from Supabase database.
          </p>
        </div>
        
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="mt-4 md:mt-0 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-xs font-mono font-bold tracking-wider uppercase text-white transition disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Database Mode Warning Banner */}
      {!isLive && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-left">
          <h4 className="text-amber-400 font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider font-mono">
            <HelpCircle className="h-4 w-4 animate-bounce shrink-0" />
            Workspace Simulation Active (LocalStorage ledger)
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">
            Mwesigwaali uses double-mode data storage. Right now, because VITE_SUPABASE_URL is not declared inside your environment secrets, we have booted a highly reliable **client side fallback database** in localStorage. Subscribed listings will load here seamlessly.
          </p>
          <div className="mt-3 text-[10px] font-mono text-slate-500">
            To connect your live PostgreSQL Supabase database, set <strong className="text-slate-400">VITE_SUPABASE_URL</strong> and <strong className="text-slate-400">VITE_SUPABASE_ANON_KEY</strong> inside your **Settings &gt; Secrets** panel.
          </div>
        </div>
      )}

      {/* Filter and search bar controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-slate-950/50 p-4 rounded-xl border border-slate-900/80">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Filter proposals by client, email, stack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
        />

        {/* Tab Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto py-0.5">
          <Filter className="h-3.5 w-3.5 text-slate-500 shrink-0 hidden sm:inline" />
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web' },
            { id: 'mobile', label: 'Mobile' },
            { id: 'desktop', label: 'Desktop' },
            { id: 'ai', label: 'AI Pipeline' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold transition ${
                filterType === item.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            Querying Mwesigwaali datastores...
          </p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-slate-850 p-10 bg-slate-900/5">
          <Database className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-white tracking-tight">
            No inquiry matching filters found
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            Configure baseline items inside our **Bespoke Estimator** tab and submit a software proposal to register your initial PostgreSQL rows.
          </p>
        </div>
      ) : (
        /* Spreadsheet Tabular Layout grid */
        <div className="overflow-x-auto rounded-xl border border-slate-850 bg-[#070b13] shadow-md">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 select-none uppercase tracking-wider font-mono text-[10px]">
                <th className="p-4 font-bold">Client Information</th>
                <th className="p-4 font-bold">Pipeline Model</th>
                <th className="p-4 font-bold">Calculated Budget / Timeline</th>
                <th className="p-4 font-bold">Selected Architecture Frameworks</th>
                <th className="p-4 font-bold">Objectives Description</th>
                <th className="p-4 font-bold">Registry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredInquiries.map((inq) => {
                let badgeClass = 'bg-slate-800 text-slate-300';
                if (inq.project_type === 'ai') badgeClass = 'bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-500/20';
                if (inq.project_type === 'mobile') badgeClass = 'bg-[#00e1d9]/10 text-[#00e1d9] border border-[#00e1d9]/20';
                if (inq.project_type === 'web') badgeClass = 'bg-amber-950/20 text-amber-400 border border-amber-500/20';

                return (
                  <tr key={inq.id} className="hover:bg-slate-900/40 transition">
                    {/* Client Info */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-white leading-normal truncate max-w-[170px]">{inq.client_name}</div>
                      <div className="font-mono text-[10px] text-slate-500 truncate max-w-[170px]">{inq.client_email}</div>
                      {inq.company_name && (
                        <div className="text-[10px] text-slate-400 italic truncate max-w-[170px] mt-0.5">{inq.company_name}</div>
                      )}
                    </td>
                    
                    {/* Pipeline Model type */}
                    <td className="p-4 align-top">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${badgeClass}`}>
                        {inq.project_type}
                      </span>
                    </td>

                    {/* Calculated budget */}
                    <td className="p-4 align-top">
                      <div className="font-mono font-bold text-emerald-400 text-xs">{inq.budget_range}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{inq.timeline || '3 Months'}</div>
                    </td>

                    {/* Tech selected */}
                    <td className="p-4 align-top">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {inq.selected_tech.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[9px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="p-4 align-top max-w-[280px]">
                      <p className="text-xs text-slate-300 leading-normal line-clamp-3" title={inq.description}>
                        {inq.description}
                      </p>
                    </td>

                    {/* Timestamp */}
                    <td className="p-4 align-top font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="h-3 w-3 text-slate-600" />
                        <span>{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Database Schema Guide details */}
      <div className="mt-12 rounded-2xl border border-slate-900 bg-slate-950/80 p-6 text-left">
        <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Technical Schema Reference (Supabase PostgreSQL Table setup)
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          To host this ledger on your personal backend, paste this schema configuration directly inside your Supabase SQL editor panel:
        </p>
        <div className="p-4 rounded-xl bg-[#0c0d15] border border-slate-900 font-mono text-[10.5px] leading-relaxed text-amber-300 overflow-x-auto select-all">
          <pre>
{`CREATE TABLE contact_inquiries (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT,
  selected_tech TEXT[] NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);`}
          </pre>
        </div>
      </div>

    </div>
  );
}
