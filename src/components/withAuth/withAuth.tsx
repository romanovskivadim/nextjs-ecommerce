// import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/utils/api';
import { PAGE_ROUTES } from '@/utils/constanats';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  Component: any;
};

const withAuth = (props: any) => {
  const { Component } = props;
  const Auth = (props: any) => {
    // const { isAuth } = useAuth();
    const router = useRouter();

    const logoutAction = async () => {
        try {
            await logout();

            router.push(PAGE_ROUTES.login);
        } catch (error) {
            console.error(error)
        }

    };

    // useEffect(() => {
    //   if (!isAuth) {
    //     logoutAction();
    //   }
    // }, [isAuth]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
