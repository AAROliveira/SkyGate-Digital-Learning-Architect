
export interface VocabItem {
  term: string;
  definition: string;
  example: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface DialogueLine {
  character: string;
  text: string;
  side: 'left' | 'right';
  voice: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface LearningObject {
  id: string;
  title: string;
  level: string;
  estimatedTime: string;
  objectives: string[];
  vocabulary: VocabItem[];
  dialogue: DialogueLine[];
  quiz: QuizQuestion[];
  aiLabScenario: {
    role: string;
    goal: string;
    context: string;
    successCriteria: string[];
    requiredKeywords: string[];
  };
}

export type AppStage = 'builder' | 'generating' | 'viewer';
export type ViewSection = 'overview' | 'vocabulary' | 'dialogue' | 'practice' | 'quiz' | 'ailab';
