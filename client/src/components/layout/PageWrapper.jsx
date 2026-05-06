import Navbar from './Navbar';
import Spinner from '../ui/Spinner';
import Toast from '../ui/Toast';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-quinova-bg flex flex-col font-sans selection:bg-quinova-tertiary selection:text-quinova-bg text-gray-100">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        {children}
      </main>
      <Spinner />
      <Toast />
    </div>
  );
};

export default PageWrapper;
