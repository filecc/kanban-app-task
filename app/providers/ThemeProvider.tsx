"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [localTheme, setLocalTheme] = useState<boolean>(false);
    let darkMode = localTheme
    

    useEffect(() => {
        const darkModeLocal = localStorage.getItem("darkMode");
        if(!darkModeLocal) {
            localStorage.setItem("darkMode", JSON.stringify(false));
        } else {
            setLocalTheme(JSON.parse(darkModeLocal));
        }
       
    }, [localTheme])

    
    
    const setDarkMode = () => {
        setLocalTheme(!localTheme);
        localStorage.setItem("darkMode", JSON.stringify(!localTheme));
    }
    

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
