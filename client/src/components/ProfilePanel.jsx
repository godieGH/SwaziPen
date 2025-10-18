import { useState } from 'react';
import { 
  VscAccount,
  VscSignOut,
  VscSync,
  VscCheck,
  VscClose,
  VscChevronRight,
  VscEdit,
  VscKey,
  VscBell,
  VscShield,
  VscOrganization,
  VscGithub,
  VscMail,
  VscGlobe,
  VscCalendar,
  VscCircleFilled
} from 'react-icons/vsc';

function ProfilePanel() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    username: 'johndoe',
    bio: 'Full-stack developer passionate about building great user experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinDate: 'January 2023',
    verified: true
  });

  const [stats] = useState({
    repositories: 42,
    commits: 1247,
    pullRequests: 89,
    issues: 156
  });

  const [syncStatus, setSyncStatus] = useState({
    lastSync: '2 minutes ago',
    syncing: false,
    status: 'synced'
  });

  const [notifications] = useState([
    { id: 1, title: 'New pull request review', time: '5m ago', read: false },
    { id: 2, title: 'Issue assigned to you', time: '1h ago', read: false },
    { id: 3, title: 'Deployment successful', time: '3h ago', read: true }
  ]);

  const [recentActivity] = useState([
    { action: 'Committed to', target: 'main branch', repo: 'my-project', time: '10m ago' },
    { action: 'Opened PR in', target: 'feature/auth', repo: 'backend-api', time: '2h ago' },
    { action: 'Closed issue', target: '#234', repo: 'my-project', time: '5h ago' }
  ]);

  const handleSync = () => {
    setSyncStatus({ ...syncStatus, syncing: true });
    setTimeout(() => {
      setSyncStatus({
        lastSync: 'Just now',
        syncing: false,
        status: 'synced'
      });
    }, 2000);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] overflow-y-auto">
      {/* Header */}
      <div className="border-b border-[#191919] px-3 py-2">
        <h1 className="text-xs font-semibold text-white">Account</h1>
      </div>

      {/* Profile Card */}
      <div className="border-b border-[#191919] px-3 py-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00bac8] to-[#0e639c] flex items-center justify-center text-white font-semibold text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            {user.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#16825d] rounded-full flex items-center justify-center border-2 border-[#1e1e1e]">
                <VscCheck size={10} className="text-white" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-semibold text-white truncate">{user.name}</h2>
            </div>
            <p className="text-[10px] text-gray-400 truncate">@{user.username}</p>
            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Edit Button */}
          <button
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
            title="Edit Profile"
          >
            <VscEdit size={14} />
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            {user.bio}
          </p>
        )}

        {/* Meta Info */}
        <div className="mt-2 space-y-1">
          {user.location && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <VscGlobe size={10} />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-1.5 text-[10px]">
              <VscGlobe size={10} className="text-gray-500" />
              <a href={user.website} className="text-[#00bac8] hover:underline truncate">
                {user.website}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <VscCalendar size={10} />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="border-b border-[#191919] px-3 py-3">
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Repositories" value={stats.repositories} />
          <StatCard label="Commits" value={stats.commits} />
          <StatCard label="Pull Requests" value={stats.pullRequests} />
          <StatCard label="Issues" value={stats.issues} />
        </div>
      </div>

      {/* Sync Status */}
      <div className="border-b border-[#191919] px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VscCircleFilled 
              size={8} 
              className={syncStatus.status === 'synced' ? 'text-green-500' : 'text-yellow-500'} 
            />
            <div>
              <div className="text-[10px] text-white">
                {syncStatus.syncing ? 'Syncing...' : 'All synced'}
              </div>
              <div className="text-[9px] text-gray-500">
                Last sync: {syncStatus.lastSync}
              </div>
            </div>
          </div>
          <button
            onClick={handleSync}
            disabled={syncStatus.syncing}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors disabled:opacity-50"
            title="Sync Now"
          >
            <VscSync size={14} className={syncStatus.syncing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <Section title="Notifications" badge={unreadCount}>
        {notifications.length === 0 ? (
          <div className="text-[10px] text-gray-500 px-2 py-2">
            No notifications
          </div>
        ) : (
          <div className="space-y-0.5">
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </Section>

      {/* Recent Activity */}
      <Section title="Recent Activity">
        <div className="space-y-0.5">
          {recentActivity.map((activity, idx) => (
            <ActivityItem key={idx} activity={activity} />
          ))}
        </div>
      </Section>

      {/* Quick Actions */}
      <div className="border-t border-[#191919] px-3 py-2">
        <h3 className="text-xs font-semibold text-white mb-2">Quick Actions</h3>
        <div className="space-y-1">
          <ActionButton
            icon={<VscKey size={14} />}
            label="Change Password"
            onClick={() => console.log('Change password')}
          />
          <ActionButton
            icon={<VscBell size={14} />}
            label="Notification Settings"
            onClick={() => console.log('Notification settings')}
          />
          <ActionButton
            icon={<VscShield size={14} />}
            label="Privacy & Security"
            onClick={() => console.log('Privacy settings')}
          />
          <ActionButton
            icon={<VscOrganization size={14} />}
            label="Organizations"
            onClick={() => console.log('Organizations')}
          />
        </div>
      </div>

      {/* Sign Out */}
      <div className="border-t border-[#191919] px-3 py-3 mt-auto">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded transition-colors"
        >
          <VscSignOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// Section Component
function Section({ title, badge, children }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-t border-[#191919]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#2a2d2e] transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-white">{title}</h3>
          {badge > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] bg-[#00bac8] text-white rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <VscChevronRight 
          size={12} 
          className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value }) {
  return (
    <div className="bg-[#252526] border border-[#3e3e42] rounded p-2">
      <div className="text-lg font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-[9px] text-gray-500">{label}</div>
    </div>
  );
}

// Notification Item Component
function NotificationItem({ notification }) {
  return (
    <button
      className="w-full text-left px-2 py-2 hover:bg-[#2a2d2e] rounded transition-colors"
      onClick={() => console.log('View notification:', notification)}
    >
      <div className="flex items-start gap-2">
        {!notification.read && (
          <VscCircleFilled size={8} className="text-[#00bac8] mt-1 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className={`text-[10px] truncate ${notification.read ? 'text-gray-400' : 'text-white'}`}>
            {notification.title}
          </div>
          <div className="text-[9px] text-gray-600">{notification.time}</div>
        </div>
      </div>
    </button>
  );
}

// Activity Item Component
function ActivityItem({ activity }) {
  return (
    <button
      className="w-full text-left px-2 py-2 hover:bg-[#2a2d2e] rounded transition-colors"
      onClick={() => console.log('View activity:', activity)}
    >
      <div className="text-[10px] text-gray-400">
        <span className="text-white">{activity.action}</span>
        {' '}
        <span className="text-[#00bac8]">{activity.target}</span>
        {' in '}
        <span className="text-[#9cdcfe]">{activity.repo}</span>
      </div>
      <div className="text-[9px] text-gray-600 mt-0.5">{activity.time}</div>
    </button>
  );
}

// Action Button Component
function ActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
    >
      <span className="text-gray-400">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <VscChevronRight size={12} className="text-gray-600" />
    </button>
  );
}

export default ProfilePanel;