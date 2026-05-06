import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <p className="text-base font-semibold text-indigo-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-10">
        <Link to={ROUTES.HOME}>
          <Button variant="primary">Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
