import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import PocketBase from 'pocketbase';
import { pb } from "../hooks/pb/main";


// 1. Define the shape of your context
interface AuthContextType {
  pb: PocketBase | null;
  user: any; // Replace `any` with the actual user model type if available
  token: string | null;
  login: (username: string, password: string) => any;
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
  const [user, setUser] = useState(pb.authStore.model);
  const [token, setToken] = useState(pb.authStore.token);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      console.log("Is changed")
      setToken(token);
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, [pb]);

  const login = async (username: any, password: any) => {
    console.log("Function is called")
    try {
      const authData = await pb.collection('users').authWithPassword(
        username,
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
