
import { GoogleGenAI, Chat } from "@google/genai";
import { Course, ChatMessage } from '../types';

let ai: GoogleGenAI | null = null;
const chatSessions = new Map<number, Chat>();

const getAi = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const getChatSession = (course: Course): Chat => {
  if (chatSessions.has(course.id)) {
    return chatSessions.get(course.id)!;
  }

  const newAi = getAi();
  const systemInstruction = `You are an assistant for an e-learning platform.  
Your role is to help manage students, teachers, and courses.

You MUST:
- Interact with a real database for user accounts (students + teachers)
- Store course information (title, description, lessons, teacher id)
- Support user login and roles (student, teacher, admin)
- Allow students to enroll in courses
- Store user progress (completed lessons, quiz scores)
- Only respond with structured JSON when returning data
- Ask clarification if needed

Database fields you will use:

Users:
- user_id
- full_name
- email
- password_hash
- role (student or teacher)
- date_created

Courses:
- course_id
- title
- description
- teacher_id
- created_on

Enrollments:
- user_id
- course_id
- progress_percent

Lessons:
- lesson_id
- course_id
- video_link
- content
- quiz_questions`;

  const chat = newAi.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });

  chatSessions.set(course.id, chat);
  return chat;
};


export async function* sendMessageToTutor(course: Course, history: ChatMessage[]): AsyncGenerator<string> {
  const chat = getChatSession(course);

  // The last message in history is the current user prompt
  const userPrompt = history[history.length - 1].text;
  
  try {
    const result = await chat.sendMessageStream({ message: userPrompt });

    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini API call failed:", error);
    yield "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
}