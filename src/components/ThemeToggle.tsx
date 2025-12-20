type Props = {
    toggleTheme: () => void;
};

export default function ThemeToggle({ toggleTheme }: Props) {
    return (
        <button
            onClick={toggleTheme}
            style={{
                position: "fixed",
                top: 16,
                right: 16,
                padding: "8px 12px",
                cursor: "pointer",
            }}
        >
            Toggle theme
        </button>
    );
}
