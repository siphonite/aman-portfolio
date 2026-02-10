

export const ClaudeLogo = ({ size = 24, className = "", color = "currentColor" }: { size?: number; className?: string; color?: string }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M15.42 2.76 8.79 0l-6.63 2.76A1 1 0 0 0 1.6 3.73v9.54a1 1 0 0 0 .56.97L8.79 16l6.63-2.76a1 1 0 0 0 .56-.97V3.73a1 1 0 0 0-.56-.97M8.79 1.25l5.9 2.45v9.53l-5.9 2.45-5.9-2.45V3.7l5.9-2.46zM7.5 4.5v3.5h1V4.5h-1zm0 4.5v3.5h1V9h-1z" />
        </svg>
    );
};
