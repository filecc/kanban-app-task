'use client'
import { classNames } from "../lib/functions";
import { useTheme } from "../providers/ThemeProvider"

export default function Main({ children }: { children: React.ReactNode}) {
    const theme = useTheme();
    return <main className={classNames(theme.darkMode ? 'dark' : '')}>
        {children}
    </main>
}