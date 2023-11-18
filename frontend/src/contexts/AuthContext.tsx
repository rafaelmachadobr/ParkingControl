import { ReactNode, createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { UserResponse } from "../types/UserResponse";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: UserResponse | null;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
  signed: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
