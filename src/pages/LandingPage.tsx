/**
 * Landing Page - TaxAI One Page Template
 * Constitution I: Functional Component
 * Based on html/code.html design
 */
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useLocalizedData } from '../hooks/useLocalizedData';
import useLanguageStore from '../store/languageStore';

function LandingPage(): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();
  const data = useLocalizedData();

  // Initialize dark mode state from current DOM state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  // Sync with system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent): void => {
      // Only auto-switch if no user preference is stored
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Dark mode toggle handler
  const handleDarkModeToggle = (): void => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-black dark:text-primary">
                auto_graph
              </span>
              <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                Tax<span className="text-primary">AI</span>
              </span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
                href="#home"
              >
                {data.navigation.nav.home}
              </a>
              <a
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
                href="#services"
              >
                {data.navigation.nav.services}
              </a>
              <a
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
                href="#advisors"
              >
                {data.navigation.nav.advisors}
              </a>
              <a
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
                href="#team"
              >
                {data.navigation.nav.team}
              </a>

              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-1 py-1">
                <button
                  className={`px-3 py-1 text-xs font-bold transition ${
                    language === 'en'
                      ? 'bg-gray-900 text-white rounded-full'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  className={`px-3 py-1 text-xs font-bold transition ${
                    language === 'ko'
                      ? 'bg-gray-900 text-white rounded-full'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                  onClick={() => setLanguage('ko')}
                >
                  KR
                </button>
              </div>

              <a
                className="bg-primary hover:bg-primary-hover text-black font-bold py-2.5 px-6 rounded-lg transition shadow-lg shadow-yellow-500/20"
                href="#contact"
              >
                {data.navigation.nav.contact}
              </a>

              <button
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
                onClick={handleDarkModeToggle}
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                <span className="material-symbols-outlined">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                className="text-gray-500 hover:text-gray-900 dark:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-symbols-outlined text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            <a
              className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition py-2"
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.navigation.nav.home}
            </a>
            <a
              className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition py-2"
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.navigation.nav.services}
            </a>
            <a
              className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition py-2"
              href="#advisors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.navigation.nav.advisors}
            </a>
            <a
              className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition py-2"
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.navigation.nav.team}
            </a>

            <div className="flex items-center justify-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-1 py-1">
                <button
                  className={`px-3 py-1 text-xs font-bold transition ${
                    language === 'en'
                      ? 'bg-gray-900 text-white rounded-full'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  className={`px-3 py-1 text-xs font-bold transition ${
                    language === 'ko'
                      ? 'bg-gray-900 text-white rounded-full'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                  onClick={() => setLanguage('ko')}
                >
                  KR
                </button>
              </div>

              <button
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
                onClick={handleDarkModeToggle}
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                <span className="material-symbols-outlined">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>

            <a
              className="block text-center bg-primary hover:bg-primary-hover text-black font-bold py-3 px-6 rounded-lg transition shadow-lg shadow-yellow-500/20"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.navigation.nav.contact}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-screen relative flex items-center pt-20 overflow-hidden bg-white dark:bg-[#0B1120] group"
        id="home"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-tech-grid dark:bg-tech-grid-dark bg-[length:50px_50px] animate-flow-grid opacity-40"></div>
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-ai-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-ai-green/10 rounded-full blur-[100px] animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>
          {/* Particles */}
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-ai-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-particle-drift group-hover:duration-[8s]"></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-ai-green rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-particle-drift-delayed group-hover:duration-[8s]"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-ai-blue rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-particle-drift"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-particle-drift"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        {/* Interactive Grid - Desktop only */}
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 z-0 pointer-events-auto opacity-0 md:opacity-100">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className={`hover-grid-cell ${i >= 36 ? 'hidden md:block' : ''}`}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10 pointer-events-none">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center pointer-events-auto">
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-blue/10 border border-ai-blue/30 backdrop-blur-sm text-ai-blue dark:text-blue-300 text-sm font-semibold mb-6">
                <span className="material-symbols-outlined text-sm animate-pulse">
                  hub
                </span>
                <span>{data.hero.badge}</span>
              </div>

              <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-gray-900 dark:text-white leading-tight mb-8">
                {data.hero.title.line1}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-ai-blue to-ai-green">
                    {data.hero.title.line2}
                  </span>
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed keep-all">
                {data.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-black font-bold text-lg py-4 px-8 rounded-lg transition shadow-xl shadow-yellow-500/20 group"
                  href="#contact"
                >
                  {data.hero.cta.primary}
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="flex items-center justify-center gap-2 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-ai-blue dark:hover:border-ai-blue text-gray-900 dark:text-white font-semibold text-lg py-4 px-8 rounded-lg transition"
                  href="#services"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  소개 영상 보기
                </a>
              </div>
            </div>

            {/* Demo Card */}
            <div className="relative z-10 flex justify-center lg:justify-end h-full">
              <div className="relative w-full max-w-lg">
                <div className="relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-2xl animate-float transition-transform duration-500 hover:scale-[1.02]">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-ai-blue/20 to-ai-green/20 blur-lg opacity-50 dark:opacity-30"></div>

                  <div className="relative">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-6">
                      {/* User Message */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-500">
                            person
                          </span>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                            2024년 개정된 조특법상 R&D 세액공제 적용 요건이
                            어떻게 되나요?
                          </p>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex gap-4 flex-row-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-full flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <span className="material-symbols-outlined text-white">
                            smart_toy
                          </span>
                        </div>
                        <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-2xl rounded-tr-none flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 bg-ai-green rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-ai-blue dark:text-blue-300 uppercase">
                              AI Analysis
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                            조세특례제한법 제10조 개정안에 따라 신성장·원천기술
                            관련 비용 인정 범위가 확대되었습니다...
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-white dark:bg-black/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[10px]">
                                link
                              </span>{' '}
                              국세청 고시
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accuracy Badge */}
                <div className="absolute -right-6 top-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur border border-gray-200 dark:border-gray-600 p-3 rounded-xl shadow-xl animate-float-delayed flex items-center gap-3 z-20">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                      verified
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      정확도 (Accuracy)
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      99.9%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50 hover:opacity-100 transition-opacity z-20 pointer-events-auto cursor-pointer">
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            SCROLL DOWN
          </span>
          <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">
            keyboard_arrow_down
          </span>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">
            업계 최고의 파트너들과 함께합니다
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default">
              <span className="material-symbols-outlined">account_balance</span>{' '}
              TaxCorp
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default">
              <span className="material-symbols-outlined">analytics</span>{' '}
              AuditFlow
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default">
              <span className="material-symbols-outlined">gavel</span> LegalAI
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default">
              <span className="material-symbols-outlined">
                assured_workload
              </span>{' '}
              TrustTax
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default">
              <span className="material-symbols-outlined">calculate</span>{' '}
              CPAMate
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-24 bg-surface-light dark:bg-background-dark"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-6 leading-snug reveal-text">
              <span className="text-ai-blue">
                {data.services.title.highlight}
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: data.services.title.main }}
              />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg keep-all">
              {data.services.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.cards.map((card, index) => (
              <div
                key={index}
                className={`interactive-card p-8 rounded-2xl transition group h-full ${
                  card.isPopular
                    ? 'bg-gradient-to-br from-white to-gray-50 dark:from-surface-dark dark:to-black border-2 border-primary shadow-xl relative overflow-hidden'
                    : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
                }`}
              >
                {card.isPopular && card.badge && (
                  <div className="absolute top-0 right-0 bg-primary text-xs font-bold px-3 py-1 rounded-bl-lg text-black">
                    {card.badge}
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    card.isPopular
                      ? 'bg-black dark:bg-gray-800'
                      : 'bg-primary/20 dark:bg-primary/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed keep-all">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps & Accuracy Section */}
      <section className="py-24 bg-white dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Process Steps */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-primary rounded-3xl p-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] transform rotate-1 hover:rotate-0 transition duration-500">
                <img
                  alt="Accountant analyzing data"
                  className="w-full rounded-2xl grayscale hover:grayscale-0 transition duration-500"
                  src="https://images.unsplash.com/photo-1554224311-beee4ece0933?w=800&h=600&fit=crop"
                />
              </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-block p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-6">
                <span className="material-symbols-outlined text-yellow-700 dark:text-yellow-400 text-3xl">
                  psychology
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-6 leading-tight reveal-text">
                복잡한 세무 사례,
                <br />단 <span className="text-ai-green">3단계</span>로
                해결하세요
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 keep-all">
                법전을 뒤적이기 전에 AI에게 먼저 물어보세요. 수만 페이지의
                문서를 단 몇 초 만에 읽고 분석하는 유능한 주니어 어소시에이트를
                고용하는 것과 같습니다.
              </p>

              <ul className="space-y-6">
                <li className="flex items-center gap-6 p-4 rounded-xl bg-surface-light dark:bg-background-dark border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    1
                  </span>
                  <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    사례 파일 업로드 (PDF/Doc)
                  </span>
                </li>
                <li className="flex items-center gap-6 p-4 rounded-xl bg-primary shadow-xl transform translate-x-4">
                  <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
                    2
                  </span>
                  <span className="font-bold text-lg text-black">
                    분석 보고서 생성
                  </span>
                  <span className="ml-auto material-symbols-outlined text-black">
                    arrow_forward
                  </span>
                </li>
                <li className="flex items-center gap-6 p-4 rounded-xl bg-surface-light dark:bg-background-dark border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    3
                  </span>
                  <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    검토 및 메모로 내보내기
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Accuracy Section */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-6 leading-tight reveal-text">
                전문가를 위한
                <br />
                <span className="text-ai-blue">압도적 정확성</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 keep-all">
                중요한 의사결정 과정에 통합되기 위해 투명성과 해석 가능성은
                필수입니다. TaxAI는 모든 주장에 대해 명확한 출처를 제공합니다.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      할루시네이션 제로 정책
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      엄격한 제약 조건을 통해 제공된 법령 텍스트 내에서만 답변을
                      생성합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                      lock
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      데이터 보안 보장
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      민감한 클라이언트 데이터를 위한 온프레미스 구축 옵션을
                      지원합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                      history_edu
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      감사 추적 (Audit Trail)
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      세무 조언 도출에 사용된 논리와 근거를 투명하게 추적할 수
                      있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full">
              <div className="bg-white dark:bg-background-dark border-2 border-gray-900 dark:border-gray-600 rounded-2xl p-8 relative shadow-[12px_12px_0px_0px_#FFD700]">
                <div className="absolute -top-6 -right-6 text-6xl animate-bounce">
                  ✨
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                  <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse delay-75"></div>
                  <div className="h-20 bg-primary/20 rounded-xl border border-primary flex items-center justify-center">
                    <span className="text-primary font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin">
                        sync
                      </span>
                      Processing...
                    </span>
                  </div>
                  <div className="col-span-2 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
                <img
                  alt="Data processing"
                  className="absolute -bottom-10 -left-10 w-40 h-40 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisors Section - Rolling Banner */}
      <section
        className="py-24 bg-surface-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800 overflow-hidden"
        id="advisors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-16 reveal-text">
            <span className="text-ai-blue">
              {data.advisors.title.highlight}
            </span>
            {data.advisors.title.main}
          </h2>
        </div>

        {/* Rolling Banner Container */}
        <div className="relative">
          {/* Gradient Overlay - Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
          {/* Gradient Overlay - Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div
            className="flex gap-6 hover:[animation-play-state:paused]"
            style={{
              animation: 'scrollLeft 30s linear infinite',
              width: 'max-content',
            }}
          >
            {/* Original Cards + Duplicates for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6">
                {data.advisors.items.map((advisor, index) => (
                  <div
                    key={index}
                    className="w-[400px] shrink-0 bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
                  >
                    {advisor.isHead && (
                      <div className="absolute -top-3 right-8 bg-black text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                        HEAD ADVISOR
                      </div>
                    )}
                    <div className="text-primary text-5xl mb-2 font-serif opacity-50">
                      "
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic relative z-10 keep-all text-sm leading-relaxed">
                      "{advisor.quote}"
                    </p>
                    <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <img
                        alt={advisor.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-dark"
                        src={advisor.image}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {advisor.name}
                        </h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          {advisor.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="py-24 bg-surface-light dark:bg-background-dark"
        id="team"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-ai-blue text-sm font-bold tracking-widest uppercase mb-4 block">
              {data.team.badge}
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
              {data.team.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {data.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.team.members.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-dark rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border-4 border-gray-100 dark:border-gray-700"
                    src={member.image}
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-ai-blue text-sm font-semibold uppercase tracking-wide mb-4">
                  {member.role}
                </p>
                <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed space-y-1">
                  {member.bio.map((line, bioIndex) => (
                    <p key={bioIndex}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-yellow-50 dark:bg-yellow-900/10 border-y border-yellow-100 dark:border-yellow-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white mb-6 leading-tight reveal-text">
            나만의 <span className="text-ai-blue">AI 세무 비서</span>를
            <br />
            만날 준비가 되셨나요?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">
            이미 500개 이상의 회계법인이 TaxAI를 통해 업무 효율을 극대화하고
            있습니다.
          </p>

          <div className="bg-primary rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="relative z-10 text-left">
              <h3 className="font-bold text-2xl text-black mb-2">
                엔터프라이즈 플랜
              </h3>
              <p className="text-black/80 font-medium">
                맞춤형 LLM 학습 & 온프레미스 구축 지원
              </p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <a
                className="block text-center bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl transition border border-transparent hover:border-gray-600 shadow-lg"
                href="#contact"
              >
                영업팀 문의하기
              </a>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none transform group-hover:scale-110 transition duration-700">
              <span className="material-symbols-outlined text-9xl text-black">
                rocket_launch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-light dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-extrabold text-3xl text-center text-gray-900 dark:text-white mb-16 reveal-text">
            {data.faq.title}
          </h2>

          <div className="space-y-4">
            {data.faq.items.map((item, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none select-none">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  <span className="transition-transform duration-300 group-open:rotate-180 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                    <span className="material-symbols-outlined text-gray-500">
                      keyboard_arrow_down
                    </span>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-hero-dark text-white py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Header & Company Info & Map */}
            <div>
              {/* Section Header */}
              <div className="mb-10">
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
                  {data.contact.title}
                </h2>
                <p className="text-gray-400 max-w-xl whitespace-pre-line">
                  {data.contact.description}
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {data.contact.info.address.label}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {data.contact.info.address.value}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">
                      call
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {data.contact.info.phone.label}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {data.contact.info.phone.value}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">
                      mail
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {data.contact.info.email.label}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {data.contact.info.email.value}
                    </p>
                  </div>
                </div>

                {/* Map Placeholder - Google Map will be integrated */}
                <div className="mt-8">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden h-[250px] relative">
                    {/* Google Map iframe - Uses embed (no API key required) */}
                    {/* For JavaScript API, use: import.meta.env.VITE_GOOGLE_MAPS_API_KEY */}
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=서울특별시+강남구+테헤란로+123&zoom=15&language=ko`}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: 'grayscale(100%) invert(92%) contrast(83%)',
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="XAI Korea Office Location"
                    ></iframe>
                    {/* Map overlay button */}
                    <a
                      href="https://maps.google.com/?q=서울특별시+강남구+테헤란로+123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition"
                    >
                      <span className="material-symbols-outlined text-sm">
                        map
                      </span>
                      {data.contact.mapButton}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-background-dark p-8 rounded-2xl border border-gray-800">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      {data.contact.form.name}
                    </label>
                    <input
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
                      placeholder={data.contact.form.namePlaceholder}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      {data.contact.form.company}
                    </label>
                    <input
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
                      placeholder={data.contact.form.companyPlaceholder}
                      type="text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    {data.contact.form.email}
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
                    placeholder={data.contact.form.emailPlaceholder}
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    {data.contact.form.type}
                  </label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition appearance-none cursor-pointer">
                    {data.contact.form.typeOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    {data.contact.form.message}
                  </label>
                  <textarea
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition resize-none"
                    placeholder={data.contact.form.messagePlaceholder}
                    rows={4}
                  ></textarea>
                </div>

                <button
                  className="w-full bg-ai-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
                  type="submit"
                >
                  {data.contact.form.submit}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hero-dark text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-primary">
                  auto_graph
                </span>
                <span className="font-display font-bold text-xl tracking-tight">
                  {data.footer.logo.name}{' '}
                  <span className="text-primary">
                    {data.footer.logo.highlight}
                  </span>
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed whitespace-pre-line">
                {data.footer.tagline}
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <span className="text-gray-400 text-sm">
                    {data.footer.social.facebook}
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <span className="text-gray-400 text-sm">
                    {data.footer.social.linkedin}
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <span className="text-gray-400 text-sm">
                    {data.footer.social.twitter}
                  </span>
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">
                {data.footer.menus.company.title}
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {data.footer.menus.company.items.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-white transition">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h4 className="font-bold text-white mb-4">
                {data.footer.menus.solution.title}
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {data.footer.menus.solution.items.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-white transition">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4">
                {data.footer.menus.legal.title}
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {data.footer.menus.legal.items.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-white transition">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="mb-4 md:mb-0">{data.footer.copyright}</div>
            <div className="text-center md:text-right">
              {data.footer.businessInfo}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
