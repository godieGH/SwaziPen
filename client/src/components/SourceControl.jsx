import { useState } from 'react';
import { 
  VscRefresh,
  VscGitCommit,
  VscSync,
  VscAdd,
  VscRemove,
  VscCheck,
  VscChevronDown,
  VscChevronRight,
  VscEllipsis,
  VscSourceControl,
  VscCircleFilled,
  VscDiffAdded,
  VscDiffModified,
  VscDiffRemoved
} from 'react-icons/vsc';

export default function SourceControl() {
  const [commitMessage, setCommitMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    staged: true,
    changes: true,
    commits: false
  });
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const branches = ['main', 'develop', 'feature/new-ui'];
  
  const [stagedChanges, setStagedChanges] = useState([
    { file: 'src/App.jsx', status: 'modified', additions: 15, deletions: 3 }
  ]);

  const [unstaged, setUnstaged] = useState([
    { file: 'src/utils/helpers.js', status: 'modified', additions: 8, deletions: 2 },
    { file: 'README.md', status: 'modified', additions: 3, deletions: 1 }
  ]);

  const commits = [
    { 
      hash: 'a3f5b21', 
      message: 'Add new authentication flow', 
      author: 'John Doe', 
      time: '2 hours ago'
    }
  ];

  const stageFile = (file) => {
    setUnstaged(unstaged.filter(f => f.file !== file.file));
    setStagedChanges([...stagedChanges, file]);
  };

  const unstageFile = (file) => {
    setStagedChanges(stagedChanges.filter(f => f.file !== file.file));
    setUnstaged([...unstaged, file]);
  };

  const handleCommit = () => {
    if (commitMessage.trim() && stagedChanges.length > 0) {
      console.log('Committing:', commitMessage);
      setCommitMessage('');
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'modified') return <VscDiffModified className="text-yellow-500" size={14} />;
    if (status === 'added') return <VscDiffAdded className="text-green-500" size={14} />;
    return <VscDiffRemoved className="text-red-500" size={14} />;
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      <div className="border-b border-[#191919] px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xs font-semibold text-white">Source Control</h1>
          <button className="p-1 text-gray-400 hover:text-white rounded">
            <VscRefresh size={14} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="w-full flex items-center justify-between px-2 py-1.5 text-xs bg-[#3c3c3c] border border-[#3e3e42] rounded"
          >
            <div className="flex items-center gap-1.5">
              <VscSourceControl size={14} />
              <span>{selectedBranch}</span>
            </div>
            <VscChevronDown size={12} />
          </button>

          {showBranchMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#3c3c3c] border border-[#3e3e42] rounded z-10">
              {branches.map(branch => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setShowBranchMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#2a2d2e] flex items-center gap-2"
                >
                  <VscSourceControl size={12} />
                  <span>{branch}</span>
                  {branch === selectedBranch && <VscCheck size={12} className="ml-auto text-[#00bac8]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-1 mt-2">
          <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-[#0e639c] text-white rounded">
            <VscSync size={12} />
            <span>Pull</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-[#0e639c] text-white rounded">
            <VscSync size={12} className="rotate-180" />
            <span>Push</span>
          </button>
        </div>
      </div>

      <div className="border-b border-[#191919] px-3 py-2">
        <textarea
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Message (Ctrl+Enter to commit)"
          rows={3}
          className="w-full px-2 py-1.5 text-xs bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42] rounded resize-none focus:outline-none focus:border-[#00bac8]"
        />
        <button
          onClick={handleCommit}
          disabled={!commitMessage.trim() || stagedChanges.length === 0}
          className="w-full mt-2 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-[#16825d] text-white rounded disabled:bg-gray-700 disabled:text-gray-500"
        >
          <VscCheck size={14} />
          <span>Commit ({stagedChanges.length})</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="border-t border-[#3e3e42]">
          <button
            onClick={() => setExpandedSections({...expandedSections, staged: !expandedSections.staged})}
            className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a2d2e]"
          >
            {expandedSections.staged ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            <h2 className="text-xs font-semibold text-white">Staged ({stagedChanges.length})</h2>
          </button>
          
          {expandedSections.staged && (
            <div className="px-3 pb-2">
              {stagedChanges.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#2a2d2e] rounded group">
                  <button
                    onClick={() => unstageFile(file)}
                    className="p-0.5 opacity-0 group-hover:opacity-100 text-gray-400"
                  >
                    <VscRemove size={12} />
                  </button>
                  {getStatusIcon(file.status)}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#cccccc] truncate">{file.file}</div>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[9px] text-green-500">+{file.additions}</span>
                      <span className="text-[9px] text-red-500">-{file.deletions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#3e3e42]">
          <button
            onClick={() => setExpandedSections({...expandedSections, changes: !expandedSections.changes})}
            className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a2d2e]"
          >
            {expandedSections.changes ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            <h2 className="text-xs font-semibold text-white">Changes ({unstaged.length})</h2>
          </button>
          
          {expandedSections.changes && (
            <div className="px-3 pb-2">
              {unstaged.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#2a2d2e] rounded group">
                  <button
                    onClick={() => stageFile(file)}
                    className="p-0.5 opacity-0 group-hover:opacity-100 text-gray-400"
                  >
                    <VscAdd size={12} />
                  </button>
                  {getStatusIcon(file.status)}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#cccccc] truncate">{file.file}</div>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[9px] text-green-500">+{file.additions}</span>
                      <span className="text-[9px] text-red-500">-{file.deletions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#3e3e42]">
          <button
            onClick={() => setExpandedSections({...expandedSections, commits: !expandedSections.commits})}
            className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a2d2e]"
          >
            {expandedSections.commits ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            <h2 className="text-xs font-semibold text-white">Recent Commits</h2>
          </button>
          
          {expandedSections.commits && (
            <div className="px-3 pb-2">
              {commits.map((commit, idx) => (
                <div key={idx} className="px-2 py-2 hover:bg-[#2a2d2e] rounded">
                  <div className="flex gap-2">
                    <VscGitCommit size={14} className="text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#cccccc] truncate">{commit.message}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">
                        {commit.hash} • {commit.author} • {commit.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#191919] px-3 py-2">
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-2">
            <VscCircleFilled size={8} className="text-green-500" />
            <span>Repository: my-project</span>
          </div>
          <div>{stagedChanges.length + unstaged.length} changes</div>
        </div>
      </div>
    </div>
  );
}