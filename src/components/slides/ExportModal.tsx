import { X, Download, FileText, FileJson, File, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function ExportModal({ isDarkMode, onClose }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [includeSteps, setIncludeSteps] = useState(true);
  const [includeSettings, setIncludeSettings] = useState(false);

  const formats = [
    { id: 'json', name: 'JSON', icon: FileJson, description: 'JavaScript Object Notation' },
    { id: 'pdf', name: 'PDF', icon: FileText, description: 'Portable Document Format' },
    { id: 'txt', name: 'TXT', icon: File, description: 'Plain Text File' },
    { id: 'csv', name: 'CSV', icon: File, description: 'Comma-Separated Values' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-2xl w-full rounded-2xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`border-b px-6 py-6 flex items-center justify-between ${
          isDarkMode 
            ? 'border-gray-700' 
            : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <Download className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-gray-700'}`} />
            <h2 className={`text-2xl sm:text-3xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Export Problem</h2>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className={`block text-sm mb-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Select Format</label>
            <div className="grid grid-cols-2 gap-3">
              {formats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedFormat === format.id
                        ? isDarkMode
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-800 bg-gray-100'
                        : isDarkMode
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-6 h-6 ${
                        selectedFormat === format.id
                          ? isDarkMode ? 'text-blue-400' : 'text-gray-800'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      {selectedFormat === format.id && (
                        <CheckCircle2 className={`w-5 h-5 ${
                          isDarkMode ? 'text-blue-400' : 'text-gray-800'
                        }`} />
                      )}
                    </div>
                    <div className={`font-medium mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{format.name}</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{format.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <label className={`block text-sm mb-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Export Options</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeSteps}
                  onChange={(e) => setIncludeSteps(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Include solution steps</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeSettings}
                  onChange={(e) => setIncludeSettings(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-white' 
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Include settings and configuration</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`text-sm mb-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Export Preview:</div>
            <div className={`font-mono text-xs ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <div>Filename: lp_solver_problem.{selectedFormat}</div>
              <div className="mt-2">Contents:</div>
              <div className="ml-4 mt-1">
                <div>- Objective function</div>
                <div>- Constraints (3)</div>
                {includeSteps && <div>- Solution steps (5)</div>}
                {includeSettings && <div>- Configuration settings</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t px-6 py-4 flex justify-between ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            Export as {selectedFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
