import { createContext, useContext, useState, ReactNode } from "react";

interface HistoryContextValue {
  distanceSelected: number | null;
  setDistanceSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

const HistoryContext = createContext<HistoryContextValue>({
  distanceSelected: null,
  setDistanceSelected: () => {}
});

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [ distanceSelected, setDistanceSelected ] = useState<number | null>(null);

  return (
    <HistoryContext.Provider value={{ distanceSelected, setDistanceSelected }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
