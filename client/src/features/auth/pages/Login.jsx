import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';
import { useUiStore } from '../../../store/ui.store';
import { ROUTES } from '../../../constants/routes.constants';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { loginApi } from '../../../api/auth.api';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { setLoading, showToast } = useUiStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginApi(formData);
      
      // The backend returns { data: { user, accessToken }, success: true }
      // and also sets httpOnly cookies for browser sessions.
      setAuth(response.data.user, response.data.accessToken);
      showToast('Welcome back to Quinova!', 'success');
      setLoading(false);
      navigate(ROUTES.DASHBOARD);

    } catch (error) {
      setLoading(false);
      showToast(error.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-quinova-tertiary flex items-center justify-center text-quinova-bg font-black text-3xl shadow-[0_0_20px_rgba(142,182,155,0.4)] mb-6">
            Q
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue your creative journey
          </p>
        </div>

        <div className="bg-quinova-main border border-quinova-secondary py-8 px-6 shadow-2xl rounded-2xl sm:px-10 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              required
              placeholder="creator@quinova.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-quinova-secondary bg-quinova-main text-quinova-tertiary focus:ring-quinova-tertiary focus:ring-offset-quinova-main"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-quinova-tertiary hover:text-[#a5ccb1] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full py-3 text-base">
              Sign In
            </Button>
            
            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-quinova-tertiary hover:text-[#a5ccb1] transition-colors">
                Join Quinova
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
