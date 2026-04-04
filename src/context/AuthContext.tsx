import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextValue {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  setToken: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
