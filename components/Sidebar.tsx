
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  BrainCircuit, 
  ArrowLeft,
  GraduationCap,
  Edit3,
  Download,
  Save
} from 'lucide-react';
import { ViewSection } from '../types';

interface SidebarProps {
  activeSection: ViewSection;
  setActiveSection: (s: ViewSection) => void;
  onReset: () => void;
  title: string;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onDownload: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  onReset, 
  title, 
  isEditing, 
  setIsEditing,
  onDownload
}) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'vocabulary', icon: BookOpen, label: 'Vocabulary' },
    { id: 'dialogue', icon: MessageSquare, label: 'Dialogue' },
    { id: 'quiz', icon: Zap, label: 'Quiz' },
    { id: 'ailab', icon: BrainCircuit, label: 'AI Practice' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white mb-8">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">SKYGATE</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as ViewSection)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeSection === item.id 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' 
                  : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'group-hover:text-sky-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-3">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-2">
          <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold tracking-widest">Architect Controls</p>
          <div className="space-y-2">
             <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isEditing ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? 'Exit Adjustment' : 'Adjust Lesson'}
              </span>
            </button>
            <button 
              onClick={onDownload}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600/20 text-sky-400 text-xs font-bold hover:bg-sky-600/30 transition-all border border-sky-600/30"
            >
              <Download className="w-4 h-4" />
              Export Module
            </button>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>New Architecture</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
