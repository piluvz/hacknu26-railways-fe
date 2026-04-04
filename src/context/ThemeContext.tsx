import { createContext, useContext, useState, ReactNode } from "react";

export interface ThemeColors {
  pageBg: string;
  widgetBg: string;
  border: string;
  innerBorder: string;
  text: string;
  textSub: string;     // "/100" in PieChart, faint secondary text
  textMuted: string;   // #696969 labels
  progressTrack: string;
  historyBg: string;
  alertDesc: string;
  gaugeEmpty: string;
  gaugeTick: string;
  gaugeSplit: string;
}

const dark: ThemeColors = {
  pageBg: "#111112",
  widgetBg: "#171719",
  border: "#222223",
  innerBorder: "#2A2A2C",
  text: "#FFFFFF",
  textSub: "#FFFFFF4D",
  textMuted: "#696969",
  progressTrack: "#242426",
  historyBg: "#0F0F0F",
  alertDesc: "#C2C0B6",
  gaugeEmpty: "#383838",
  gaugeTick: "#FFFFFF55",
  gaugeSplit: "#FFFFFF88",
};

const light: ThemeColors = {
  pageBg: "#F0F0F3",
  widgetBg: "#FFFFFF",
  border: "#E2E2E5",
  innerBorder: "#DEDEDE",
  text: "#101010",
  textSub: "#696969",
  textMuted: "#696969",
  progressTrack: "#ECEEF6",
  historyBg: "#F5FAFF",
  alertDesc: "#555555",
  gaugeEmpty: "#D0D0D0",
  gaugeTick: "#00000033",
  gaugeSplit: "#00000055",
};

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
  c: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggle: () => {},
  c: dark,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ isDark, toggle, c: isDark ? dark : light }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
