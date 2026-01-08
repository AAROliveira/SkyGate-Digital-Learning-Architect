
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { ViewSection, LearningObject, VocabItem, DialogueLine, QuizQuestion } from '../types';
import { 
  Play, 
  Volume2, 
  ChevronRight, 
  Check, 
  X, 
  MessageCircle, 
  Brain, 
  GraduationCap,
  Sparkles,
  RefreshCcw,
  Plus,
  Trash2,
  Clock,
  Target,
  Key,
  Trophy,
  Activity,
  Award
} from 'lucide-react';
import { playTTS } from '../services/geminiService';

interface MainContentProps {
  section: ViewSection;
  data: LearningObject;
  isEditing: boolean;
  onUpdate: (data: Partial<LearningObject>) => void;
  onXpGain: (amt: number) => void;
  onNext: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ section, data, isEditing, onUpdate, onXpGain, onNext }) => {
  switch (section) {
    case 'overview': return <Overview data={data} isEditing={isEditing} onUpdate={onUpdate} onNext={onNext} />;
    case 'vocabulary': return <Vocabulary data={data.vocabulary} isEditing={isEditing} onUpdate={(v) => onUpdate({ vocabulary: v })} onXpGain={onXpGain} />;
    case 'dialogue': return <Dialogue data={data.dialogue} isEditing={isEditing} onUpdate={(d) => onUpdate({ dialogue: d })} onXpGain={onXpGain} />;
    case 'quiz': return <Quiz questions={data.quiz} isEditing={isEditing} onUpdate={(q) => onUpdate({ quiz: q })} onXpGain={onXpGain} />;
    case 'ailab': return <AILab scenario={data.aiLabScenario} isEditing={isEditing} onUpdate={(s) => onUpdate({ aiLabScenario: s })} onXpGain={onXpGain} />;
    default: return null;
  }
};

const Overview: React.FC<{ data: LearningObject, isEditing: boolean, onUpdate: (d: Partial<LearningObject>) => void, onNext: () => void }> = ({ data, isEditing, onUpdate, onNext }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sky-500 text-white mb-4 shadow-xl shadow-sky-200">
          <Sparkles className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {isEditing ? (
            <input 
              value={data.title} 
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="text-center w-full bg-sky-50 border-b-2 border-sky-500 focus:ring-0 outline-none p-2 rounded text-black"
            />
          ) : `Expertise in ${data.title}`}
        </h2>
        <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {isEditing ? (
              <input value={data.estimatedTime} onChange={e => onUpdate({ estimatedTime: e.target.value })} className="w-20 bg-slate-50 border-b border-sky-500 outline-none text-center text-black" />
            ) : data.estimatedTime}
          </div>
          <span>•</span>
          <p>Accelerate your growth through immersive interaction.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-sky-200 transition-colors shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
            <GraduationCap className="text-sky-500 w-6 h-6" />
            Learning Objectives
          </h3>
          <ul className="space-y-4">
            {data.objectives.map((obj, i) => (
              <li key={i} className="flex gap-3 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-sky-50 flex-shrink-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                </div>
                {isEditing ? (
                  <div className="flex-1 flex gap-2">
                    <input 
                      value={obj} 
                      onChange={(e) => {
                        const next = [...data.objectives];
                        next[i] = e.target.value;
                        onUpdate({ objectives: next });
                      }}
                      className="flex-1 bg-slate-50 text-sm p-1 rounded border-b border-transparent focus:border-sky-500 outline-none text-black"
                    />
                    <button onClick={() => onUpdate({ objectives: data.objectives.filter((_, j) => j !== i) })} className="text-rose-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <span className="text-sm font-medium leading-relaxed">{obj}</span>
                )}
              </li>
            ))}
            {isEditing && (
              <button onClick={() => onUpdate({ objectives: [...data.objectives, 'New Objective'] })} className="flex items-center gap-2 text-xs font-bold text-sky-600 mt-4">
                <Plus className="w-3 h-3" /> Add Objective
              </button>
            )}
          </ul>
        </div>
        <div className="bg-sky-50 p-8 rounded-3xl border-2 border-sky-100 flex flex-col justify-center text-center">
          <div className="mb-4">
            <div className="inline-block px-4 py-2 bg-white rounded-full text-sky-600 font-bold text-xs uppercase tracking-widest shadow-sm">
              {isEditing ? (
                <div className="flex items-center gap-2">
                   CEFR LEVEL 
                   <input 
                    value={data.level} 
                    onChange={(e) => onUpdate({ level: e.target.value })}
                    className="w-12 text-center bg-sky-50 border-b border-sky-500 outline-none text-black"
                   />
                </div>
              ) : `CEFR LEVEL ${data.level}`}
            </div>
          </div>
          <p className="text-slate-600 font-medium mb-8">This module utilizes Active Recall and Spaced Repetition algorithms to ensure maximum retention of core concepts.</p>
          <button 
            onClick={onNext}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Begin Immersion
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const Vocabulary: React.FC<{ data: VocabItem[], isEditing: boolean, onUpdate: (v: VocabItem[]) => void, onXpGain: (n: number) => void }> = ({ data, isEditing, onUpdate, onXpGain }) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);

  const current = data[idx] || { term: '', definition: '', example: '', imagePrompt: '' };

  const handleSpeak = async (text: string) => {
    setPlaying(true);
    await playTTS(`Focus on: ${text}`, 'Kore');
    setPlaying(false);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center gap-8 pt-12">
      <div className="w-full flex justify-between items-center px-4">
        <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">Visual Deck</span>
        <span className="text-sky-600 font-bold bg-sky-50 px-3 py-1 rounded-full text-xs">{idx + 1} / {data.length}</span>
      </div>

      <div onClick={() => setFlipped(!flipped)} className="w-full h-[450px] relative cursor-pointer group perspective-1000">
        <div className={`w-full h-full transition-all duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-between p-4 backface-hidden shadow-2xl overflow-hidden">
            <div className="flex-1 w-full relative mb-4">
              {current.imageUrl ? (
                <img src={current.imageUrl} alt={current.term} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-slate-300 animate-pulse" />
                </div>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); handleSpeak(current.term); }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-sky-500 hover:text-white transition-all"
              >
                {playing ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6" />}
              </button>
            </div>
            <h3 className="text-4xl font-black text-slate-900 pb-4">{current.term}</h3>
          </div>
          <div className="absolute inset-0 bg-slate-900 text-white rounded-[2.5rem] flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180 shadow-2xl">
            <p className="text-3xl font-bold text-center leading-relaxed mb-10">{current.definition}</p>
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 text-slate-300 italic text-center w-full relative">
               <div className="absolute -top-3 left-6 bg-sky-500 text-[10px] font-black uppercase px-2 py-0.5 rounded">Usage Example</div>
              "{current.example}"
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => { if(idx < data.length - 1) { setIdx(idx+1); setFlipped(false); onXpGain(10); } }}
        disabled={idx === data.length - 1}
        className="w-full max-w-xs bg-slate-900 text-white py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-30 shadow-xl"
      >
        Learned
        <Check className="w-6 h-6" />
      </button>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

const Dialogue: React.FC<{ data: DialogueLine[], isEditing: boolean, onUpdate: (d: DialogueLine[]) => void, onXpGain: (n: number) => void }> = ({ data, isEditing, onUpdate, onXpGain }) => {
  const [playing, setPlaying] = useState<number | null>(null);

  const handleSpeak = async (line: DialogueLine, i: number) => {
    setPlaying(i);
    await playTTS(line.text, line.voice);
    setPlaying(null);
    onXpGain(5);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      <div className="flex flex-col gap-6">
        {data.map((line, i) => (
          <div key={i} className={`flex items-end gap-3 ${line.side === 'right' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{ animationDelay: `${i * 100}ms` }}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${line.side === 'right' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
              {line.character[0]}
            </div>
            <div className={`relative group max-w-[80%] p-5 rounded-3xl shadow-sm ${line.side === 'right' ? 'bg-slate-900 text-white rounded-br-none shadow-indigo-100' : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-slate-100'}`}>
              <div className="text-xs font-bold opacity-50 mb-1 uppercase tracking-tighter">{line.character}</div>
              <p className="text-base font-medium leading-relaxed mb-4">{line.text}</p>
              <button onClick={() => handleSpeak(line, i)} className={`p-2 rounded-full transition-all hover:scale-110 active:scale-90 ${line.side === 'right' ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
                {playing === i ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Quiz: React.FC<{ questions: QuizQuestion[], isEditing: boolean, onUpdate: (q: QuizQuestion[]) => void, onXpGain: (n: number) => void }> = ({ questions, isEditing, onUpdate, onXpGain }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQ = questions[idx] || { question: '', options: [], correctIndex: 0, explanation: '', points: 25 };

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <div className="mb-12 text-center space-y-2">
        <h3 className="text-3xl font-black text-slate-900">Active Retention Quiz</h3>
        <p className="text-slate-500">Validate your progress and earn high-tier XP.</p>
      </div>
      <div className="bg-white border-2 border-slate-100 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-100">
        <div className="mb-8 flex justify-between items-center">
           <span className="text-xs font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-widest">Level {idx + 1} / {questions.length}</span>
           <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
             <Trophy className="w-4 h-4" />
             {currentQ.points} XP AT STAKE
           </div>
        </div>
        <h4 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">{currentQ.question}</h4>
        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt, i) => (
            <button key={i} onClick={() => { if(selected===null){ setSelected(i); const correct = i === currentQ.correctIndex; setIsCorrect(correct); if(correct) onXpGain(currentQ.points); } }} className={`text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${selected === i ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-500 text-rose-800') : 'border-slate-100 hover:border-sky-300 hover:bg-sky-50 text-slate-600'}`}>
              <span className="font-semibold text-lg">{opt}</span>
              {selected === i && (isCorrect ? <Check className="w-6 h-6 shadow-sm" /> : <X className="w-6 h-6 shadow-sm" />)}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`p-8 rounded-[2rem] ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} border`}>
               <p className="font-black text-lg mb-2">{isCorrect ? 'Excellent Performance!' : 'Educational Insight'}</p>
               <p className="text-slate-700 leading-relaxed font-medium">{currentQ.explanation}</p>
            </div>
            {idx < questions.length - 1 && (
              <button onClick={() => { setIdx(idx + 1); setSelected(null); setIsCorrect(null); }} className="mt-8 w-full bg-slate-900 text-white py-5 rounded-3xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Continue Challenge <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AILab: React.FC<{ scenario: any, isEditing: boolean, onUpdate: (s: any) => void, onXpGain: (n: number) => void }> = ({ scenario, isEditing, onUpdate, onXpGain }) => {
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: ${scenario.context}. Your Role: ${scenario.role}. Goal: ${scenario.goal}. Previous exchange: ${JSON.stringify(messages.slice(-4))}. User said: "${userMsg}". Respond naturally and keep the conversation going towards the goal.`,
      });
      setMessages(prev => [...prev, {role: 'ai', text: response.text || "..."}]);
      onXpGain(10);
    } catch (e) { console.error(e); } finally { setIsTyping(false); }
  };

  const evaluatePerformance = async () => {
    if (messages.length < 2) return;
    setIsEvaluating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Evaluate this student conversation based on:
        Role: ${scenario.role}
        Goal: ${scenario.goal}
        Required Keywords: ${scenario.requiredKeywords.join(', ')}
        Success Criteria: ${scenario.successCriteria.join(', ')}
        
        Transcript: ${JSON.stringify(messages)}
        
        Provide a JSON response with:
        - score (0-100)
        - feedback (string)
        - achievedObjectives (array of strings)
        - missingKeywords (array of strings)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING },
              achievedObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "feedback", "achievedObjectives", "missingKeywords"]
          }
        }
      });
      const res = JSON.parse(response.text || '{}');
      setEvaluation(res);
      onXpGain(res.score * 2);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white border-2 border-slate-100 rounded-[3.5rem] shadow-2xl overflow-hidden">
      <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-xl leading-tight">Neural Simulation Lab</h3>
            <p className="text-sky-300 text-xs font-black uppercase tracking-widest mt-0.5">{scenario.role}</p>
          </div>
        </div>
        {!evaluation && messages.length >= 2 && (
          <button 
            onClick={evaluatePerformance}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            {isEvaluating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
            Finalize & Grade
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-6 scrollbar-hide bg-slate-50 relative">
        {evaluation ? (
          <div className="animate-in zoom-in-95 duration-500 pb-12">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl space-y-8">
               <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-50 border-4 border-amber-100 text-amber-500 text-4xl font-black mb-2">
                    {evaluation.score}
                  </div>
                  <h4 className="text-2xl font-black text-slate-800">Performance Verified</h4>
                  <p className="text-slate-500 leading-relaxed max-w-md mx-auto">{evaluation.feedback}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                     <p className="text-[10px] font-black text-emerald-600 uppercase mb-4 flex items-center gap-2"><Check className="w-3 h-3" /> Milestones Met</p>
                     <ul className="space-y-2">
                        {evaluation.achievedObjectives.map((obj: string, i: number) => (
                          <li key={i} className="text-xs font-bold text-emerald-800 flex items-start gap-2">
                            <Check className="w-3 h-3 mt-0.5" /> {obj}
                          </li>
                        ))}
                     </ul>
                  </div>
                  <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                     <p className="text-[10px] font-black text-amber-600 uppercase mb-4 flex items-center gap-2"><Key className="w-3 h-3" /> Terminology Gap</p>
                     <div className="flex flex-wrap gap-2">
                        {evaluation.missingKeywords.length > 0 ? evaluation.missingKeywords.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-white rounded-lg border border-amber-200 text-[10px] font-black text-amber-700">{kw}</span>
                        )) : <p className="text-[10px] text-slate-400 italic">None - perfect usage.</p>}
                     </div>
                  </div>
               </div>

               <button 
                onClick={() => { setEvaluation(null); setMessages([]); }}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800"
               >
                 <RefreshCcw className="w-4 h-4" /> Reset Simulation
               </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 text-slate-500 font-medium text-sm mb-12 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 flex-shrink-0">
                 <Target className="w-5 h-5" />
              </div>
              <p>Mission: {scenario.goal}. Use vocabulary terms appropriately to reach the objective.</p>
            </div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[80%] p-6 rounded-3xl shadow-sm text-base leading-relaxed ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white border border-slate-200 p-5 rounded-3xl flex gap-1.5 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                    <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                 </div>
              </div>
            )}
          </>
        )}
      </div>

      {!evaluation && (
        <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && sendMessage()} 
            placeholder="Engage with the Neural Agent..." 
            disabled={isEvaluating}
            className="flex-1 bg-slate-100 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-semibold text-black" 
          />
          <button 
            onClick={sendMessage} 
            disabled={isEvaluating}
            className="bg-slate-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center hover:bg-sky-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
