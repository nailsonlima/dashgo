import { api } from "@/services/api";
import { createContext, ReactNode, useState } from "react";


type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signIn({ email, password }: SignInCredentials) {
        try {
      const response = await api.post('/sessions', {
        email,
        password
      })
  
      console.log(response.data)
    } catch (err) {
      const errorMessage = err.response?.data.message 
      ?? `Erro interno de servidor, tente novamente mais tarde! (${err.message})`

      throw new Error(errorMessage)
    }
    
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
