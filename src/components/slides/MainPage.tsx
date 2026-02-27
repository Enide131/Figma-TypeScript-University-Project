import { useState, useCallback } from 'react';
import { Plus, Settings, PlayCircle, Trash2, Sun, Moon, RotateCcw, ChevronDown, Download, Upload, Share2, HelpCircle, History, FileText } from 'lucide-react';
import svgPaths from '../../imports/svg-hihmtec3y6';

interface MainPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (slide: "main" | "solution-steps" | "settings" | "history" | "export" | "help") => void;
}

interface Constraint {
  id: string; // Unique ID for React keys
  coeffs: (number | string)[];
  op: string;
  val: number | string;
}

interface AppState {
  objectiveFunction: (number | string)[];
  objectiveDirection: string;
  constraints: Constraint[];
}

const INITIAL_VAR_COUNT = 4;

const INITIAL_STATE: AppState = {
  objectiveFunction: [0, 0, 0, 0],
  objectiveDirection: 'max',
  constraints: [
    { id: '1', coeffs: [2, -11, -5, 18], op: '≤', val: 0 },
    { id: '2', coeffs: [-1, 4, 2, -8], op: '≤', val: 0 },
    { id: '3', coeffs: [-2, 11, 5, -18], op: '≤', val: 1 }
  ]
};

export default function MainPage({ isDarkMode, onToggleTheme, onNavigate }: MainPageProps) {
  // State
  const [objectiveFunction, setObjectiveFunction] = useState<(number | string)[]>(INITIAL_STATE.objectiveFunction);
  const [objectiveDirection, setObjectiveDirection] = useState<string>(INITIAL_STATE.objectiveDirection);
  const [constraints, setConstraints] = useState<Constraint[]>(INITIAL_STATE.constraints);
  
  // History Stack for Undo
  const [history, setHistory] = useState<AppState[]>([]);

  // Helper to save current state to history before modification
  const saveToHistory = useCallback(() => {
    setHistory(prev => [
      ...prev,
      {
        objectiveFunction: [...objectiveFunction],
        objectiveDirection,
        constraints: JSON.parse(JSON.stringify(constraints)) // Deep copy constraints
      }
    ]);
  }, [objectiveFunction, objectiveDirection, constraints]);

  // Handlers
  const handleAddConstraint = () => {
    saveToHistory();
    const newConstraint: Constraint = {
      id: Date.now().toString(),
      coeffs: Array(INITIAL_VAR_COUNT).fill(0),
      op: '≤',
      val: 0
    };
    setConstraints(prev => [...prev, newConstraint]);
  };

  const handleDeleteConstraint = (index: number) => {
    saveToHistory();
    setConstraints(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    saveToHistory();
    setObjectiveFunction([...INITIAL_STATE.objectiveFunction]);
    setObjectiveDirection(INITIAL_STATE.objectiveDirection);
    setConstraints(JSON.parse(JSON.stringify(INITIAL_STATE.constraints)));
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    setObjectiveFunction(previousState.objectiveFunction);
    setObjectiveDirection(previousState.objectiveDirection);
    setConstraints(previousState.constraints);
  };

  // Input Change Handlers
  const handleObjectiveChange = (index: number, value: string) => {
    // We store the raw string value to allow typing "-", ".", empty string, etc.
    const newObj = [...objectiveFunction];
    newObj[index] = value;
    setObjectiveFunction(newObj);
  };

  const handleObjectiveBlur = (index: number) => {
    // On blur, if the value is invalid or empty, revert to 0 or parse it
    let val = objectiveFunction[index];
    if (val === '' || val === '-' || val === '.') {
      const newObj = [...objectiveFunction];
      newObj[index] = 0;
      setObjectiveFunction(newObj);
    }
    // We don't force-parse to number here to preserve formatting like "1.0" if desired,
    // but usually standardizing to number is cleaner:
    // else {
    //   const newObj = [...objectiveFunction];
    //   newObj[index] = parseFloat(val.toString());
    //   setObjectiveFunction(newObj);
    // }
  };

  const handleObjectiveFocus = () => {
    saveToHistory();
  };

  const handleConstraintChange = (index: number, field: keyof Constraint, value: any, coeffIndex?: number) => {
    const newConstraints = [...constraints];
    if (field === 'coeffs' && typeof coeffIndex === 'number') {
      newConstraints[index].coeffs = [...newConstraints[index].coeffs];
      newConstraints[index].coeffs[coeffIndex] = value; // Store raw string
    } else if (field === 'val') {
      newConstraints[index].val = value; // Store raw string
    } else if (field === 'op') {
      newConstraints[index].op = value;
    }
    setConstraints(newConstraints);
  };
  
  const handleConstraintBlur = (index: number, field: keyof Constraint, coeffIndex?: number) => {
    const newConstraints = [...constraints];
    if (field === 'coeffs' && typeof coeffIndex === 'number') {
      const val = newConstraints[index].coeffs[coeffIndex];
      if (val === '' || val === '-' || val === '.') {
         newConstraints[index].coeffs = [...newConstraints[index].coeffs];
         newConstraints[index].coeffs[coeffIndex] = 0;
         setConstraints(newConstraints);
      }
    } else if (field === 'val') {
      const val = newConstraints[index].val;
      if (val === '' || val === '-' || val === '.') {
         newConstraints[index].val = 0;
         setConstraints(newConstraints);
      }
    }
  };
  
  const handleConstraintFocus = () => {
    saveToHistory();
  };

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
              }`}>LP Solver — Bland Rule</h1>
              <p className={`text-xs sm:text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Linear Programming Optimizer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform hover:rotate-180 duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 transition-transform hover:-rotate-12 duration-500" />
              )}
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group shadow-md transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}>
              <Settings className={`w-5 h-5 group-hover:rotate-90 transition-transform duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-white'
              }`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Main Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Objective Function Card */}
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl sm:text-2xl mb-4 sm:mb-6 border-b pb-3 transition-colors ${
                isDarkMode 
                  ? 'text-white border-gray-700' 
                  : 'text-gray-900 border-gray-200'
              }`}>Objective Function</h2>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className={`transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>f(x) =</span>
                {objectiveFunction.map((coeff, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>+</span>}
                    <input
                      type="number"
                      value={coeff}
                      onFocus={handleObjectiveFocus}
                      onChange={(e) => handleObjectiveChange(i, e.target.value)}
                      onBlur={() => handleObjectiveBlur(i)}
                      className={`w-16 sm:w-20 px-2 sm:px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm sm:text-base ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                      }`}
                      placeholder="0"
                    />
                    <span className={`text-sm sm:text-base transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>x{i + 1}</span>
                  </div>
                ))}
                <span className={`mx-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>→</span>
                <div className="relative">
                  <select
                    value={objectiveDirection}
                    onFocus={handleObjectiveFocus}
                    onChange={(e) => {
                      setObjectiveDirection(e.target.value);
                    }}
                    className={`appearance-none px-4 sm:px-6 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-gray-400'
                    }`}
                  >
                    <option value="max">max</option>
                    <option value="min">min</option>
                  </select>
                  <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>
            </div>

            {/* Constraints Card */}
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl sm:text-2xl mb-4 sm:mb-6 border-b pb-3 transition-colors ${
                isDarkMode 
                  ? 'text-white border-gray-700' 
                  : 'text-gray-900 border-gray-200'
              }`}>Constraints</h2>
              <div className="space-y-3 sm:space-y-4">
                {constraints.map((constraint, index) => (
                  <div key={constraint.id} className={`rounded-lg p-3 sm:p-4 border transition-all group ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
                      <span className={`text-xs sm:text-sm px-2 py-1 rounded transition-colors ${
                        isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>#{index + 1}</span>
                      {constraint.coeffs.map((coeff, i) => (
                        <div key={i} className="flex items-center gap-1 sm:gap-2">
                          {i > 0 && <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>+</span>}
                          <input
                            type="number"
                            value={coeff}
                            onFocus={handleConstraintFocus}
                            onChange={(e) => handleConstraintChange(index, 'coeffs', e.target.value, i)}
                            onBlur={() => handleConstraintBlur(index, 'coeffs', i)}
                            className={`w-14 sm:w-20 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-xs sm:text-base ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                          <span className={`text-xs sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>x{i + 1}</span>
                        </div>
                      ))}
                      <select
                        value={constraint.op}
                        onFocus={handleConstraintFocus}
                        onChange={(e) => handleConstraintChange(index, 'op', e.target.value)}
                        className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-xs sm:text-base ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="≤">≤</option>
                        <option value="=">=</option>
                        <option value="≥">≥</option>
                      </select>
                      <input
                        type="number"
                        value={constraint.val}
                        onFocus={handleConstraintFocus}
                        onChange={(e) => handleConstraintChange(index, 'val', e.target.value)}
                        onBlur={() => handleConstraintBlur(index, 'val')}
                        className={`w-16 sm:w-24 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-xs sm:text-base ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <button
                        onClick={() => handleDeleteConstraint(index)}
                        className={`ml-auto p-2 rounded-lg transition-all hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-red-900/30' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleAddConstraint}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 sm:gap-3 group ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform" />
                <span className="text-sm sm:text-lg">Add Constraint</span>
              </button>
              <button 
                onClick={handleUndo}
                disabled={history.length === 0}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                  history.length === 0
                    ? `opacity-50 cursor-not-allowed ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white'}`
                    : `hover:shadow-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`
                }`}
              >
                <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 ${history.length > 0 ? 'group-hover:-rotate-180 transition-transform duration-500' : ''}`} />
                <span className="text-sm sm:text-lg">Undo</span>
              </button>
              <button 
                onClick={handleReset}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all ${
                  isDarkMode 
                    ? 'bg-red-900/50 hover:bg-red-900/70 text-red-300' 
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                <span className="text-sm sm:text-lg">Reset</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Tools */}
          <div className="space-y-4 sm:space-y-6">
            <div className={`rounded-xl shadow-md border p-4 sm:p-6 hover:shadow-lg transition-all duration-300 lg:sticky lg:top-8 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg sm:text-xl mb-4 sm:mb-6 border-b pb-3 transition-colors ${
                isDarkMode 
                  ? 'text-white border-gray-700' 
                  : 'text-gray-900 border-gray-200'
              }`}>Settings</h3>
              
              {/* Checkboxes */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <label className="flex items-start sm:items-center gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5 sm:mt-0">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                      isDarkMode 
                        ? 'border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600' 
                        : 'border-gray-300 peer-checked:bg-gray-800 peer-checked:border-gray-800'
                    }`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39be50} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className={`text-sm sm:text-base transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  }`}>Show solution steps</span>
                </label>

                <label className="flex items-start sm:items-center gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5 sm:mt-0">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                      isDarkMode 
                        ? 'border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600' 
                        : 'border-gray-300 peer-checked:bg-gray-800 peer-checked:border-gray-800'
                    }`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p39be50} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className={`text-sm sm:text-base transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  }`}>Auto-generate simplex tableau</span>
                </label>
              </div>

              {/* Method Selector */}
              <div className="mb-4 sm:mb-6">
                <label className={`block text-xs sm:text-sm mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Solution Method</label>
                <div className="relative">
                  <select
                    defaultValue="bland"
                    className={`w-full appearance-none px-3 sm:px-4 py-2 sm:py-3 pr-10 border rounded-lg text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="bland">Bland Rule</option>
                    <option value="simplex">Simplex Method</option>
                    <option value="two-phase">Two-Phase Method</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              {/* Calculate Button */}
              <button 
                onClick={() => onNavigate('solution-steps')}
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 group hover:scale-[1.02] active:scale-[0.98] ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white'
                }`}
              >
                <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg">Calculate Solution</span>
              </button>

              {/* Additional Action Buttons */}
              <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t space-y-3 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button 
                    onClick={() => onNavigate('export')}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs sm:text-sm">Export</span>
                  </button>

                  <button className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Upload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    <span className="text-xs sm:text-sm">Import</span>
                  </button>

                  <button className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs sm:text-sm">Share</span>
                  </button>

                  <button className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm">Report</span>
                  </button>
                </div>

                <button 
                  onClick={() => onNavigate('history')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-650 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <History className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-xs sm:text-sm">View History (0)</span>
                </button>

                <button 
                  onClick={() => onNavigate('help')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-blue-900/30 hover:bg-blue-900/50 text-blue-300' 
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm">Help & Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
