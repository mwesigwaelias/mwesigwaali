import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Cpu, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIConsultantChatProps {
  customMessagePrompt?: string;
  clearedPromptTrigger?: () => void;
}

export default function AIConsultantChat({ customMessagePrompt, clearedPromptTrigger }: AIConsultantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `**Mambo sasa!** 👋 I am Elias Mwesigwa, the Chief Solutions Architect and Virtual Representive at **Mwesigwaali**. 

We are dedicated to building high-fidelity multiplatform mobile applications, Django analytics suites, ASP.NET server structures, and offline-capable digital dashboards right here in Kampala, Uganda. 

How can I help you construct or scale your technical pipelines today? Feel free to ask about our local mobile money integrations or choice of database architectures.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt quick triggers
  const promptSuggestions = [
    { text: 'Which Mobile money solutions do you integrate?', label: 'Mobile Money' },
    { text: 'Should I choose NestJS or Django for my API?', label: 'NestJS vs Django' },
    { text: 'How do you build localized AI applications?', label: 'Localized AI' },
    { text: 'What is your standard budget & timeline index?', label: 'Standard Budgets' },
  ];

  useEffect(() => {
    // If a custom prompt was sent from another tab (e.g. estimator template calculation)
    if (customMessagePrompt) {
      setInputText(customMessagePrompt);
      if (clearedPromptTrigger) clearedPromptTrigger();
    }
  }, [customMessagePrompt]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an invalid response');
      }

      const data = await response.json();
      const replyText = data.text || 'I apologize, but we encountered an outage parsing the server-side channel. Please submit an inquiry inside our Estimator register.';
      
      const agentMsg: ChatMessage = {
        id: 'agent_' + Date.now(),
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback message
      const errorMsg: ChatMessage = {
        id: 'error_' + Date.now(),
        sender: 'agent',
        text: `**Virtual Advisor Offline Fallback**
        
My live Gemini connection reported: *"${err.message}"*. 

However, as Mwesigwaali Chief Architect, I can confirm we are actively scaling custom **Django, ASP.NET Core, and mobile money** systems! Please write out your inquiry on the **Bespoke Estimator** tab, which writes database entries to Supabase. This allows us to log and process details securely. See you there!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Safe client side custom markdown inline printer to convert **text** to bold and format code logs/bullet list line-items
  const formatMessageText = (rawMessageText: string) => {
    const lines = rawMessageText.split('\n');
    return lines.map((line, key) => {
      let content: React.ReactNode = line;

      // Handle raw bullet logs
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const sliced = line.substring(2);
        content = (
          <span className="flex items-start space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>{parseBolds(sliced)}</span>
          </span>
        );
        return <div key={key} className="py-0.5 pl-1">{content}</div>;
      }

      // Handle bold formats
      content = parseBolds(line);

      return (
        <div key={key} className="min-h-[1rem] leading-relaxed">
          {content}
        </div>
      );
    });
  };

  const parseBolds = (text: string): React.ReactNode => {
    const parts = text.split('**');
    if (parts.length <= 1) return text;
    return parts.map((part, i) => {
      // odd indexes are bolded
      if (i % 2 === 1) {
        return <strong key={i} className="text-white font-extrabold">{part}</strong>;
      }
      return part;
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'agent',
        text: `**Chat Workspace Refreshed!** 👋 Need help choosing? Ask me about **Durable PostgreSQL schemas**, setting up **Mobile Money payments in Uganda**, or designing high-resolution mobile app prototypes.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 bg-[#070b14] text-slate-100">
      
      {/* Title */}
      <div className="mb-8 text-center flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="text-left">
          <h2 className="font-sans text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
            Mwesigwaali <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Virtual Representative</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400 font-sans">
            Consult Elias Mwesigwa, Chief Architect, on mobile pipelines, budget thresholds, or systems scaling.
          </p>
        </div>
        
        <button
          onClick={handleResetChat}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-400 hover:text-slate-300 font-mono text-[10px] uppercase font-bold tracking-wider transition"
          title="Clear session history"
        >
          <RefreshCw className="h-3 w-3" />
          <span className="hidden sm:inline">Reset Workspace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Sugessted consultation tiles (1 column) */}
        <div className="lg:col-span-1 space-y-3 hidden lg:block text-left">
          <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/40">
            <h4 className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Consultation suggestions:
            </h4>
            <div className="space-y-2">
              {promptSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(s.text)}
                  disabled={loading}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 hover:scale-[1.02] text-xs font-sans text-slate-300 transition duration-200 block disabled:opacity-50"
                >
                  <span className="font-bold text-amber-400 block mb-0.5 text-[10px] font-mono tracking-wider uppercase">{s.label}</span>
                  <span className="line-clamp-2">{s.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-900 bg-slate-900/5 text-xs text-slate-500 leading-relaxed font-sans">
            Mwesigwaali Virtual Representative is anchored inside a secure **Gemini 3.5 Flash server instance** to protect secrets and deliver highly specialized local software architectures.
          </div>
        </div>

        {/* Right Side: Primary scrolling terminal chat console (3 columns) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-[#0a0e19] overflow-hidden flex flex-col h-[560px] shadow-2xl relative">
          
          <div className="bg-slate-900/50 p-3.5 border-b border-slate-800/80 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 flex items-center justify-center text-white text-xs font-black">
                  EM
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#0a0e19]"></span>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Elias Mwesigwa</div>
                <div className="text-[10px] font-mono text-slate-500 leading-none">Chief Solutions Architect</div>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-[#00e1d9] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Gemini Powered
            </span>
          </div>

          {/* Scrolling messages viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    isAgent ? 'mr-auto text-left' : 'ml-auto text-right flex-row-reverse space-x-reverse'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div className={`p-2 rounded-full shrink-0 ${
                    isAgent ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isAgent ? <Cpu className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>

                  {/* Bubble Container */}
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-xs font-sans shadow-sm leading-relaxed ${
                      isAgent
                        ? 'bg-slate-900/80 text-slate-200 border border-slate-800 border-l-2 border-l-amber-500 rounded-tl-none'
                        : 'bg-gradient-to-tr from-amber-600 to-amber-500 text-slate-950 font-medium rounded-tr-none'
                    }`}>
                      {formatMessageText(msg.text)}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-wider">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start space-x-3 max-w-[80%] mr-auto">
                <div className="p-2 rounded-full shrink-0 bg-amber-500/10 text-amber-400 animate-spin">
                  <Loader2 className="h-4 w-4" />
                </div>
                <div className="p-3.5 rounded-2xl text-xs font-mono text-slate-400 bg-slate-900/55 rounded-tl-none border border-slate-850 italic">
                  Elias is typing software estimate formulas...
                </div>
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>

          {/* Prompt suggestion strip for mobile views */}
          <div className="lg:hidden flex border-t border-slate-900 bg-slate-950/40 p-2 overflow-x-auto gap-2 scrollbar-none shrink-0 select-none">
            {promptSuggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(s.text)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 text-[10px] font-mono text-slate-300 font-bold shrink-0 uppercase tracking-wider"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Interactive input shelf */}
          <div className="p-3 bg-slate-950 border-t border-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={loading}
                placeholder="Ask about NestJS modules, Airtel gateways, costs, etc..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 font-sans"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="p-3 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition cursor-pointer disabled:opacity-45 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
