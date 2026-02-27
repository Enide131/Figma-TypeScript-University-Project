import { X, Globe, Monitor, Zap, Save, Sliders, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import svgPaths from '../../imports/svg-hihmtec3y6';

interface SettingsModalProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isDarkMode, onClose }: SettingsModalProps) {
  const [language, setLanguage] = useState('english');
  const [windowMode, setWindowMode] = useState('full');
  const [themePreference, setThemePreference] = useState('auto');
  const [numVariables, setNumVariables] = useState(4);
  const [decimalPrecision, setDecimalPrecision] = useState(2);
  const [animationSpeed, setAnimationSpeed] = useState('normal');
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-bottom-4 duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Modal Header */}
        <div className={`sticky top-0 z-10 backdrop-blur-sm border-b px-6 sm:px-8 py-6 flex items-center justify-between ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <Sliders className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-gray-700'}`} />
            <h2 className={`text-2xl sm:text-3xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Advanced Settings</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* General Section */}
          <div>
            <h3 className={`text-lg flex items-center gap-2 mb-4 pb-2 border-b ${
              isDarkMode 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            }`}>
              <Globe className="w-5 h-5" />
              General
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Language</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`w-full appearance-none px-4 py-2.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                    }`}
                  >
                    <option value="english">English</option>
                    <option value="russian">Русский</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                    <option value="german">Deutsch</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Window Mode</label>
                <div className="relative">
                  <select
                    value={windowMode}
                    onChange={(e) => setWindowMode(e.target.value)}
                    className={`w-full appearance-none px-4 py-2.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                    }`}
                  >
                    <option value="full">Fullscreen</option>
                    <option value="windowed">Windowed</option>
                    <option value="compact">Compact</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <h3 className={`text-lg flex items-center gap-2 mb-4 pb-2 border-b ${
              isDarkMode 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            }`}>
              <Monitor className="w-5 h-5" />
              Appearance
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Theme Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {['auto', 'light', 'dark'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setThemePreference(theme)}
                      className={`px-4 py-2.5 rounded-lg transition-all capitalize border-2 ${
                        themePreference === theme
                          ? isDarkMode
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-gray-800 border-gray-800 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Animation Speed</label>
                <div className="grid grid-cols-3 gap-2">
                  {['slow', 'normal', 'fast'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={`px-4 py-2.5 rounded-lg transition-all capitalize border-2 ${
                        animationSpeed === speed
                          ? isDarkMode
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-gray-800 border-gray-800 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Section */}
          <div>
            <h3 className={`text-lg flex items-center gap-2 mb-4 pb-2 border-b ${
              isDarkMode 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            }`}>
              <Zap className="w-5 h-5" />
              Calculation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Number of Variables</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={numVariables}
                  onChange={(e) => setNumVariables(parseInt(e.target.value) || 4)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Decimal Precision</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={decimalPrecision}
                  onChange={(e) => setDecimalPrecision(parseInt(e.target.value) || 2)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className={`text-lg flex items-center gap-2 mb-4 pb-2 border-b ${
              isDarkMode 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            }`}>
              <Save className="w-5 h-5" />
              Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    isDarkMode 
                      ? 'border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-gray-500' 
                      : 'border-gray-300 peer-checked:bg-gray-800 peer-checked:border-gray-800 group-hover:border-gray-400'
                  }`}>
                    {autoSave && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39be50} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Auto-save progress</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    isDarkMode 
                      ? 'border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-gray-500' 
                      : 'border-gray-300 peer-checked:bg-gray-800 peer-checked:border-gray-800 group-hover:border-gray-400'
                  }`}>
                    {notifications && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39be50} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Enable notifications</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    isDarkMode 
                      ? 'border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-gray-500' 
                      : 'border-gray-300 peer-checked:bg-gray-800 peer-checked:border-gray-800 group-hover:border-gray-400'
                  }`}>
                    {soundEffects && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39be50} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Sound effects</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              Save & Close
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
