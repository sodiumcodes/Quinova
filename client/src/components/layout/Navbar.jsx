import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { ROUTES } from '../../constants/routes.constants';
import { LogOut, User, Menu, X, Compass, LayoutDashboard, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  const NavLinks = () => (
    <>
      <Link to={ROUTES.HOME} className={`\${location.pathname === ROUTES.HOME ? 'text-quinova-tertiary' : 'text-gray-300'} hover:text-white transition-colors font-medium text-sm tracking-wide`}>
        Home
      </Link>
      {isAuthenticated && (
        <>
          <Link to="/discover" className={`\${location.pathname === '/discover' ? 'text-quinova-tertiary' : 'text-gray-300'} hover:text-white transition-colors font-medium text-sm flex items-center gap-1.5`}>
            <Compass size={16} /> Discover
          </Link>
          <Link to={ROUTES.DASHBOARD} className={`\${location.pathname === ROUTES.DASHBOARD ? 'text-quinova-tertiary' : 'text-gray-300'} hover:text-white transition-colors font-medium text-sm flex items-center gap-1.5`}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/collections" className={`\${location.pathname === '/collections' ? 'text-quinova-tertiary' : 'text-gray-300'} hover:text-white transition-colors font-medium text-sm flex items-center gap-1.5`}>
            <Bookmark size={16} /> Collections
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed top-0 z-40 w-full transition-all duration-300 \${isScrolled ? 'bg-quinova-bg/90 backdrop-blur-xl border-b border-quinova-secondary' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-quinova-tertiary flex items-center justify-center text-quinova-bg font-black text-xl shadow-[0_0_15px_rgba(142,182,155,0.4)] group-hover:scale-105 transition-transform">
            Q
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Quinova
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center pl-8 border-l border-quinova-secondary space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-quinova-main border border-quinova-secondary">
                  <div className="w-6 h-6 rounded-full bg-quinova-tertiary/20 flex items-center justify-center text-quinova-tertiary">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {user?.username || user?.fullName || 'Creator'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={ROUTES.LOGIN} className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-quinova-tertiary px-5 py-2.5 text-sm font-bold text-quinova-bg shadow-[0_0_15px_rgba(142,182,155,0.2)] hover:shadow-[0_0_20px_rgba(142,182,155,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  Join Quinova
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-quinova-main border-b border-quinova-secondary px-6 py-4 flex flex-col gap-4">
          <NavLinks />
          <hr className="border-quinova-secondary" />
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-400 text-left font-medium">Logout</button>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="text-white font-medium">Log in</Link>
              <Link to="/register" className="text-quinova-tertiary font-medium">Join Quinova</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
