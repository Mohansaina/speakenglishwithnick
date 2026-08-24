'use client';

import React, { useState } from 'react';
import { X, LogIn, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center mx-auto text-lg shadow-sm border border-[#164c3c]">
            N
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0d382c]">
            {language === 'es' ? 'Portal del Estudiante' : 'Student Portal Login'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'es'
              ? 'Accede a tus cursos, grabaciones de audio y sesiones de mentoría.'
              : 'Access your Academy courses, audio workouts, and coaching portal.'}
          </p>
        </div>

        {!loggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
              </label>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus-within:border-[#0d382c] focus-within:bg-white transition-all">
                <Mail className="w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@company.com"
                  className="w-full bg-transparent text-xs sm:text-sm focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  {language === 'es' ? 'Contraseña' : 'Password'}
                </label>
                <span className="text-[11px] text-[#0d382c] font-bold hover:underline cursor-pointer">
                  {language === 'es' ? '¿Olvidaste?' : 'Forgot?'}
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus-within:border-[#0d382c] focus-within:bg-white transition-all">
                <Lock className="w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-xs sm:text-sm focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'es' ? 'Ingresar a mi Cuenta' : 'Log In to Academy'}</span>
              <ArrowRight className="w-4 h-4 text-[#66c310]" />
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-[#eefae8] border border-[#c4eeb0] text-center space-y-3">
            <ShieldCheck className="w-10 h-10 text-[#66c310] mx-auto" />
            <h4 className="font-extrabold text-[#0d382c] text-base">
              {language === 'es' ? '¡Bienvenido de vuelta!' : 'Welcome back!'}
            </h4>
            <p className="text-xs text-stone-600">
              {language === 'es'
                ? 'Redirigiendo a tu panel de entrenamiento y audios...'
                : 'Redirecting to your student dashboard and audio vault...'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
