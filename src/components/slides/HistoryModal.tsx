import { X, History, RotateCcw, Trash2, Clock } from 'lucide-react';

interface HistoryModalProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function HistoryModal({ isDarkMode, onClose }: HistoryModalProps) {
  const historyItems = [
    {
      id: 1,
      timestamp: '2024-12-10 14:30',
      objective: 'max: 20x₁ − 53x₂ − 41x₃ + 204x₄',
      constraints: 3,
      variables: 4
    },
    {
      id: 2,
      timestamp: '2024-12-10 13:15',
      objective: 'min: 5x₁ + 3x₂ + 8x₃',
      constraints: 2,
      variables: 3
    },
    {
      id: 3,
      timestamp: '2024-12-10 12:00',
      objective: 'max: 10x₁ + 15x₂',
      constraints: 4,
      variables: 2
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 backdrop-blur-sm border-b px-6 py-6 flex items-center justify-between ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <History className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-gray-700'}`} />
            <h2 className={`text-2xl sm:text-3xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>History</h2>
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
        <div className="p-6 space-y-4">
          {historyItems.length === 0 ? (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No history items yet</p>
              <p className="text-sm mt-2">Your previous problems will appear here</p>
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 transition-all hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p className={`font-mono text-sm mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {item.objective}
                    </p>
                    <div className="flex gap-4 text-xs">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {item.constraints} constraints
                      </span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {item.variables} variables
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded-lg transition-all hover:scale-110 ${
                        isDarkMode 
                          ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                      title="Restore"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 rounded-lg transition-all hover:scale-110 ${
                        isDarkMode 
                          ? 'text-red-400 hover:bg-red-900/30' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={`border-t px-6 py-4 flex justify-between ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'text-red-400 hover:bg-red-900/30' 
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            Clear All History
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
