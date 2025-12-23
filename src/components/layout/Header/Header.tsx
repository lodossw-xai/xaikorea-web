/**
 * Header Component
 * Constitution I: Functional Component
 * Constitution IV: Single Responsibility - Navigation header
 */
import type { ReactElement } from 'react';
import type { HeaderProps } from './Header.types';

function Header({ onToggleDarkMode }: HeaderProps): ReactElement {
  return (
    <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-black dark:text-primary">
              auto_graph
            </span>
            <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              Tax<span className="text-primary">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
              href="#home"
            >
              홈
            </a>
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
              href="#services"
            >
              서비스
            </a>
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
              href="#advisors"
            >
              자문단
            </a>
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-primary font-medium transition"
              href="#team"
            >
              팀 소개
            </a>

            {/* Language Toggle */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-1 py-1">
              <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
                EN
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-900 text-white rounded-full transition">
                KR
              </button>
            </div>

            {/* Contact Button */}
            <a
              className="bg-primary hover:bg-primary-hover text-black font-bold py-2.5 px-6 rounded-lg transition shadow-lg shadow-yellow-500/20"
              href="#contact"
            >
              문의하기
            </a>

            {/* Dark Mode Toggle */}
            <button
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined">brightness_4</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-900 dark:text-white focus:outline-none">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
