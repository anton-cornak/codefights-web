import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check authentication and role here
      const isLoggedIn = !!localStorage.getItem('token');
      const userRole = localStorage.getItem('role');

      if (!isLoggedIn) {
        // User is not logged in, redirect to the login page
        router.push('/login');
      } else if (userRole && !allowedRoles.includes(userRole)) {
        // User role doesn't match the allowed roles, redirect to unauthorized page
        router.push('/403');
      }
    }, []);

    if (typeof window === 'undefined') {
      // Server-side rendering, render nothing
      return null;
    }

    // Render the wrapped component if authentication and authorization pass
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
