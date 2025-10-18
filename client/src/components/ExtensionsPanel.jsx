import { useState } from 'react';
import { 
  VscSearch,
  VscRefresh,
  VscExtensions,
  VscStarFull,
  VscCloudDownload,
  VscTrash,
  VscGear,
  VscCheck,
  VscClose,
  VscChevronDown,
  VscChevronRight,
  VscCircleFilled,
  VscFilter
} from 'react-icons/vsc';

export default function ExtensionsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('installed');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const categories = ['All', 'Themes', 'Languages', 'Formatters', 'Linters', 'Snippets'];

  const [installedExtensions] = useState([
    {
      id: 1,
      name: 'ESLint',
      publisher: 'Microsoft',
      description: 'Integrates ESLint JavaScript into VS Code',
      version: '2.4.0',
      installs: '25M',
      rating: 4.5,
      installed: true,
      enabled: true,
      category: 'Linters'
    },
    {
      id: 2,
      name: 'Prettier',
      publisher: 'Prettier',
      description: 'Code formatter using prettier',
      version: '10.1.0',
      installs: '32M',
      rating: 4.8,
      installed: true,
      enabled: true,
      category: 'Formatters'
    },
    {
      id: 3,
      name: 'Live Server',
      publisher: 'Ritwick Dey',
      description: 'Launch a development local Server with live reload',
      version: '5.7.9',
      installs: '28M',
      rating: 4.6,
      installed: true,
      enabled: false,
      category: 'All'
    }
  ]);

  const [popularExtensions] = useState([
    {
      id: 4,
      name: 'GitLens',
      publisher: 'GitKraken',
      description: 'Supercharge Git within VS Code',
      version: '14.1.0',
      installs: '22M',
      rating: 4.7,
      installed: false,
      category: 'All'
    },
    {
      id: 5,
      name: 'Python',
      publisher: 'Microsoft',
      description: 'Python language support',
      version: '2023.12.0',
      installs: '75M',
      rating: 4.5,
      installed: false,
      category: 'Languages'
    },
    {
      id: 6,
      name: 'Dracula Theme',
      publisher: 'Dracula Theme',
      description: 'Official Dracula Theme',
      version: '2.24.2',
      installs: '5M',
      rating: 4.9,
      installed: false,
      category: 'Themes'
    },
    {
      id: 7,
      name: 'Auto Import',
      publisher: 'steoates',
      description: 'Automatically finds and imports dependencies',
      version: '1.5.4',
      installs: '3M',
      rating: 4.3,
      installed: false,
      category: 'All'
    },
    {
      id: 8,
      name: 'Path Intellisense',
      publisher: 'Christian Kohler',
      description: 'Autocompletes filenames',
      version: '2.8.4',
      installs: '12M',
      rating: 4.6,
      installed: false,
      category: 'All'
    }
  ]);

  const handleInstall = (ext) => {
    console.log('Installing:', ext.name);
  };

  const handleUninstall = (ext) => {
    console.log('Uninstalling:', ext.name);
  };

  const handleToggleEnabled = (ext) => {
    console.log('Toggle enabled:', ext.name);
  };

  const filteredExtensions = (activeTab === 'installed' ? installedExtensions : popularExtensions)
    .filter(ext => {
      const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ext.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || ext.category.toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <div className="border-b border-[#191919] px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xs font-semibold text-white">Extensions</h1>
          <button
            className="p-1 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
            title="Refresh"
          >
            <VscRefresh size={14} />
          </button>
        </div>

        {/* Search Box */}
        <div className="relative mb-2">
          <VscSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search extensions..."
            className="w-full pl-7 pr-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded focus:outline-none focus:border-[#00bac8]"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="w-full flex items-center justify-between px-2 py-1.5 text-xs bg-[#3c3c3c] border border-[#3e3e42] rounded hover:bg-[#45484b] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <VscFilter size={12} />
              <span>{filterCategory === 'all' ? 'All Categories' : filterCategory}</span>
            </div>
            <VscChevronDown size={10} />
          </button>

          {showFilterMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#3c3c3c] border border-[#3e3e42] rounded shadow-lg z-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilterCategory(cat.toLowerCase());
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#2a2d2e] transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#191919]">
        <button
          onClick={() => setActiveTab('installed')}
          className={`flex-1 px-2 py-1.5 text-xs transition-colors ${
            activeTab === 'installed'
              ? 'text-white border-b-2 border-[#00bac8]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Installed ({installedExtensions.length})
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex-1 px-2 py-1.5 text-xs transition-colors ${
            activeTab === 'popular'
              ? 'text-white border-b-2 border-[#00bac8]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Popular
        </button>
      </div>

      {/* Extensions List */}
      <div className="flex-1 overflow-y-auto">
        {filteredExtensions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs px-4 text-center">
            <VscExtensions size={32} className="mb-2 opacity-50" />
            <p>No extensions found</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredExtensions.map(ext => (
              <ExtensionCard
                key={ext.id}
                extension={ext}
                onInstall={handleInstall}
                onUninstall={handleUninstall}
                onToggleEnabled={handleToggleEnabled}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#191919] px-3 py-2 text-[10px] text-gray-500">
        <div className="flex items-center justify-between">
          <span>{filteredExtensions.length} extensions</span>
          <span>Click extension for details</span>
        </div>
      </div>
    </div>
  );
}

// Extension Card Component
function ExtensionCard({ extension, onInstall, onUninstall, onToggleEnabled }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#252526] border border-[#3e3e42] rounded overflow-hidden">
      {/* Card Header */}
      <div className="p-2">
        <div className="flex items-start gap-2">
          {/* Icon */}
          <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-[#00bac8] to-[#0e639c] rounded flex items-center justify-center">
            <VscExtensions size={20} className="text-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-white truncate">{extension.name}</h3>
                <p className="text-[10px] text-gray-400 truncate">{extension.publisher}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {extension.installed ? (
                  <>
                    <button
                      onClick={() => onToggleEnabled(extension)}
                      className={`p-1 rounded transition-colors ${
                        extension.enabled
                          ? 'text-green-500 hover:bg-[#2a2d2e]'
                          : 'text-gray-500 hover:bg-[#2a2d2e]'
                      }`}
                      title={extension.enabled ? 'Disable' : 'Enable'}
                    >
                      {extension.enabled ? <VscCheck size={14} /> : <VscClose size={14} />}
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
                      title="Settings"
                    >
                      <VscGear size={14} />
                    </button>
                    <button
                      onClick={() => onUninstall(extension)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-[#2a2d2e] rounded transition-colors"
                      title="Uninstall"
                    >
                      <VscTrash size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onInstall(extension)}
                    className="px-2 py-1 text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white rounded transition-colors flex items-center gap-1"
                  >
                    <VscCloudDownload size={12} />
                    <span>Install</span>
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{extension.description}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <VscStarFull size={10} className="text-yellow-500" />
                <span className="text-[9px] text-gray-500">{extension.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <VscCloudDownload size={10} className="text-gray-500" />
                <span className="text-[9px] text-gray-500">{extension.installs}</span>
              </div>
              {extension.installed && (
                <div className="flex items-center gap-1">
                  <VscCircleFilled size={8} className={extension.enabled ? 'text-green-500' : 'text-gray-500'} />
                  <span className="text-[9px] text-gray-500">v{extension.version}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors"
        >
          <span>{expanded ? 'Less' : 'More'}</span>
          {expanded ? <VscChevronDown size={10} /> : <VscChevronRight size={10} />}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-[#3e3e42] px-3 py-2 bg-[#1e1e1e]">
          <div className="space-y-2">
            <div>
              <h4 className="text-[10px] font-semibold text-white mb-1">Description</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">{extension.description}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-white mb-1">Details</h4>
              <div className="space-y-0.5 text-[10px] text-gray-400">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>{extension.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span>{extension.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{extension.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}