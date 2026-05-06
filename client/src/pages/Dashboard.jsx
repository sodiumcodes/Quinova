import { useAuthStore } from '../store/auth.store';
import { BarChart3, Users, Eye, TrendingUp, Compass, Plus } from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Total Views', value: '124.5K', icon: Eye, trend: '+14%' },
    { label: 'Followers', value: '1,234', icon: Users, trend: '+5%' },
    { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, trend: '+1.2%' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-quinova-secondary pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Creator Dashboard</h2>
          <p className="mt-2 text-gray-400 font-medium">
            Welcome back, <span className="text-quinova-tertiary">{user?.fullName || 'User'}</span>. Here's what's happening with your content today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2">
            <Compass size={18} /> Discover
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus size={18} /> New Post
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl border border-quinova-secondary bg-quinova-main/50 p-6 backdrop-blur-sm group hover:border-quinova-tertiary/50 transition-colors"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-quinova-secondary/30 rounded-full blur-2xl group-hover:bg-quinova-tertiary/20 transition-colors" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex-shrink-0 bg-quinova-secondary p-3 rounded-xl text-quinova-tertiary">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <span className="text-xs font-bold text-quinova-tertiary bg-quinova-secondary px-1.5 py-0.5 rounded-md">
                    {stat.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border border-quinova-secondary bg-quinova-main/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-quinova-tertiary" />
              Recent Performance
            </h3>
            <button className="text-sm text-quinova-tertiary hover:underline">View Analytics</button>
          </div>
          <div className="h-64 w-full border border-dashed border-quinova-secondary rounded-xl flex items-center justify-center bg-quinova-main/50">
            <span className="text-gray-500 font-medium">Chart visualization area</span>
          </div>
        </div>

        <div className="rounded-2xl border border-quinova-secondary bg-quinova-main/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Posts</h3>
            <button className="text-sm text-quinova-tertiary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <div key={post} className="flex gap-4 p-3 rounded-xl hover:bg-quinova-secondary/50 transition-colors cursor-pointer border border-transparent hover:border-quinova-secondary">
                <div className="w-16 h-16 rounded-lg bg-quinova-secondary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-gray-200 line-clamp-2 leading-tight mb-1">
                    Designing the future of creative platforms with Quinova
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago • 1.2K views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
