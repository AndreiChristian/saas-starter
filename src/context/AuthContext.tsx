import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import PocketBase, { RecordModel } from 'pocketbase';
import { pb } from "../hooks/pb/main";


// 1. Define the shape of your context
interface AuthContextType {
  pb: PocketBase | null;
  user: RecordModel | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void> | void;
  logout: () => void;
}

// 2. Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  login: () => { },
  logout: () => { },
  pb: null,
});

// 3. AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(pb.authStore.record);
  const [token, setToken] = useState(pb.authStore.token);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      console.log("Is changed")
      setToken(token);
      setUser(model);
    });

    const checkTokenExpiration = setInterval(() => {
      if (isTokenExpired()) {
        console.log("Token is expired")
        //logout();
      }
    }, 60000);

    return () => {
      unsubscribe();
      clearInterval(checkTokenExpiration);
    };
  }, [pb]);

  const isTokenExpired = (): boolean => {
    if (!token) return true;

    try {
      // Decode the JWT token to check its expiration
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));

      // Check if the token is expired
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      // If decoding fails, assume token is invalid
      return true;
    }
  };
  const login = async (email: any, password: any) => {
    console.log("Function is called")
    try {
      const authData = await pb.collection('users').authWithPassword(
        email,
        password
      );
      setUser(authData.record)
      setToken(authData.token)
    } catch (error) {
      throw error;
    }
  };


  const logout = () => {
    pb.authStore.clear();
  };

  // 4. Provide the context value
  return (
    <AuthContext.Provider value={{ pb, user, token, logout, login }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
