import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { SiSpotify } from "react-icons/si";

// SoundCloud Widget API types (simplified)
declare global {
    interface Window {
        SC: any;
    }
}

interface TrackInfo {
    title: string;
    artist: string;
    artwork: string;
}

export default function MusicPlayer() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);
    const hasLoadedMetadata = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
    const [volume, setVolume] = useState(50);

    const playlistUrl = "https://soundcloud.com/user-826990615-552432678/sets/vibin";

    const getArtwork = useCallback((sound: any): string => {
        if (!sound) return "";
        const url = sound.artwork_url || sound.user?.avatar_url || "";
        if (!url) return "";
        return url.replace("-large", "-t500x500").replace("large", "t500x500");
    }, []);

    // Calculate which track to show based on current hour
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

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        let pollIntervalId: ReturnType<typeof setInterval>;

        const loadWidget = () => {
            if (window.SC && iframeRef.current) {
                const widget = window.SC.Widget(iframeRef.current);
                widgetRef.current = widget;

                // Function to fetch current sound info after skip
                const fetchCurrentSoundInfo = () => {
                    widget.getCurrentSound((sound: any) => {
                        if (sound && sound.title && !hasLoadedMetadata.current) {
                            const artwork = getArtwork(sound);
                            setTrackInfo({
                                title: sound.title,
                                artist: sound.user?.username || "Unknown Artist",
                                artwork: artwork
                            });
                            setIsLoading(false);
                            hasLoadedMetadata.current = true;

                            // Get duration
                            widget.getDuration((d: number) => {
                                if (d > 0) setDuration(d);
                            });
                        }
                    });
                };

                // Skip to the hourly track and then get its info
                const loadHourlyTrack = () => {
                    widget.getSounds((sounds: any[]) => {
                        if (sounds && sounds.length > 0) {
                            const index = getHourlyIndex(sounds.length);
                            widget.skip(index);

                            // Wait for skip to complete, then fetch current sound
                            setTimeout(() => {
                                fetchCurrentSoundInfo();
                            }, 1000);
                        }
                    });
                };

                // Poll for sounds availability
                const pollForSounds = () => {
                    let pollCount = 0;
                    const maxPolls = 30;

                    pollIntervalId = setInterval(() => {
                        pollCount++;

                        if (hasLoadedMetadata.current || pollCount > maxPolls) {
                            clearInterval(pollIntervalId);
                            return;
                        }

                        widget.getSounds((sounds: any[]) => {
                            if (sounds && sounds.length > 0 && !hasLoadedMetadata.current) {
                                clearInterval(pollIntervalId);
                                const index = getHourlyIndex(sounds.length);
                                widget.skip(index);

                                // Wait for skip, then get current sound with full metadata
                                setTimeout(() => {
                                    fetchCurrentSoundInfo();
                                }, 1000);
                            }
                        });
                    }, 500);
                };

                widget.bind(window.SC.Widget.Events.READY, () => {
                    // Start polling for sounds
                    pollForSounds();

                    // Check for hour change every minute
                    intervalId = setInterval(() => {
                        const now = new Date();
                        if (now.getMinutes() === 0 && now.getSeconds() < 10) {
                            hasLoadedMetadata.current = false;
                            loadHourlyTrack();
                        }
                    }, 60000);
                });

                // Listen for SOUND_LOAD event which fires when a sound starts loading
                widget.bind(window.SC.Widget.Events.LOAD_PROGRESS, () => {
                    if (!hasLoadedMetadata.current) {
                        fetchCurrentSoundInfo();
                    }
                });

                widget.bind(window.SC.Widget.Events.PLAY, () => {
                    setIsPlaying(true);
                    widget.getCurrentSound((sound: any) => {
                        if (sound && sound.title) {
                            const artwork = getArtwork(sound);
                            setTrackInfo({
                                title: sound.title,
                                artist: sound.user?.username || "Unknown Artist",
                                artwork: artwork
                            });
                            setIsLoading(false);
                            hasLoadedMetadata.current = true;
                        }
                    });
                    widget.getDuration((d: number) => setDuration(d));
                });

                widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
                widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (progress: any) => {
                    setCurrentTime(progress.currentPosition);
                });

                widget.bind(window.SC.Widget.Events.FINISH, () => {
                    widget.seekTo(0);
                    widget.play();
                });
            }
        };

        if (window.SC) {
            loadWidget();
        } else {
            const checkSC = setInterval(() => {
                if (window.SC) {
                    loadWidget();
                    clearInterval(checkSC);
                }
            }, 100);
            return () => {
                clearInterval(checkSC);
                if (intervalId) clearInterval(intervalId);
                if (pollIntervalId) clearInterval(pollIntervalId);
            };
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (pollIntervalId) clearInterval(pollIntervalId);
        };
    }, [getHourlyIndex, getArtwork]);

    const togglePlay = () => {
        if (widgetRef.current) {
            widgetRef.current.toggle();
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setVolume(value);
        if (widgetRef.current) widgetRef.current.setVolume(value);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetTime = parseInt(e.target.value);
        setCurrentTime(targetTime);
        if (widgetRef.current) {
            widgetRef.current.seekTo(targetTime);
        }
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

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

            {/* Hidden SoundCloud Iframe */}
            <iframe
                ref={iframeRef}
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(playlistUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                className="hidden"
                allow="autoplay"
            />

            {/* Top Row: Artwork + Info & Progress */}
            <div className="flex gap-5 items-start relative z-10">
                {/* Artwork */}
                <div className="w-16 h-16 flex-shrink-0 border border-white/[0.05] overflow-hidden bg-zinc-800">
                    {isLoading || !trackInfo ? (
                        <div className="w-full h-full bg-zinc-800 animate-pulse" />
                    ) : trackInfo.artwork ? (
                        <img
                            src={trackInfo.artwork}
                            alt={trackInfo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                            <SiSpotify size={24} className="text-zinc-500" />
                        </div>
                    )}
                </div>

                {/* Info and Progress Column */}
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <div className="min-w-0">
                        {isLoading || !trackInfo ? (
                            <>
                                <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4 mb-2" />
                                <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
                            </>
                        ) : (
                            <>
                                <h3 className="text-white font-bold truncate text-[16px] leading-tight mb-0.5">
                                    {trackInfo.title}
                                </h3>
                                <p className="text-zinc-500 truncate text-[12px] leading-none uppercase tracking-wider font-medium">
                                    {trackInfo.artist}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Progress Bar Area */}
                    <div className="flex flex-col gap-1.5">
                        <div className="relative w-full h-3 flex items-center group/progress">
                            {/* Seek Slider (Overlay) */}
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer"
                            />

                            {/* Visual Progress Bar */}
                            <div className="w-full h-[2px] bg-white/[0.05] relative rounded-full overflow-hidden z-20">
                                <div
                                    className="h-full bg-[#81f8a0] transition-all duration-100 ease-linear"
                                    style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                                />
                            </div>

                            {/* Hover Indicator Knob (Optional) */}
                            <div
                                className="absolute h-2 w-2 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity z-40 pointer-events-none"
                                style={{
                                    left: duration > 0 ? `calc(${(currentTime / duration) * 100}% - 4px)` : '-4px'
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-zinc-600 font-mono tabular-nums leading-none tracking-tight">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Controls (Centered) & Volume (Right) */}
            <div className="flex items-center justify-between relative z-10 pt-1 px-1">
                {/* Left side empty for centering balance */}
                <div className="w-24 hidden sm:block" />

                {/* Controls (Centered) */}
                <div className="flex items-center">
                    <button
                        onClick={togglePlay}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shadow-md"
                    >
                        {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
                    </button>
                </div>

                {/* Volume Slider (Right) */}
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
