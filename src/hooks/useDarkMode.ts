/**
 * useDarkMode Hook
 * Constitution II: View & Logic Separation
 */
import { useEffect, useState } from 'react';

function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  const toggle = (): void => {
    setIsDark((prev) => !prev);
  };

  return [isDark, toggle];
}

export default useDarkMode;
