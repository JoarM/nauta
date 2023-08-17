"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function RadioThemeSwitcher() {
    const { setTheme, theme } = useTheme();

    return (
        <menu role="radiogroup" className="rounded-full grid grid-flow-col p-1 border">
            <li>
                <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors aria-[current='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("dark")}
                aria-current={theme === "dark" ? "true" : "false"}
                >
                    <Moon className="w-4 h-4"/>
                    <span className="sr-only">Dark theme</span>
                </button>
            </li>
            <li>
                <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors aria-[current='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("light")}
                aria-current={theme === "light" ? "true" : "false"}
                >
                    <Sun className="w-4 h-4"/>
                    <span className="sr-only">Light theme</span>
                </button>
            </li>
            <li>
            <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/70 transition-colors aria-[current='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("system")}
                aria-current={theme === "system" ? "true" : "false"}
                >
                    <Monitor className="w-4 h-4"/>
                    <span className="sr-only">System theme</span>
                </button>
            </li>
        </menu>
    )
}