import { QuizQuestion, QuizResult } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When you try to speak English in real situations, what happens most often?',
    subtitle: 'Identify your primary speaking hurdle so we can tailor your daily routine.',
    category: 'barrier',
    options: [
      {
        label: 'I translate every single word in my head first',
        description: 'You pause constantly because your brain is formulating sentences in your native language.',
        iconName: 'Brain',
        points: { routine: 'commute', recommendedCourseId: 'commute-blueprint' }
      },
      {
        label: 'I freeze up because I fear making grammar mistakes',
        description: 'You know what to say in theory, but anxiety stops you from speaking out loud.',
        iconName: 'ShieldAlert',
        points: { routine: 'confidence', recommendedCourseId: 'one-on-one-coaching' }
      },
      {
        label: 'I struggle to catch fast native speech and accents',
        description: 'When people speak quickly or use idioms, you get lost after a few seconds.',
        iconName: 'Ear',
        points: { routine: 'intensive', recommendedCourseId: 'masterclass-vault' }
      },
      {
        label: 'My vocabulary feels too basic and repetitive',
        description: 'You end up using the same 50 words and feel unable to express deeper thoughts.',
        iconName: 'BookOpen',
        points: { routine: 'basics', recommendedCourseId: 'masterclass-vault' }
      }
    ]
  },
  {
    id: 2,
    question: 'How much time can you realistically dedicate to English speaking practice each day?',
    subtitle: 'Consistency is far more effective than 3-hour weekend cram sessions.',
    category: 'routine',
    options: [
      {
        label: '15 to 20 minutes during commute (driving/train/walking)',
        description: 'Perfect for hands-free audio repetition and shadow drills on the road.',
        iconName: 'Car',
        points: { routine: 'commute', recommendedCourseId: 'commute-blueprint' }
      },
      {
        label: '30 to 45 minutes focused session in the evening',
        description: 'Ideal for interactive video masterclasses and structured phrase workouts.',
        iconName: 'Clock',
        points: { routine: 'intensive', recommendedCourseId: 'masterclass-vault' }
      },
      {
        label: 'Intensive weekly live coaching (45-60 min calls)',
        description: 'High accountability, personalized feedback, and customized roleplay drills.',
        iconName: 'UserCheck',
        points: { routine: 'confidence', recommendedCourseId: 'one-on-one-coaching' }
      },
      {
        label: 'Just 5 to 10 minutes between daily tasks',
        description: 'Micro-drills and instant survival phrases for immediate recall.',
        iconName: 'Zap',
        points: { routine: 'basics', recommendedCourseId: 'commute-blueprint' }
      }
    ]
  },
  {
    id: 3,
    question: 'What is your #1 English communication goal in the next 90 days?',
    subtitle: 'Choose the breakthrough that would make the biggest impact on your life.',
    category: 'goal',
    options: [
      {
        label: 'Pass job interviews / speak confidently in business meetings',
        description: 'Articulate ideas smoothly without stuttering or getting tongue-tied.',
        iconName: 'Briefcase',
        points: { routine: 'confidence', recommendedCourseId: 'one-on-one-coaching' }
      },
      {
        label: 'Have effortless small talk and make international friends',
        description: 'Feel comfortable in casual settings, social gatherings, and travel.',
        iconName: 'MessageSquare',
        points: { routine: 'commute', recommendedCourseId: 'commute-blueprint' }
      },
      {
        label: 'Stop feeling embarrassed by my accent and pronunciation',
        description: 'Speak with clear intonation so people never have to ask "Could you repeat that?".',
        iconName: 'Mic',
        points: { routine: 'intensive', recommendedCourseId: 'masterclass-vault' }
      },
      {
        label: 'Build an unbreakable daily speaking habit from scratch',
        description: 'Stop giving up after a week and maintain automatic daily practice.',
        iconName: 'Sparkles',
        points: { routine: 'commute', recommendedCourseId: 'commute-blueprint' }
      }
    ]
  }
];

export const calculateQuizResult = (selectedIndices: number[]): QuizResult => {
  const firstChoice = selectedIndices[0] ?? 0;
  
  if (firstChoice === 0) {
    return {
      archetype: 'The Head-Translator',
      tagline: 'Stuck translating word-for-word in your native tongue',
      summary: 'You have good grammar knowledge in your head, but the translation filter causes a 3-5 second delay. Your fastest route to fluency is muscle-memory audio drilling rather than more textbook reading.',
      primaryBarrier: 'Internal translation delay & over-thinking syntax',
      recommendedDailyMinutes: 20,
      recommendedFormat: 'Commute-Friendly Audio Shadowing Drills',
      recommendedCourseId: 'commute-blueprint',
      actionPlan: [
        'Replace silent reading with vocal shadowing 20 min/day while commuting.',
        'Use "Conversational Fillers" to bridge pauses without losing thought flow.',
        'Stop editing your sentences in your head: aim for 80% accuracy with 100% speed.'
      ]
    };
  } else if (firstChoice === 1) {
    return {
      archetype: 'The Perfectionist Hesitator',
      tagline: 'High comprehension, but paralyzed by fear of making mistakes',
      summary: 'You understand 80%+ of what native speakers say, but speaking anxiety holds you back from participating. You need a safe, judgment-free environment to speak messy English until it clicks.',
      primaryBarrier: 'Performance anxiety & fear of judgment',
      recommendedDailyMinutes: 30,
      recommendedFormat: '1-on-1 Mentorship & Psychology-First Speaking Drills',
      recommendedCourseId: 'one-on-one-coaching',
      actionPlan: [
        'Adopt the "Messy First" principle: communicating the idea is 10x more important than grammar.',
        'Do weekly 1-on-1 live roleplay scenarios to desensitize speaking stress.',
        'Practice everyday conversational rescue phrases to stay calm when stuck.'
      ]
    };
  } else if (firstChoice === 2) {
    return {
      archetype: 'The Fast-Pace Overwhelmed',
      tagline: 'Losing track when native speakers talk at regular speed',
      summary: 'You know standard English, but real-world connected speech (contractions, swallowed vowels, slang) throws you off. You need listening decompression training alongside phrase mastery.',
      primaryBarrier: 'Connected speech & speed processing',
      recommendedDailyMinutes: 25,
      recommendedFormat: 'Real-Life Video Masterclass with Connected Speech Analysis',
      recommendedCourseId: 'masterclass-vault',
      actionPlan: [
        'Study English rhythm and stress patterns rather than individual words.',
        'Learn the 50 most common native word contractions and reductions.',
        'Master polite pacing scripts to ask native speakers to adjust their cadence.'
      ]
    };
  } else {
    return {
      archetype: 'The Expressive Striver',
      tagline: 'Wanting deeper nuance beyond repetitive everyday vocabulary',
      summary: 'You can survive in English, but you feel like a "limited version" of yourself because you lack expressive idioms and natural phrasing.',
      primaryBarrier: 'Limited colloquial range & phrase repetition',
      recommendedDailyMinutes: 20,
      recommendedFormat: 'Idiomatic Mastery & Situational Phrase Vault',
      recommendedCourseId: 'masterclass-vault',
      actionPlan: [
        'Learn 5 versatile power-phrases daily instead of memorizing long dictionary lists.',
        'Apply new phrases immediately in 2-minute recorded self-talk drills.',
        'Focus on transition words to link ideas with natural native flow.'
      ]
    };
  }
};
