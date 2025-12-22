
import React from 'react';
import { BookMarked, Search, Info, ExternalLink, Library } from 'lucide-react';
import { LearningObject } from '../types';

interface SideToolsProps {
  learningObject: LearningObject;
}

const SideTools: React.FC<SideToolsProps> = ({ learningObject }) => {
  return (
    <aside className="w-80 border-l bg-slate-50 p-8 flex flex-col gap-8 flex-shrink-0">
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Library className="w-4 h-4" />
          Active Glossary
        </h3>
        <div className="space-y-4">
          {learningObject.vocabulary.slice(0, 5).map((v, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm group hover:border-sky-300 transition-all cursor-help flex gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                {v.imageUrl && <img src={v.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" />}
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-slate-800 block group-hover:text-sky-600 transition-colors truncate">{v.term}</span>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{v.definition}</p>
              </div>
            </div>
          ))}
          {learningObject.vocabulary.length > 5 && (
            <button className="text-xs font-bold text-sky-600 hover:text-sky-700 pl-1">
              View all {learningObject.vocabulary.length} terms →
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Info className="w-4 h-4" />
          Learning Insights
        </h3>
        <div className="bg-indigo-600 rounded-[2rem] p-6 text-white space-y-4 shadow-xl shadow-indigo-100 overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-3xl" />
          <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">SaaS Pedagogical Core</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center font-black text-2xl border border-white/20 shadow-lg">P</div>
            <div>
              <p className="text-sm font-bold">PPP Engine Active</p>
              <p className="text-[10px] opacity-70">Spiral Review Integrated</p>
            </div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] font-bold">
               <span>Retention Confidence</span>
               <span>84%</span>
             </div>
             <div className="h-2 bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-white w-2/3 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
             </div>
          </div>
          <p className="text-[11px] font-medium leading-relaxed opacity-90 border-t border-white/10 pt-4">
            The Neural Practice Lab is analyzing keywords: {learningObject.aiLabScenario.requiredKeywords.slice(0, 3).join(', ')}...
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center hover:border-sky-200 transition-colors group">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
             <BookMarked className="w-7 h-7 text-slate-300 group-hover:text-sky-500 transition-colors" />
          </div>
          <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Research Lab</p>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-6">Connect this module to real-time global trends via the Gemini Researcher.</p>
          <button className="w-full bg-slate-900 py-3.5 rounded-2xl text-xs font-bold text-white hover:bg-sky-600 transition-all flex items-center justify-center gap-2 shadow-lg">
            Launch Context Lab
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideTools;
