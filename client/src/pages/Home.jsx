import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-quinova-tertiary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quinova-main border border-quinova-secondary mb-8">
          <span className="w-2 h-2 rounded-full bg-quinova-tertiary animate-pulse" />
          <span className="text-sm font-medium text-quinova-tertiary">Quinova Beta is Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          The ultimate platform for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quinova-tertiary to-[#a5ccb1]">modern creators.</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 font-medium leading-relaxed">
          Build your portfolio, analyze your engagement, and connect with your audience. Everything you need to grow your creative journey, beautifully designed in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to={ROUTES.LOGIN} className="w-full sm:w-auto">
            <Button variant="primary" className="w-full text-lg px-8 py-4 rounded-xl font-bold">
              Start Creating Free
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 rounded-xl font-bold">
            Explore Portfolios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
