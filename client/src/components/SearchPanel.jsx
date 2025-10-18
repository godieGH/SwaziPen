import { useState } from 'react';
import { 
  VscSearch, 
  VscRegex, 
  VscCaseSensitive, 
  VscWholeWord,
  VscChevronDown,
  VscChevronRight,
  VscReplace,
  VscReplaceAll,
  VscClose,
  VscRefresh
} from 'react-icons/vsc';

function SearchPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isWholeWord, setIsWholeWord] = useState(false);
  const [goToLine, setGoToLine] = useState('');
  const [searchResults, setSearchResults] = useState([
    { file: 'src/App.jsx', line: 15, content: 'import React from "react";', match: 'React' },
    { file: 'src/components/Header.jsx', line: 8, content: 'const Header = () => {', match: 'Header' },
    { file: 'src/utils/helpers.js', line: 23, content: 'export function helper() {', match: 'helper' }
  ]);
  const [expandedFiles, setExpandedFiles] = useState({});

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, {
      isRegex,
      isCaseSensitive,
      isWholeWord
    });
    // Your search logic here
  };

  const handleReplace = () => {
    console.log('Replace:', searchQuery, 'with:', replaceValue);
    // Your replace logic here
  };

  const handleReplaceAll = () => {
    console.log('Replace all:', searchQuery, 'with:', replaceValue);
    // Your replace all logic here
  };

  const handleGoToLine = () => {
    console.log('Go to line:', goToLine);
    // Your go to line logic here
  };

  const toggleFile = (file) => {
    setExpandedFiles(prev => ({
      ...prev,
      [file]: !prev[file]
    }));
  };

  // Group results by file
  const groupedResults = searchResults.reduce((acc, result) => {
    if (!acc[result.file]) {
      acc[result.file] = [];
    }
    acc[result.file].push(result);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <div className="border-b border-[#191919] px-3 py-2">
        <h1 className="text-xs font-semibold text-white mb-2">Search</h1>
      </div>

      {/* Search Box */}
      <div className="px-3 py-2 space-y-2 border-b border-[#191919]">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search"
            className="w-full pl-2 pr-20 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <button
              onClick={() => setIsCaseSensitive(!isCaseSensitive)}
              className={`p-1 rounded hover:bg-[#2a2d2e] transition-colors ${
                isCaseSensitive ? 'text-[#00bac8]' : 'text-gray-500'
              }`}
              title="Match Case"
            >
              <VscCaseSensitive size={14} />
            </button>
            <button
              onClick={() => setIsWholeWord(!isWholeWord)}
              className={`p-1 rounded hover:bg-[#2a2d2e] transition-colors ${
                isWholeWord ? 'text-[#00bac8]' : 'text-gray-500'
              }`}
              title="Match Whole Word"
            >
              <VscWholeWord size={14} />
            </button>
            <button
              onClick={() => setIsRegex(!isRegex)}
              className={`p-1 rounded hover:bg-[#2a2d2e] transition-colors ${
                isRegex ? 'text-[#00bac8]' : 'text-gray-500'
              }`}
              title="Use Regular Expression"
            >
              <VscRegex size={14} />
            </button>
          </div>
        </div>

        {/* Replace Toggle */}
        <button
          onClick={() => setShowReplace(!showReplace)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {showReplace ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
          <span>Replace</span>
        </button>

        {/* Replace Box */}
        {showReplace && (
          <div className="space-y-2">
            <input
              type="text"
              value={replaceValue}
              onChange={(e) => setReplaceValue(e.target.value)}
              placeholder="Replace"
              className="w-full px-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
            />
            <div className="flex gap-1">
              <button
                onClick={handleReplace}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white rounded transition-colors"
                title="Replace"
              >
                <VscReplace size={14} />
                <span>Replace</span>
              </button>
              <button
                onClick={handleReplaceAll}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white rounded transition-colors"
                title="Replace All"
              >
                <VscReplaceAll size={14} />
                <span>All</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Go to Line */}
      <div className="px-3 py-2 border-b border-[#191919]">
        <div className="flex gap-1">
          <input
            type="number"
            value={goToLine}
            onChange={(e) => setGoToLine(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGoToLine()}
            placeholder="Go to line..."
            className="flex-1 px-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
          />
          <button
            onClick={handleGoToLine}
            className="px-3 py-1.5 text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white rounded transition-colors"
            title="Go to Line"
          >
            Go
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#191919]">
        <span className="text-xs text-gray-400">
          {searchResults.length} results in {Object.keys(groupedResults).length} files
        </span>
        <button
          onClick={handleSearch}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          title="Refresh"
        >
          <VscRefresh size={14} />
        </button>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(groupedResults).length === 0 ? (
          <div className="px-3 py-4 text-xs text-gray-500 text-center">
            No results found
          </div>
        ) : (
          <div>
            {Object.entries(groupedResults).map(([file, results]) => (
              <div key={file} className="border-b border-[#191919]">
                {/* File Header */}
                <button
                  onClick={() => toggleFile(file)}
                  className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a2d2e] transition-colors"
                >
                  {expandedFiles[file] ? (
                    <VscChevronDown size={14} className="text-gray-400" />
                  ) : (
                    <VscChevronRight size={14} className="text-gray-400" />
                  )}
                  <span className="text-xs text-white truncate">{file}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {results.length}
                  </span>
                </button>

                {/* File Results */}
                {expandedFiles[file] && (
                  <div>
                    {results.map((result, idx) => (
                      <button
                        key={idx}
                        className="w-full px-3 py-1.5 pl-8 hover:bg-[#2a2d2e] transition-colors text-left"
                        onClick={() => console.log('Navigate to:', result)}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] text-gray-500 font-mono">
                            {result.line}
                          </span>
                          <div className="flex-1 min-w-0">
                            <pre className="text-[10px] text-[#cccccc] font-mono whitespace-pre-wrap break-all">
                              {result.content}
                            </pre>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Info Footer */}
      <div className="px-3 py-2 border-t border-[#191919] text-[10px] text-gray-500">
        <div className="space-y-0.5">
          <div>Press <kbd className="px-1 bg-[#3c3c3c] rounded">Enter</kbd> to search</div>
          {isRegex && <div className="text-[#00bac8]">• Regex mode enabled</div>}
          {isCaseSensitive && <div className="text-[#00bac8]">• Case sensitive</div>}
          {isWholeWord && <div className="text-[#00bac8]">• Whole word</div>}
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;