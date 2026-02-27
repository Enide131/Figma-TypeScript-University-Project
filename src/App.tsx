import { useState } from 'react';
import { PrintStyles } from './components/PrintStyles';

// --- Page Components ---
import MainPage from './components/slides/MainPage';
import SolutionStepsPage from './components/slides/SolutionStepsPage';

// --- Modal Components ---
import SettingsModal from './components/slides/SettingsModal';
import HistoryModal from './components/slides/HistoryModal';
import ExportModal from './components/slides/ExportModal';
import HelpModal from './components/slides/HelpModal';

// --- Layout Components ---
import Footer from './components/Footer';

type SlideType = 'main' | 'solution-steps' | 'settings' | 'history' | 'export' | 'help';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<SlideType>('main');
  const [previousSlide, setPreviousSlide] = useState<SlideType>('main');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigateToSlide = (slide: string) => {
    setPreviousSlide(currentSlide);
    setCurrentSlide(slide as SlideType);
  };

  const goBack = () => {
    setCurrentSlide(previousSlide);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {/* Inject Print Styles globally */}
      <PrintStyles />

      {/* Slide Container */}
      <div className="w-full min-h-full flex flex-col">
        <div className="flex-1">
          {currentSlide === 'main' && (
            <MainPage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onNavigate={navigateToSlide}
            />
          )}
          
          {currentSlide === 'solution-steps' && (
            <SolutionStepsPage
              isDarkMode={isDarkMode}
              onNavigate={navigateToSlide}
              // Explicitly navigate to 'main' on back to prevent history loops
              onBack={() => navigateToSlide('main')}
              onToggleTheme={toggleTheme}
            />
          )}
          
          {currentSlide === 'settings' && (
            <SettingsModal
              isDarkMode={isDarkMode}
              onClose={goBack}
            />
          )}
          
          {currentSlide === 'history' && (
            <HistoryModal
              isDarkMode={isDarkMode}
              onClose={goBack}
            />
          )}
          
          {currentSlide === 'export' && (
            <ExportModal
              isDarkMode={isDarkMode}
              onClose={goBack}
            />
          )}
          
          {currentSlide === 'help' && (
            <HelpModal
              isDarkMode={isDarkMode}
              onClose={goBack}
            />
          )}
        </div>
        
        {(currentSlide === 'main' || currentSlide === 'solution-steps') && (
            <Footer isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
}
