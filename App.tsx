
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trophy, 
  Settings,
  Cpu,
  Layers,
  LayoutDashboard,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { AppStage, LearningObject, ViewSection } from './types';
import { generateLearningObject } from './services/geminiService';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SideTools from './components/SideTools';
import Builder from './components/Builder';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('builder');
  const [learningObject, setLearningObject] = useState<LearningObject | null>(null);
  const [activeSection, setActiveSection] = useState<ViewSection>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [xp, setXp] = useState(0);
  const [pipelineStage, setPipelineStage] = useState(0);

  const pipelineSteps = [
    { name: "The Architect", detail: "Designing Pedagogical Flow (PPP Model)...", icon: GraduationCap },
    { name: "The Asset Manager", detail: "Synthesizing Visuals & Neural TTS Voices...", icon: Layers },
    { name: "The Structural Engineer", detail: "Establishing SaaS Dashboard Foundation...", icon: LayoutDashboard },
    { name: "The Content Builder", detail: "Coding High-Fidelity UI Components...", icon: Cpu },
    { name: "The Logician", detail: "Synthesizing Runtime State & AI Labs...", icon: BrainCircuit }
  ];

  useEffect(() => {
    let interval: number;
    if (stage === 'generating') {
      interval = window.setInterval(() => {
        setPipelineStage((prev) => (prev + 1) % pipelineSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const handleCreateModule = async (prompt: string) => {
    setStage('generating');
    setPipelineStage(0);
    try {
      const result = await generateLearningObject(prompt);
      setLearningObject(result);
      setStage('viewer');
      setActiveSection('overview');
    } catch (error) {
      console.error("Generation failed:", error);
      setStage('builder');
    }
  };

  const updateLearningObject = (updated: Partial<LearningObject>) => {
    if (!learningObject) return;
    setLearningObject({ ...learningObject, ...updated } as LearningObject);
  };

  const downloadLesson = () => {
    if (!learningObject) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(learningObject, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${learningObject.title.toLowerCase().replace(/\s+/g, '-')}-module.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const addXp = (amount: number) => setXp(prev => prev + amount);

  if (stage === 'generating') {
    const CurrentIcon = pipelineSteps[pipelineStage].icon;
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="relative mb-16">
          <div className="w-40 h-40 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <CurrentIcon className="w-16 h-16 text-sky-400 float-anim" />
          </div>
        </div>

        <div className="space-y-6 max-w-xl w-full relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-sky-500/20">
              Pipeline Stage {pipelineStage + 1} of 5
            </span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            {pipelineSteps[pipelineStage].name}
          </h2>
          <p className="text-slate-400 text-lg font-medium animate-pulse">
            {pipelineSteps[pipelineStage].detail}
          </p>
          
          <div className="grid grid-cols-5 gap-2 pt-8">
            {pipelineSteps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i <= pipelineStage ? 'bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
           <Sparkles className="w-4 h-4" />
           Gemini 2.5 Flash Augmented Production
        </div>
      </div>
    );
  }

  if (stage === 'builder') {
    return <Builder onSubmit={handleCreateModule} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onReset={() => setStage('builder')}
        title={learningObject?.title || 'Course'}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onDownload={downloadLesson}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-white shadow-xl relative z-10">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {learningObject?.level}
            </span>
            {isEditing ? (
              <input 
                value={learningObject?.title} 
                onChange={(e) => updateLearningObject({ title: e.target.value })}
                className="text-xl font-bold text-black border-b-2 border-sky-500 outline-none bg-sky-50 px-2"
              />
            ) : (
              <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">
                {learningObject?.title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-700">{xp} XP</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <MainContent 
            section={activeSection} 
            data={learningObject!} 
            isEditing={isEditing}
            onUpdate={updateLearningObject}
            onXpGain={addXp}
            onNext={() => {
              const sections: ViewSection[] = ['overview', 'vocabulary', 'dialogue', 'quiz', 'ailab'];
              const idx = sections.indexOf(activeSection);
              if (idx < sections.length - 1) setActiveSection(sections[idx+1]);
            }}
          />
        </main>
      </div>

      <SideTools learningObject={learningObject!} />
    </div>
  );
};

export default App;
