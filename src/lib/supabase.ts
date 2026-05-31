import { createClient } from '@supabase/supabase-js';
import { ProjectInquiry } from '../types';

// Read values from environment
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Check configuration status
const isLiveSupabase = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-key'
);

export const supabase = isLiveSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const databaseMode = isLiveSupabase ? 'live' : 'simulated';

// Robust local simulation engine
const LOCAL_STORAGE_KEY = 'mwesigwaali_inquiries';

const getLocalInquiries = (): ProjectInquiry[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    // Populate standard initial seed inquiries representing real historical Ugandian projects
    const seed: ProjectInquiry[] = [
      {
        id: 'inq_1',
        client_name: 'Ephraim Mukasa',
        client_email: 'mukasa.e@coffee-trade.ug',
        company_name: 'Buganda Coffee Exporters',
        project_type: 'mobile',
        budget_range: '$5,000 - $10,000',
        timeline: '3 Months',
        description: 'Need a mobile app for coffee farmers to log harvest loads, track market index indices, and integrate mobile money payments.',
        selected_tech: ['React Native', 'Node.js', 'NestJS', 'PostgreSQL'],
        status: 'reviewing',
        created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      },
      {
        id: 'inq_2',
        client_name: 'Florence Atim',
        client_email: 'atim.f@kampalamarket.org',
        company_name: 'Kampala Agro-Hub',
        project_type: 'web',
        budget_range: '$10,000 - $25,000',
        timeline: '4 - 6 Months',
        description: 'Bespoke web dashboard tracking vendor listings, marketplace pricing index, and Django backend integration.',
        selected_tech: ['React Vite', 'Django', 'PostgreSQL'],
        status: 'contacted',
        created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
      },
       {
        id: 'inq_3',
        client_name: 'Moses Ssenyonga',
        client_email: 'moses@m-health.co.ug',
        company_name: 'Uganda Digital Health Labs',
        project_type: 'ai',
        budget_range: '$25,000+',
        timeline: '6+ Months',
        description: 'Implementing an offline-first mobile and desktop application that parses local medical records using localized AI models (NestJS and Python AI pipeline) to predict clinical referrals.',
        selected_tech: ['React Native', 'Express.js', 'PyTorch', 'Django'],
        status: 'new',
        created_at: new Date().toISOString(),
      }
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(data);
};

export const getInquiries = async (): Promise<ProjectInquiry[]> => {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.warn('Supabase read error, falling back to local simulation:', error.message);
        return getLocalInquiries();
      }
      return data || [];
    } catch (e) {
      console.warn('Supabase connect failed, falling back to local simulation:', e);
      return getLocalInquiries();
    }
  } else {
    return getLocalInquiries();
  }
};

export const submitInquiry = async (inquiry: Omit<ProjectInquiry, 'id' | 'created_at' | 'status'>): Promise<ProjectInquiry> => {
  const newInquiry: ProjectInquiry = {
    ...inquiry,
    id: 'inq_' + Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    status: 'new',
  };

  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([newInquiry])
        .select();
      if (error) {
        console.warn('Supabase insert failed, saving locally:', error.message);
        // Fallback to local
        const current = getLocalInquiries();
        current.unshift(newInquiry);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
        return newInquiry;
      }
      return data && data[0] ? data[0] : newInquiry;
    } catch (e) {
      console.warn('Supabase exception, saving locally:', e);
      const current = getLocalInquiries();
      current.unshift(newInquiry);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      return newInquiry;
    }
  } else {
    const current = getLocalInquiries();
    current.unshift(newInquiry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    return newInquiry;
  }
};
