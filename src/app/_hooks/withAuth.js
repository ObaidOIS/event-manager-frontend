import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../_context/AuthContext';


export default function withAuth(Component) {
  return function AuthComponent(props) {
    const { authToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
      localStorage.getItem('authToken');
      if (!authToken) {
        router.push('/login');
      }
    }
    , [authToken]);

    return <Component {...props} />;
  };
}


