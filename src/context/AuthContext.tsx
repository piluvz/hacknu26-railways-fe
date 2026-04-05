import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextValue {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  trainId: string;
  setTrainId: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  selectedTrainId: string;
  setSelectedTrainId: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  setToken: () => {},
  trainId: "",
  setTrainId: () => {},
  role: "",
  setRole: () => {},
  selectedTrainId: "",
  setSelectedTrainId: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") ?? "");
  const [trainId, setTrainId] = useState(() => localStorage.getItem("trainId") ?? "");
  const [role, setRole] = useState(() => localStorage.getItem("role") ?? "");
  const [selectedTrainId, setSelectedTrainId] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, trainId, setTrainId, role, setRole, selectedTrainId, setSelectedTrainId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
