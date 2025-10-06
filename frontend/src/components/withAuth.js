import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return AuthComponent;
};

export default withAuth;
