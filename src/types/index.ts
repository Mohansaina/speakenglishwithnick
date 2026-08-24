export interface Course {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  featured?: boolean;
  price: string;
  originalPrice?: string;
  duration: string;
  level: string;
  format: string;
  description: string;
  features: string[];
  idealFor: string;
  ctaText: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  category: 'barrier' | 'goal' | 'routine' | 'level';
  options: {
    label: string;
    description: string;
    iconName: string;
    points: {
      routine: 'commute' | 'intensive' | 'confidence' | 'basics';
      recommendedCourseId: string;
    };
  }[];
}

export interface QuizResult {
  archetype: string;
  tagline: string;
  summary: string;
  primaryBarrier: string;
  recommendedDailyMinutes: number;
  recommendedFormat: string;
  recommendedCourseId: string;
  actionPlan: string[];
}

export interface AudioDrill {
  id: string;
  title: string;
  category: string;
  scenario: string;
  phrase: string;
  phonetic: string;
  meaning: string;
  whyItWorks: string;
  commonMistake: string;
  betterAlternative: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Confidence Booster';
  tags: string[];
}

export interface ReelItem {
  id: string;
  title: string;
  hook: string;
  views: string;
  likes: string;
  category: string;
  keyTakeaway: string;
  duration: string;
  reelUrl: string;
  highlightTag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  before: string;
  after: string;
  tag: string;
  timeframe?: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  source: string;
  learningGoal?: string;
  timezone?: string;
}
