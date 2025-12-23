/**
 * App Component
 * Constitution I: Functional Component with Hooks
 * Constitution IV: Single Responsibility - Main app shell
 */
import type { ReactElement } from 'react';
import LandingPage from './pages/LandingPage';

function App(): ReactElement {
  return <LandingPage />;
}

export default App;
