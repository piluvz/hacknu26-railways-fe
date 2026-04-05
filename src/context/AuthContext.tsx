import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextValue {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  trainId: string;
  setTrainId: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  setToken: () => {},
  trainId: "",
  setTrainId: () => {},
  role: "",
  setRole: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");
  const [trainId, setTrainId] = useState("");
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, trainId, setTrainId, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
