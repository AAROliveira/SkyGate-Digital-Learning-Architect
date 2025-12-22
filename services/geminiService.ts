
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { LearningObject, VocabItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLearningObject = async (input: string): Promise<LearningObject> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Transform this educational content into a premium, SaaS-ready learning object: "${input}". 
    Use the PPP model. Include detailed visual prompts for each vocabulary term. 
    Assign XP points (10-50) to quiz questions based on difficulty.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          level: { type: Type.STRING },
          estimatedTime: { type: Type.STRING, description: "e.g. 15 mins" },
          objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                definition: { type: Type.STRING },
                example: { type: Type.STRING },
                imagePrompt: { type: Type.STRING, description: "Detailed prompt for generating a photorealistic 4k image of this item." }
              },
              required: ["term", "definition", "example", "imagePrompt"]
            }
          },
          dialogue: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                character: { type: Type.STRING },
                text: { type: Type.STRING },
                side: { type: Type.STRING, enum: ["left", "right"] },
                voice: { type: Type.STRING, enum: ["Kore", "Puck", "Charon", "Fenrir", "Zephyr"] }
              },
              required: ["character", "text", "side", "voice"]
            }
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER },
                explanation: { type: Type.STRING },
                points: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctIndex", "explanation", "points"]
            }
          },
          aiLabScenario: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              goal: { type: Type.STRING },
              context: { type: Type.STRING },
              successCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
              requiredKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["role", "goal", "context", "successCriteria", "requiredKeywords"]
          }
        },
        required: ["title", "level", "estimatedTime", "objectives", "vocabulary", "dialogue", "quiz", "aiLabScenario"]
      }
    }
  });

  const rawJson = JSON.parse(response.text || '{}');
  
  // Step 2: Generate photorealistic images for vocabulary items
  const vocabWithImages = await Promise.all(rawJson.vocabulary.map(async (v: VocabItem) => {
    try {
      const imgRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `A photorealistic 4k high-fidelity educational image of: ${v.imagePrompt}` }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      
      const imgPart = imgRes.candidates[0].content.parts.find(p => p.inlineData);
      return { ...v, imageUrl: imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : undefined };
    } catch (e) {
      console.warn("Image gen failed for", v.term);
      return v;
    }
  }));

  return {
    ...rawJson,
    vocabulary: vocabWithImages,
    id: Math.random().toString(36).substr(2, 9)
  };
};

export const playTTS = async (text: string, voice: string = 'Kore') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const frameCount = dataInt16.length;
      const buffer = audioContext.createBuffer(1, frameCount, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (error) {
    console.error("TTS failed:", error);
  }
};
