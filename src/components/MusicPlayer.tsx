import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, AlertCircle } from "lucide-react";
import { SiSpotify } from "react-icons/si";

// SoundCloud Widget API types
declare global {
    interface Window {
        SC: {
            Widget: {
                (element: HTMLIFrameElement | string): SCWidget;
                Events: {
                    READY: string;
                    PLAY: string;
                    PAUSE: string;
                    FINISH: string;
                    PLAY_PROGRESS: string;
                    LOAD_PROGRESS: string;
                };
            };
        };
    }
}

interface SCWidget {
    bind: (event: string, callback: (data?: any) => void) => void;
    unbind: (event: string) => void;
    load: (url: string, options?: any) => void;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    seekTo: (milliseconds: number) => void;
    setVolume: (volume: number) => void;
    getSounds: (callback: (sounds: any[]) => void) => void;
    getCurrentSound: (callback: (sound: any) => void) => void;
    getDuration: (callback: (duration: number) => void) => void;
    skip: (index: number) => void;
}

interface TrackInfo {
    title: string;
    artist: string;
    artwork: string;
}

const PLAYER_API_URL = "https://w.soundcloud.com/player/api.js";
const PLAYLIST_URL = "https://soundcloud.com/user-826990615-552432678/sets/vibin";

export default function MusicPlayer() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<SCWidget | null>(null);

    // State
    const [apiReady, setApiReady] = useState(false);
    const [widgetReady, setWidgetReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
    const [volume, setVolume] = useState(50);

    // Helpers
    const getArtwork = useCallback((sound: any): string => {
        if (!sound) return "";
        const url = sound.artwork_url || sound.user?.avatar_url || "";
        if (!url) return "";
        return url.replace("-large", "-t500x500").replace("large", "t500x500");
    }, []);

    const getHourlyIndex = useCallback((totalTracks: number): number => {
        const currentHour = new Date().getHours();
        const today = new Date().toDateString();
        const seed = `${today}-${currentHour}`;
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % totalTracks;
    }, []);

    // 1. Script Loading
    useEffect(() => {
        // If API is already available (e.g. navigation back to this page)
        if (window.SC) {
            setApiReady(true);
            return;
        }

        const existingScript = document.querySelector(`script[src="${PLAYER_API_URL}"]`);

        if (existingScript) {
            // If script exists but apiReady isn't true yet, wait for it
            const handleLoad = () => setApiReady(true);
            existingScript.addEventListener('load', handleLoad);
            return () => existingScript.removeEventListener('load', handleLoad);
        }

        // Inject script
        const script = document.createElement('script');
        script.src = PLAYER_API_URL;
        script.async = true;
        script.onload = () => setApiReady(true);
        script.onerror = () => setError("Failed to load SoundCloud API");
        document.body.appendChild(script);

        // Timeout fallback
        const timeoutId = setTimeout(() => {
            if (!window.SC) {
                setError("SoundCloud API connection timed out. Check your ad blocker.");
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    // 2. Widget Initialization
    useEffect(() => {
        if (!apiReady || !iframeRef.current || widgetReady) return;

        try {
            const widget = window.SC.Widget(iframeRef.current);
            widgetRef.current = widget;

            widget.bind(window.SC.Widget.Events.READY, () => {
                setWidgetReady(true);
                // Initial setup once ready
                const initializePlayer = (retries = 3) => {
                    widget.getSounds((sounds) => {
                        if (sounds && sounds.length > 0) {
                            const index = getHourlyIndex(sounds.length);
                            updateTrackInfo(sounds[index]);
                            widget.skip(index);
                        } else if (retries > 0) {
                            setTimeout(() => initializePlayer(retries - 1), 500);
                        } else {
                            // Last resort fallback
                            widget.getCurrentSound((sound) => {
                                if (sound) updateTrackInfo(sound);
                            });
                        }
                    });
                };

                initializePlayer();
            });

            // Bind events
            widget.bind(window.SC.Widget.Events.PLAY, () => {
                setIsPlaying(true);
                widget.getCurrentSound((sound) => sound && updateTrackInfo(sound));
                widget.getDuration((d) => setDuration(d));
            });

            widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));

            widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data: any) => {
                setCurrentTime(data.currentPosition);
            });

            widget.bind(window.SC.Widget.Events.FINISH, () => {
                widget.seekTo(0);
                widget.play();
            });

        } catch (e) {
            console.error("Widget initialization failed", e);
            setError("Music player failed to initialize");
        }
    }, [apiReady, getHourlyIndex]);

    const updateTrackInfo = (sound: any) => {
        setTrackInfo({
            title: sound.title,
            artist: sound.user?.username || "Unknown Artist",
            artwork: getArtwork(sound)
        });
        setIsLoading(false);
    };

    const togglePlay = () => widgetRef.current?.toggle();

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setVolume(val);
        widgetRef.current?.setVolume(val);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setCurrentTime(val);
        widgetRef.current?.seekTo(val);
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (error) {
        return (
            <div className="w-full max-w-[560px] bg-red-500/10 border border-red-500/20 p-4 rounded-none flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[560px] bg-gradient-to-r from-[#0b0b0b] to-[#141414] border border-white/[0.06] rounded-none p-4 shadow-sm flex flex-col gap-4 relative overflow-hidden font-sans">
            {/* Last Played Label */}
            <div className="flex items-center justify-between relative z-10 px-0.5">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#81f8a0] animate-pulse" />
                    <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Last Played</span>
                </div>
                <SiSpotify size={18} className="text-[#1DB954] opacity-80" />
            </div>

            <iframe
                ref={iframeRef}
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(PLAYLIST_URL)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                className="absolute w-0 h-0 opacity-0 pointer-events-none"
                allow="autoplay"
                title="Music Player"
            />

            {/* Top Row: Artwork + Info */}
            <div className="flex gap-5 items-start relative z-10">
                <div className="w-16 h-16 flex-shrink-0 border border-white/[0.05] overflow-hidden bg-zinc-800">
                    {isLoading || !trackInfo ? (
                        <div className="w-full h-full bg-zinc-800 animate-pulse" />
                    ) : (
                        <img
                            src={trackInfo.artwork}
                            alt={trackInfo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                        />
                    )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <div className="min-w-0">
                        {isLoading || !trackInfo ? (
                            <>
                                <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4 mb-2" />
                                <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
                            </>
                        ) : (
                            <>
                                <h3 className="text-white font-bold truncate text-[16px] leading-tight mb-0.5">{trackInfo.title}</h3>
                                <p className="text-zinc-500 truncate text-[12px] leading-none uppercase tracking-wider font-medium">{trackInfo.artist}</p>
                            </>
                        )}
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-1.5">
                        <div className="relative w-full h-3 flex items-center group/progress">
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer disabled:cursor-not-allowed"
                                disabled={!widgetReady}
                            />
                            <div className="w-full h-[2px] bg-white/[0.05] relative rounded-full overflow-hidden z-20">
                                <div
                                    className="h-full bg-[#81f8a0] transition-all duration-100 ease-linear"
                                    style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-zinc-600 font-mono tabular-nums leading-none tracking-tight">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between relative z-10 pt-1 px-1">
                <div className="w-24 hidden sm:block" />
                <button
                    onClick={togglePlay}
                    disabled={!widgetReady}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-2 group/vol w-24 justify-end">
                    <Volume2 size={13} className="text-zinc-500 opacity-60 group-hover/vol:opacity-100 transition-opacity" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-[2px] bg-white/[0.05] appearance-none cursor-pointer accent-white hover:accent-[#81f8a0]"
                    />
                </div>
            </div>
        </div>
    );
}
