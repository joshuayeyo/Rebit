import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLogin: boolean;
  setLogin: (login: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setLogin] = useState<boolean>(() => {
    const savedLoginState = localStorage.getItem('isLogin');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
