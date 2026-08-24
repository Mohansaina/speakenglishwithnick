import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mateo Silva',
    role: 'Software Engineer',
    location: 'São Paulo, Brazil',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: "I used to freeze in sprint planning meetings with my US team. Nick's 20-minute daily commuter audio exercises completely eliminated my anxiety in just 3 weeks.",
    before: 'Translating word-by-word with 5-second awkward pauses',
    after: 'Led my first international tech demo with zero panic',
    tag: '20-Min Commuter Student'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Product Designer',
    location: 'Lisbon, Portugal',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: "Nick taught me that I don't need fancy Shakespearean words to sound professional. Speaking with simple, punchy structures got me hired by a remote UK startup!",
    before: 'Hesitating and over-apologizing for my accent',
    after: 'Passed 4 rounds of English interviews and secured job',
    tag: '1-on-1 Coaching'
  },
  {
    id: '3',
    name: 'Carlos Mendoza',
    role: 'Financial Analyst',
    location: 'Mexico City, Mexico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: "The best part is how practical the phrases are. No grammar tables—just real phrases like 'let's make sure we're on the same page' that I use in client emails and Zoom calls every day.",
    before: 'Scared of small talk before meetings started',
    after: 'Effortlessly chatting about weekends and news',
    tag: 'Masterclass Vault'
  }
];
