import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return {
        theme,
        toggleTheme: () =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    };
}
