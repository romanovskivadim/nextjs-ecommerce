import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthContext {
    isAuth: boolean;
}

const AuthContext = createContext<IAuthContext>({
    isAuth: false,
});

const AuthProvider = ({ children }: any) => {
//   const [isAuth, setIsAuth] = useState<boolean>(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('user');
//     if (storedToken) {
//         setIsAuth(true);
//     }
//     setIsAuth(false);
//   }, []);

  return (
    <AuthContext.Provider value={{ isAuth: true }}>
      {children}
    </AuthContext.Provider>
  );
};

// const useAuth = () => {
//   return useContext(AuthContext);
// };

export default AuthProvider;
