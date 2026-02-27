import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, Settings, Copy, Printer, Download, RefreshCw, Maximize2, Minimize2, Sun, Moon } from 'lucide-react';

interface SolutionStepsPageProps {
  isDarkMode: boolean;
  onNavigate: (slide: "main" | "solution-steps" | "settings" | "history" | "export" | "help") => void;
  onBack: () => void;
  onToggleTheme: () => void;
}

export default function SolutionStepsPage({ isDarkMode, onNavigate, onBack, onToggleTheme }: SolutionStepsPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showEquations, setShowEquations] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // In a real app, this would generate a PDF file.
    // For this prototype, we use the browser's print-to-pdf capability.
    alert("To export as PDF, please choose 'Save as PDF' in the destination dropdown of the print dialog.");
    window.print();
  };

  const steps = [
    {
      id: 1,
      title: "Step 1: Introduce auxiliary variables",
      description: "In the first step, we introduce auxiliary variables x5, x6, and x7 in an appropriate way, which will also be basic variables:",
      equations: [
        "f(x₁, x₂, x₃, x₄) = 20x₁ − 53x₂ − 41x₃ + 204x₄ → min",
        "2x₁ − 11x₂ − 5x₃ + 18x₄ + x₅ = 0",
        "−x₁ + 4x₂ + 2x₃ − 8x₄ + x₆ = 0",
        "−2x₁ + 11x₂ + 5x₃ − 18x₄ + x₇ = 1",
        "x₁,...,₇ ≥ 0"
      ]
    },
    {
      id: 2,
      title: "Step 2: Set up initial tableau",
      description: "We create the initial simplex tableau with the basic variables and coefficients:",
      equations: [
        "Basic variables: x₅, x₆, x₇",
        "Objective row: 20, -53, -41, 204, 0, 0, 0",
        "Check optimality conditions"
      ]
    },
    {
      id: 3,
      title: "Step 3: Apply Bland's Rule",
      description: "Using Bland's rule to select pivot column (most negative coefficient in objective function):",
      equations: [
        "Pivot column: x₂ (coefficient -53)",
        "Calculate ratios for pivot row selection",
        "Select pivot row with minimum ratio"
      ]
    },
    {
      id: 4,
      title: "Step 4: Perform pivot operation",
      description: "Execute pivot operation to get new basic feasible solution:",
      equations: [
        "New basic variable enters: x₂",
        "Old basic variable exits: x₆",
        "Update tableau using row operations"
      ]
    },
    {
      id: 5,
      title: "Step 5: Check for optimality",
      description: "Verify if current solution is optimal:",
      equations: [
        "Check objective row coefficients",
        "All coefficients ≥ 0 → optimal",
        "Negative coefficient exists → continue iterations"
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* Header */}
      <header className={`border-b shadow-sm transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                : 'bg-gradient-to-br from-gray-800 to-gray-600'
            }`}>
              <span className="text-white font-bold text-lg sm:text-xl">LP</span>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl lg:text-3xl tracking-tight transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Solution Steps — Bland Rule</h1>
              <p className={`text-xs sm:text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Step-by-step solution process</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onToggleTheme}
              className={`p-2 sm:p-3 rounded-lg transition-all hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 sm:p-3 rounded-lg transition-all hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className={`p-2 sm:p-3 rounded-lg transition-all hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onBack}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl shadow-md border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Progress
            </span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isDarkMode ? 'bg-blue-500' : 'bg-gray-800'
              }`}
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all hover:scale-110 ${
                  idx === currentStep
                    ? isDarkMode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-white'
                    : idx < currentStep
                      ? isDarkMode
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-300 text-gray-700'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
          {/* Left Panel - Content */}
          <div className="space-y-6">
            {/* Step Content Card */}
            <div className={`rounded-xl shadow-lg border p-6 sm:p-8 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs mb-3 ${
                    isDarkMode 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    Step {currentStep + 1}
                  </div>
                  <h2 className={`text-2xl sm:text-3xl mb-3 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{steps[currentStep].title}</h2>
                  <p className={`text-base sm:text-lg transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{steps[currentStep].description}</p>
                </div>
              </div>

              {/* Equations Section */}
              {showEquations && (
                <div className={`mt-6 p-4 sm:p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {currentStep === 1 ? "Simplex Tableau" : "Mathematical Expressions"}
                    </h3>
                    <button
                      className={`p-2 rounded-lg transition-all hover:scale-110 ${
                        isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                          : 'bg-white hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {currentStep === 1 ? (
                    <div className="overflow-x-auto">
                      <table className={`w-full text-sm border-collapse ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead>
                          <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                            <th className="p-2 border-r border-dashed border-gray-500/30">Basis</th>
                            <th className="p-2">x₁</th>
                            <th className="p-2">x₂</th>
                            <th className="p-2">x₃</th>
                            <th className="p-2">x₄</th>
                            <th className="p-2">x₅</th>
                            <th className="p-2">x₆</th>
                            <th className="p-2 border-r border-dashed border-gray-500/30">x₇</th>
                            <th className="p-2">RHS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <td className="p-2 font-semibold border-r border-dashed border-gray-500/30">x₅</td>
                            <td className="p-2">2</td>
                            <td className="p-2">-11</td>
                            <td className="p-2">-5</td>
                            <td className="p-2">18</td>
                            <td className="p-2">1</td>
                            <td className="p-2">0</td>
                            <td className="p-2 border-r border-dashed border-gray-500/30">0</td>
                            <td className="p-2">0</td>
                          </tr>
                          <tr className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <td className="p-2 font-semibold border-r border-dashed border-gray-500/30">x₆</td>
                            <td className="p-2">-1</td>
                            <td className="p-2">4</td>
                            <td className="p-2">2</td>
                            <td className="p-2">-8</td>
                            <td className="p-2">0</td>
                            <td className="p-2">1</td>
                            <td className="p-2 border-r border-dashed border-gray-500/30">0</td>
                            <td className="p-2">0</td>
                          </tr>
                          <tr className={`border-b-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                            <td className="p-2 font-semibold border-r border-dashed border-gray-500/30">x₇</td>
                            <td className="p-2">-2</td>
                            <td className="p-2">11</td>
                            <td className="p-2">5</td>
                            <td className="p-2">-18</td>
                            <td className="p-2">0</td>
                            <td className="p-2">0</td>
                            <td className="p-2 border-r border-dashed border-gray-500/30">1</td>
                            <td className="p-2">1</td>
                          </tr>
                          <tr className={`font-bold ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                            <td className="p-2 border-r border-dashed border-gray-500/30">Obj</td>
                            <td className="p-2">20</td>
                            <td className="p-2 text-red-500">-53</td>
                            <td className="p-2">-41</td>
                            <td className="p-2">204</td>
                            <td className="p-2">0</td>
                            <td className="p-2">0</td>
                            <td className="p-2 border-r border-dashed border-gray-500/30">0</td>
                            <td className="p-2">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {steps[currentStep].equations.map((eq, idx) => (
                        <div 
                          key={idx}
                          className={`font-mono p-3 rounded transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-200' 
                              : 'bg-white text-gray-800'
                          }`}
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {eq}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={`flex-1 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-lg">Previous</span>
              </button>
              <button
                onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
                disabled={currentStep === steps.length - 1}
                className={`flex-1 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <span className="text-lg">Next</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Panel - Controls */}
          <div className="space-y-6">
            {/* Display Options */}
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 pb-3 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-700' 
                  : 'text-gray-900 border-gray-200'
              }`}>Display Options</h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showEquations}
                    onChange={(e) => setShowEquations(e.target.checked)}
                    className="w-5 h-5 rounded transition-all"
                  />
                  <span className={`text-sm transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 group-hover:text-white' 
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>Show equations</span>
                </label>

                <div>
                  <label className={`block text-sm mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Font Size: {fontSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg mb-4 pb-3 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-700' 
                  : 'text-gray-900 border-gray-200'
              }`}>Actions</h3>

              <div className="space-y-3">
                <button 
                  onClick={handlePrint}
                  className={`w-full px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  <Printer className="w-4 h-4" />
                  <span className="text-sm">Print Solution</span>
                </button>

                <button 
                  onClick={handleExportPDF}
                  className={`w-full px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Export as PDF</span>
                </button>

                <button 
                  onClick={() => setCurrentStep(0)}
                  className={`w-full px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">Restart</span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 ${
              isDarkMode 
                ? 'bg-blue-900/20 border-blue-800' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h3 className={`text-lg mb-3 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-900'
              }`}>Quick Summary</h3>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                <li>• Total steps: {steps.length}</li>
                <li>• Current: Step {currentStep + 1}</li>
                <li>• Method: Bland Rule</li>
                <li>• Status: {currentStep === steps.length - 1 ? 'Completed' : 'In Progress'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}