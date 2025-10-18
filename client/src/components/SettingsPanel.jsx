import { useState } from 'react';
import { VscChevronRight, VscChevronDown, VscSearch } from 'react-icons/vsc';

function SettingsPanel() {
  const [expandedSections, setExpandedSections] = useState({
    appearance: true,
    editor: true,
    advanced: false
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [settings, setSettings] = useState({
    // Appearance
    theme: 'monokai',
    textSize: 'medium',
    nightMode: true,
    
    // Editor
    fontSize: 14,
    indentGuides: true,
    lineNumbers: true,
    wordWrap: false,
    tabSize: 4,
    lineHeight: 1.5,
    fontFamily: 'Fira Code',
    cursorStyle: 'line',
    renderWhitespace: 'selection',
    
    // Advanced
    autoSave: 'afterDelay',
    formatOnSave: false,
    minimap: true,
    scrollBeyondLastLine: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const themes = [
    'Monokai',
    'Dracula',
    'One Dark Pro',
    'GitHub Dark',
    'Solarized Dark',
    'Night Owl',
    'Cobalt2',
    'Material Theme'
  ];

  const textSizes = ['Small', 'Medium', 'Large'];
  const fontSizes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24];
  const tabSizes = [2, 3, 4, 6, 8];
  const lineHeights = [1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0];
  const fontFamilies = [
    'Fira Code',
    'Consolas',
    'Monaco',
    'Courier New',
    'Source Code Pro',
    'JetBrains Mono',
    'Cascadia Code'
  ];
  const cursorStyles = ['line', 'block', 'underline'];
  const whitespaceOptions = ['none', 'selection', 'all'];
  const autoSaveOptions = ['off', 'afterDelay', 'onFocusChange'];

  // Filter settings based on search
  const matchesSearch = (label, description) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return label.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <div className="sticky top-0 bg-[#252526] border-b border-[#191919] px-3 py-2.5 z-10">
        <h1 className="text-sm font-semibold text-white mb-2">Settings</h1>
        
        {/* Search Box */}
        <div className="relative">
          <VscSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search settings..."
            className="w-full pl-7 pr-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
          />
        </div>
      </div>

      <div className="py-3 space-y-3">
        {/* Appearance Section */}
        <Section
          title="Appearance"
          isExpanded={expandedSections.appearance}
          onToggle={() => toggleSection('appearance')}
        >
          {matchesSearch('Theme', 'Choose your color theme') && (
            <SettingRow label="Theme" description="Color theme">
              <Select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                options={themes.map(t => ({ value: t.toLowerCase().replace(/\s+/g, '-'), label: t }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Text Size', 'Application text size') && (
            <SettingRow label="Text Size" description="App text size">
              <Select
                value={settings.textSize}
                onChange={(e) => updateSetting('textSize', e.target.value)}
                options={textSizes.map(s => ({ value: s.toLowerCase(), label: s }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Night Mode', 'Reduce eye strain in low light') && (
            <SettingRow label="Night Mode" description="Dark theme">
              <Toggle
                checked={settings.nightMode}
                onChange={(checked) => updateSetting('nightMode', checked)}
              />
            </SettingRow>
          )}
        </Section>

        {/* Editor Section */}
        <Section
          title="Editor"
          isExpanded={expandedSections.editor}
          onToggle={() => toggleSection('editor')}
        >
          {matchesSearch('Font Size', 'Editor font size') && (
            <SettingRow label="Font Size" description="Font size">
              <Select
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                options={fontSizes.map(s => ({ value: s, label: `${s}px` }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Font Family', 'Editor font family') && (
            <SettingRow label="Font Family" description="Font family">
              <Select
                value={settings.fontFamily}
                onChange={(e) => updateSetting('fontFamily', e.target.value)}
                options={fontFamilies.map(f => ({ value: f, label: f }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Line Height', 'Space between lines') && (
            <SettingRow label="Line Height" description="Line spacing">
              <Select
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                options={lineHeights.map(h => ({ value: h, label: h.toString() }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Indent Guides', 'Show indentation guides') && (
            <SettingRow label="Indent Guides" description="Indentation">
              <Toggle
                checked={settings.indentGuides}
                onChange={(checked) => updateSetting('indentGuides', checked)}
              />
            </SettingRow>
          )}

          {matchesSearch('Line Numbers', 'Show line numbers') && (
            <SettingRow label="Line Numbers" description="Line numbers">
              <Toggle
                checked={settings.lineNumbers}
                onChange={(checked) => updateSetting('lineNumbers', checked)}
              />
            </SettingRow>
          )}

          {matchesSearch('Word Wrap', 'Wrap long lines') && (
            <SettingRow label="Word Wrap" description="Line wrapping">
              <Toggle
                checked={settings.wordWrap}
                onChange={(checked) => updateSetting('wordWrap', checked)}
              />
            </SettingRow>
          )}

          {matchesSearch('Tab Size', 'Number of spaces per tab') && (
            <SettingRow label="Tab Size" description="Spaces/tab">
              <Select
                value={settings.tabSize}
                onChange={(e) => updateSetting('tabSize', Number(e.target.value))}
                options={tabSizes.map(s => ({ value: s, label: s.toString() }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Cursor Style', 'Editor cursor appearance') && (
            <SettingRow label="Cursor Style" description="Cursor type">
              <Select
                value={settings.cursorStyle}
                onChange={(e) => updateSetting('cursorStyle', e.target.value)}
                options={cursorStyles.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Render Whitespace', 'Show whitespace characters') && (
            <SettingRow label="Whitespace" description="Render mode">
              <Select
                value={settings.renderWhitespace}
                onChange={(e) => updateSetting('renderWhitespace', e.target.value)}
                options={whitespaceOptions.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
              />
            </SettingRow>
          )}
        </Section>

        {/* Advanced Section */}
        <Section
          title="Advanced"
          isExpanded={expandedSections.advanced}
          onToggle={() => toggleSection('advanced')}
        >
          {matchesSearch('Auto Save', 'Automatically save files') && (
            <SettingRow label="Auto Save" description="Save mode">
              <Select
                value={settings.autoSave}
                onChange={(e) => updateSetting('autoSave', e.target.value)}
                options={autoSaveOptions.map(s => ({ 
                  value: s, 
                  label: s === 'off' ? 'Off' : s === 'afterDelay' ? 'After Delay' : 'On Focus'
                }))}
              />
            </SettingRow>
          )}

          {matchesSearch('Format On Save', 'Format files on save') && (
            <SettingRow label="Format On Save" description="Auto format">
              <Toggle
                checked={settings.formatOnSave}
                onChange={(checked) => updateSetting('formatOnSave', checked)}
              />
            </SettingRow>
          )}

          {matchesSearch('Minimap', 'Show code minimap') && (
            <SettingRow label="Minimap" description="Code overview">
              <Toggle
                checked={settings.minimap}
                onChange={(checked) => updateSetting('minimap', checked)}
              />
            </SettingRow>
          )}

          {matchesSearch('Scroll Beyond Last Line', 'Allow scrolling past last line') && (
            <SettingRow label="Scroll Beyond" description="Last line scroll">
              <Toggle
                checked={settings.scrollBeyondLastLine}
                onChange={(checked) => updateSetting('scrollBeyondLastLine', checked)}
              />
            </SettingRow>
          )}
        </Section>
      </div>
    </div>
  );
}

// Section Component
function Section({ title, isExpanded, onToggle, children }) {
  return (
    <div className="border-t border-[#3e3e42]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#2a2d2e] transition-colors"
      >
        <h2 className="text-xs font-semibold text-white">{title}</h2>
        {isExpanded ? (
          <VscChevronDown className="text-gray-400" size={14} />
        ) : (
          <VscChevronRight className="text-gray-400" size={14} />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Setting Row Component
function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-start justify-between py-1.5 gap-2">
      <div className="flex-1 min-w-0">
        <label className="block text-xs text-[#cccccc] font-medium truncate">{label}</label>
        <p className="text-[10px] text-gray-500 truncate">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}

// Select Component
function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-2 py-1 bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded text-xs focus:outline-none focus:border-[#00bac8] w-24"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Toggle Component
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-[#00bac8] ${
        checked ? 'bg-[#00bac8]' : 'bg-[#3c3c3c]'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default SettingsPanel;