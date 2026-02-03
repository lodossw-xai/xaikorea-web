import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalizedData, legalData } from '../data';
import useLanguageStore from '../store/languageStore';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

function LegalPage({ type }: LegalPageProps): ReactElement {
  const { language, setLanguage } = useLanguageStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const data = getLocalizedData(legalData, language);
  const content = data[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const handleDarkModeToggle = (): void => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* Navigation - simplified version of the main nav */}
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <img
                src="/assets/images/logo/logo-light.png"
                alt="XAI Korea Logo"
                className="h-10 w-auto dark:hidden"
              />
              <img
                src="/assets/images/logo/logo-dark.png"
                alt="XAI Korea Logo"
                className="h-10 w-auto hidden dark:block"
              />
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                XAI <span className="text-primary">Korea</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-white dark:bg-gray-700 text-ai-blue shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === 'ko'
                      ? 'bg-white dark:bg-gray-700 text-ai-blue shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  KR
                </button>
              </div>
              <button
                onClick={handleDarkModeToggle}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
              >
                <span className="material-symbols-outlined">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <Link
                to="/"
                className="hidden sm:block text-sm font-bold text-ai-blue hover:text-blue-600 transition"
              >
                {language === 'ko' ? '홈으로' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
              {content.title}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                {content.content}
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-ai-blue font-bold hover:gap-3 transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                {language === 'ko' ? '홈으로 돌아가기' : 'Return to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-hero-dark py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 XAI KOREA Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LegalPage;
