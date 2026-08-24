import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'commute-blueprint',
    title: 'The 20-Min Commuter Blueprint',
    subtitle: 'Audio-first daily conversational habits designed for your drive, train, or walk to work.',
    badge: 'Most Popular',
    featured: true,
    price: '$49',
    originalPrice: '$99',
    duration: '4 Weeks (20 Lessons)',
    level: 'Beginner to Intermediate',
    format: 'On-Demand Audio & Interactive Drills',
    description: 'Transform your daily commute into rapid English fluency. Learn how to speak without translating in your head through 20 bite-sized situational audio workouts.',
    features: [
      '20 high-yield audio drills (commute-friendly, hands-free)',
      'Real-world survival scripts (asking to slow down, meetings, small talk)',
      'Pronunciation rhythm & natural intonation breakdowns',
      'Downloadable Offline Audio Pack & PDF Quick Reference Cheatsheets',
      'Lifetime access & community discussion forum'
    ],
    idealFor: 'Busy professionals & daily commuters who lack time for traditional 2-hour classes.',
    ctaText: 'Enroll in 20-Min Blueprint'
  },
  {
    id: 'one-on-one-coaching',
    title: '1-on-1 Intensive Fluency Coaching',
    subtitle: 'Personalized live speaking mentorship with Nick to break your speaking barrier once and for all.',
    badge: 'Limited Slots (4/Month)',
    featured: false,
    price: '$240',
    originalPrice: '$350',
    duration: '4 x 45-Min Private Sessions',
    level: 'All Levels (Personalized)',
    format: 'Live 1-on-1 Video Calls + WhatsApp Voice Notes',
    description: 'Direct, focused speaking mentorship. Nick pinpoints your exact hesitations, corrects your pronunciation in real-time, and builds custom roleplay scenarios for your career.',
    features: [
      '4 private 45-minute live speaking sessions with Nick',
      'Personalized accent & hesitation diagnostic report',
      'Asynchronous WhatsApp voice note feedback between calls',
      'Tailored roleplays: Job interviews, business presentations, travel',
      'Custom vocabulary deck tailored specifically to your industry'
    ],
    idealFor: 'Learners preparing for interviews, relocations, or seeking rapid breakthroughs in confidence.',
    ctaText: 'Apply for 1-on-1 Coaching'
  },
  {
    id: 'masterclass-vault',
    title: 'Real-Life English Masterclass',
    subtitle: 'Overcome the fear of "big words" and master natural everyday conversational rhythm.',
    badge: 'Comprehensive',
    featured: false,
    price: '$89',
    originalPrice: '$150',
    duration: '8 Modules (60+ Lessons)',
    level: 'Elementary to Advanced',
    format: 'Video Masterclass + Interactive Quizzes',
    description: 'A deep-dive video program teaching you how native speakers actually converse. Master 500+ natural idiomatic expressions, tone nuance, and conversational transitions.',
    features: [
      '60+ HD video lessons breaking down natural conversation mechanics',
      '500+ everyday colloquial phrases with interactive quizzes',
      'Psychological confidence drills to eliminate speaking anxiety',
      'Small talk frameworks: How to keep conversations flowing smoothly',
      'Certificate of Completion & Dedicated Learner Discord'
    ],
    idealFor: 'Anyone who feels their English is stuck in "textbook mode" and wants to sound natural.',
    ctaText: 'Get Instant Access'
  }
];
