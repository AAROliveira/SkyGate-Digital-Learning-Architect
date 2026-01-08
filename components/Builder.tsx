
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Layers, Cpu, GraduationCap, BrainCircuit, Activity } from 'lucide-react';

interface BuilderProps {
  onSubmit: (prompt: string) => void;
}

const Builder: React.FC<BuilderProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const examples = [
    "A business English lesson on 'Successful Salary Negotiations'",
    "Basic React Hooks for Junior Developers",
    "How to prepare a perfect Neapolitan Pizza",
    "Crisis management protocols for corporate HR"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-200 overflow-x-hidden">
      <nav className="h-20 border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
            < GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">SKYGATE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hidden md:block">Architect v3.1</span>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">System Status</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-sky-200">
          <Activity className="w-3.5 h-3.5" />
          Assembly Line Engine Online
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05]">
          Static Curriculum to <br/>
          <span className="text-sky-600">SaaS Learning Apps</span> <br/>
          in Seconds.
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mb-16 leading-relaxed font-medium">
          Transform raw text into high-fidelity, interactive React components using our proprietary 5-Stage production pipeline.
        </p>

        <div className="w-full max-w-4xl bg-white p-5 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 mb-16 relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row gap-4 relative z-10">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste text notes, curriculum, or a topic..."
              className="flex-1 px-8 py-7 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-sky-100 outline-none text-lg font-semibold transition-all placeholder:text-slate-400 text-black"
            />
            <button 
              onClick={() => input.trim() && onSubmit(input)}
              className="bg-slate-900 text-white px-12 py-7 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all group shadow-xl shadow-slate-300"
            >
              Architect Lesson
              <Sparkles className="w-6 h-6 text-sky-400 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-32">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2 py-3">Quick Starts:</span>
          {examples.map((ex, i) => (
            <button 
              key={i} 
              onClick={() => setInput(ex)}
              className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-all hover:scale-105 shadow-sm active:scale-95"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-left space-y-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
             <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center shadow-inner">
                <Layers className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Architecting</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Automatic instructional design using PPP models, CEFR alignment, and spiral review logic.</p>
             </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-left space-y-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
             <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shadow-inner">
                <BrainCircuit className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Simulation</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Neural Practice Labs with unscripted AI roleplay and automated performance evaluation.</p>
             </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-left space-y-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
             <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-inner">
                <Cpu className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">SaaS Ready</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Exports as high-performance React code ready for enterprise LMS integration.</p>
             </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-16 px-8 flex flex-col items-center gap-6 text-slate-400">
        <div className="flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
           <span className="font-black text-xl tracking-tighter">GEMINI</span>
           <span className="font-black text-xl tracking-tighter">REACT</span>
           <span className="font-black text-xl tracking-tighter">TAILWIND</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.3em]">© 2025 Skygate Neural Architect Systems</p>
      </footer>
    </div>
  );
};

export default Builder;
