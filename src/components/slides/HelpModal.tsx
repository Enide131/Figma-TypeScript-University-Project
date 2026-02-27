import { X, HelpCircle, Book, Video, MessageCircle, FileText } from 'lucide-react';
import { useState } from 'react';

interface HelpModalProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function HelpModal({ isDarkMode, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'examples', name: 'Examples', icon: FileText },
    { id: 'tutorials', name: 'Tutorials', icon: Video },
    { id: 'faq', name: 'FAQ', icon: MessageCircle }
  ];

  const content = {
    'getting-started': {
      title: 'Getting Started with LP Solver',
      sections: [
        {
          title: '1. Define Your Objective Function',
          text: 'Enter the coefficients for your objective function (maximize or minimize). Use the input fields to set values for each variable x₁, x₂, x₃, x₄.'
        },
        {
          title: '2. Add Constraints',
          text: 'Click "Add Constraint" to create new constraints. For each constraint, set the coefficients, operator (≤, =, ≥), and the right-hand side value.'
        },
        {
          title: '3. Choose Solution Method',
          text: 'Select your preferred solution method from the dropdown: Bland Rule, Simplex Method, or Two-Phase Method.'
        },
        {
          title: '4. Calculate',
          text: 'Click "Calculate Solution" to solve your linear programming problem and view step-by-step results.'
        }
      ]
    },
    'examples': {
      title: 'Example Problems',
      sections: [
        {
          title: 'Example 1: Production Planning',
          text: 'Maximize: 20x₁ + 30x₂\nSubject to:\n2x₁ + 3x₂ ≤ 100\nx₁ + 2x₂ ≤ 80\nx₁, x₂ ≥ 0'
        },
        {
          title: 'Example 2: Diet Problem',
          text: 'Minimize: 5x₁ + 3x₂\nSubject to:\n4x₁ + 2x₂ ≥ 20\n3x₁ + 5x₂ ≥ 30\nx₁, x₂ ≥ 0'
        },
        {
          title: 'Example 3: Transportation',
          text: 'Minimize: 10x₁ + 15x₂ + 20x₃\nSubject to:\nx₁ + x₂ ≤ 100\nx₂ + x₃ ≤ 150\nx₁, x₂, x₃ ≥ 0'
        }
      ]
    },
    'tutorials': {
      title: 'Video Tutorials',
      sections: [
        {
          title: 'Introduction to Linear Programming',
          text: 'Learn the basics of linear programming and how to formulate problems. Duration: 10 minutes'
        },
        {
          title: 'Using the Simplex Method',
          text: 'Step-by-step tutorial on solving LP problems using the Simplex Method. Duration: 15 minutes'
        },
        {
          title: 'Understanding Bland\'s Rule',
          text: 'Deep dive into Bland\'s Rule for preventing cycling in the Simplex algorithm. Duration: 12 minutes'
        }
      ]
    },
    'faq': {
      title: 'Frequently Asked Questions',
      sections: [
        {
          title: 'What is Bland\'s Rule?',
          text: 'Bland\'s Rule is an anti-cycling pivot rule used in the Simplex method. It ensures that the algorithm terminates in a finite number of steps by selecting the entering and leaving variables with the smallest indices.'
        },
        {
          title: 'Can I solve problems with more than 4 variables?',
          text: 'Yes! You can adjust the number of variables in the Settings menu. The application supports up to 10 variables.'
        },
        {
          title: 'How do I export my results?',
          text: 'Click the "Export" button in the sidebar. You can choose from multiple formats including PDF, JSON, CSV, and TXT.'
        },
        {
          title: 'What if my problem has no feasible solution?',
          text: 'The solver will detect infeasibility and display a message indicating that no feasible solution exists for the given constraints.'
        }
      ]
    }
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border flex flex-col ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`border-b px-6 py-6 flex items-center justify-between flex-shrink-0 ${
          isDarkMode 
            ? 'border-gray-700' 
            : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <HelpCircle className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-gray-700'}`} />
            <h2 className={`text-2xl sm:text-3xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Help & Documentation</h2>
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

        {/* Tabs */}
        <div className={`border-b px-6 flex gap-2 overflow-x-auto flex-shrink-0 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'border-blue-500 text-blue-400'
                      : 'border-gray-800 text-gray-900'
                    : isDarkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className={`text-xl mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{activeContent.title}</h3>
          
          <div className="space-y-6">
            {activeContent.sections.map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h4 className={`text-lg mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{section.title}</h4>
                <p className={`whitespace-pre-line text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{section.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t px-6 py-4 flex justify-between items-center flex-shrink-0 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Need more help? Contact support
          </div>
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
