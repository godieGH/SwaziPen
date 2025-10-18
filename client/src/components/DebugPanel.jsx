import { useState } from 'react';
import { 
  VscDebugStart,
  VscDebugPause,
  VscDebugStop,
  VscDebugRestart,
  VscDebugStepOver,
  VscDebugStepInto,
  VscDebugStepOut,
  VscChevronDown,
  VscChevronRight,
  VscAdd,
  VscClose,
  VscCircleFilled,
  VscDebugConsole,
  VscTerminal,
  VscOutput,
  VscWarning,
  VscError,
  VscInfo
} from 'react-icons/vsc';

function DebugPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState('variables');
  const [expandedSections, setExpandedSections] = useState({
    variables: true,
    watch: true,
    breakpoints: true,
    callStack: true
  });

  const [variables] = useState([
    { name: 'counter', value: '42', type: 'number' },
    { name: 'userName', value: '"John Doe"', type: 'string' },
    { name: 'isActive', value: 'true', type: 'boolean' },
    { name: 'userData', value: '{...}', type: 'object', expandable: true }
  ]);

  const [watchExpressions, setWatchExpressions] = useState([
    { expression: 'counter > 10', value: 'true' },
    { expression: 'userName.length', value: '8' }
  ]);

  const [breakpoints] = useState([
    { file: 'src/App.jsx', line: 15, active: true },
    { file: 'src/utils/helper.js', line: 42, active: true },
    { file: 'src/components/Header.jsx', line: 8, active: false }
  ]);

  const [callStack] = useState([
    { name: 'handleClick', file: 'App.jsx', line: 25 },
    { name: 'processData', file: 'utils.js', line: 15 },
    { name: 'fetchUser', file: 'api.js', line: 8 }
  ]);

  const [consoleOutput] = useState([
    { type: 'log', message: 'Application started', timestamp: '10:23:45' },
    { type: 'warning', message: 'Deprecation warning: oldFunction()', timestamp: '10:23:46' },
    { type: 'error', message: 'TypeError: Cannot read property "id"', timestamp: '10:23:47' },
    { type: 'log', message: 'User logged in successfully', timestamp: '10:23:48' }
  ]);

  const [newWatch, setNewWatch] = useState('');
  const [configurations] = useState([
    'Launch Chrome',
    'Launch Firefox',
    'Node.js',
    'Python: Current File',
    'Attach to Process'
  ]);
  const [selectedConfig, setSelectedConfig] = useState('Launch Chrome');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    console.log('Debug started with config:', selectedConfig);
  };

  const handlePause = () => {
    setIsPaused(true);
    console.log('Debug paused');
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    console.log('Debug stopped');
  };

  const handleRestart = () => {
    console.log('Debug restarted');
  };

  const handleStepOver = () => {
    console.log('Step over');
  };

  const handleStepInto = () => {
    console.log('Step into');
  };

  const handleStepOut = () => {
    console.log('Step out');
  };

  const addWatchExpression = () => {
    if (newWatch.trim()) {
      setWatchExpressions([...watchExpressions, { expression: newWatch, value: 'evaluating...' }]);
      setNewWatch('');
    }
  };

  const removeWatch = (index) => {
    setWatchExpressions(watchExpressions.filter((_, i) => i !== index));
  };

  const getConsoleIcon = (type) => {
    switch (type) {
      case 'error':
        return <VscError className="text-red-500" size={12} />;
      case 'warning':
        return <VscWarning className="text-yellow-500" size={12} />;
      case 'info':
        return <VscInfo className="text-blue-500" size={12} />;
      default:
        return <VscCircleFilled className="text-gray-500" size={8} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <div className="border-b border-[#191919] px-3 py-2">
        <h1 className="text-xs font-semibold text-white mb-2">Run and Debug</h1>
        
        {/* Configuration Selector */}
        <select
          value={selectedConfig}
          onChange={(e) => setSelectedConfig(e.target.value)}
          className="w-full px-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8] mb-2"
        >
          {configurations.map(config => (
            <option key={config} value={config}>{config}</option>
          ))}
        </select>

        {/* Debug Controls */}
        <div className="flex items-center gap-1">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-1 px-2 py-1.5 text-xs bg-[#16825d] hover:bg-[#1a9d6e] text-white rounded transition-colors"
              title="Start Debugging (F5)"
            >
              <VscDebugStart size={14} />
              <span>Start</span>
            </button>
          ) : (
            <>
              {!isPaused ? (
                <button
                  onClick={handlePause}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                  title="Pause (F6)"
                >
                  <VscDebugPause size={14} />
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="p-1.5 text-[#16825d] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                  title="Continue (F5)"
                >
                  <VscDebugStart size={14} />
                </button>
              )}
              <button
                onClick={handleStop}
                className="p-1.5 text-red-500 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                title="Stop (Shift+F5)"
              >
                <VscDebugStop size={14} />
              </button>
              <button
                onClick={handleRestart}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                title="Restart (Ctrl+Shift+F5)"
              >
                <VscDebugRestart size={14} />
              </button>
              <div className="w-px h-4 bg-[#3e3e42] mx-1" />
              <button
                onClick={handleStepOver}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Over (F10)"
              >
                <VscDebugStepOver size={14} />
              </button>
              <button
                onClick={handleStepInto}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Into (F11)"
              >
                <VscDebugStepInto size={14} />
              </button>
              <button
                onClick={handleStepOut}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Out (Shift+F11)"
              >
                <VscDebugStepOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#191919]">
        <button
          onClick={() => setActiveTab('variables')}
          className={`flex-1 px-2 py-1.5 text-xs transition-colors ${
            activeTab === 'variables'
              ? 'text-white border-b-2 border-[#00bac8]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Variables
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`flex-1 px-2 py-1.5 text-xs transition-colors ${
            activeTab === 'console'
              ? 'text-white border-b-2 border-[#00bac8]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Console
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'variables' ? (
          <div>
            {/* Variables Section */}
            <Section
              title="Variables"
              isExpanded={expandedSections.variables}
              onToggle={() => toggleSection('variables')}
            >
              {variables.map((variable, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1 px-2 hover:bg-[#2a2d2e] rounded">
                  <span className="text-[10px] text-[#9cdcfe] font-mono">{variable.name}</span>
                  <span className="text-[10px] text-gray-500">:</span>
                  <span className="text-[10px] text-[#ce9178] font-mono">{variable.value}</span>
                </div>
              ))}
            </Section>

            {/* Watch Section */}
            <Section
              title="Watch"
              isExpanded={expandedSections.watch}
              onToggle={() => toggleSection('watch')}
            >
              <div className="space-y-1">
                {watchExpressions.map((watch, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded group">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[10px] text-[#9cdcfe] font-mono truncate">{watch.expression}</span>
                      <span className="text-[10px] text-gray-500">:</span>
                      <span className="text-[10px] text-[#ce9178] font-mono">{watch.value}</span>
                    </div>
                    <button
                      onClick={() => removeWatch(idx)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-opacity"
                    >
                      <VscClose size={12} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-1 pt-1">
                  <input
                    type="text"
                    value={newWatch}
                    onChange={(e) => setNewWatch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addWatchExpression()}
                    placeholder="Add expression..."
                    className="flex-1 px-2 py-1 text-[10px] bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
                  />
                  <button
                    onClick={addWatchExpression}
                    className="p-1 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                    title="Add Watch"
                  >
                    <VscAdd size={14} />
                  </button>
                </div>
              </div>
            </Section>

            {/* Call Stack Section */}
            <Section
              title="Call Stack"
              isExpanded={expandedSections.callStack}
              onToggle={() => toggleSection('callStack')}
            >
              {callStack.map((call, idx) => (
                <button
                  key={idx}
                  className="w-full text-left py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors"
                  onClick={() => console.log('Navigate to:', call)}
                >
                  <div className="text-[10px] text-[#cccccc] font-mono">{call.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {call.file}:{call.line}
                  </div>
                </button>
              ))}
            </Section>

            {/* Breakpoints Section */}
            <Section
              title="Breakpoints"
              isExpanded={expandedSections.breakpoints}
              onToggle={() => toggleSection('breakpoints')}
            >
              {breakpoints.map((bp, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1 px-2 hover:bg-[#2a2d2e] rounded">
                  <VscCircleFilled
                    size={10}
                    className={bp.active ? 'text-red-500' : 'text-gray-600'}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#cccccc] truncate">{bp.file}</div>
                    <div className="text-[10px] text-gray-500">Line {bp.line}</div>
                  </div>
                </div>
              ))}
            </Section>
          </div>
        ) : (
          /* Console Output */
          <div className="p-2 space-y-1 font-mono">
            {consoleOutput.map((output, idx) => (
              <div key={idx} className="flex items-start gap-2 py-1 px-2 hover:bg-[#2a2d2e] rounded">
                {getConsoleIcon(output.type)}
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] ${
                    output.type === 'error' ? 'text-red-400' :
                    output.type === 'warning' ? 'text-yellow-400' :
                    'text-[#cccccc]'
                  }`}>
                    {output.message}
                  </div>
                  <div className="text-[9px] text-gray-600">{output.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      {isRunning && (
        <div className="px-3 py-2 border-t border-[#191919] flex items-center gap-2">
          <VscCircleFilled size={8} className={isPaused ? 'text-yellow-500' : 'text-green-500'} />
          <span className="text-[10px] text-gray-400">
            {isPaused ? 'Paused on line 42' : 'Running...'}
          </span>
        </div>
      )}
    </div>
  );
}

// Section Component
function Section({ title, isExpanded, onToggle, children }) {
  return (
    <div className="border-t border-[#3e3e42]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#2a2d2e] transition-colors"
      >
        <h2 className="text-xs font-semibold text-white">{title}</h2>
        {isExpanded ? (
          <VscChevronDown className="text-gray-400" size={14} />
        ) : (
          <VscChevronRight className="text-gray-400" size={14} />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default DebugPanel;