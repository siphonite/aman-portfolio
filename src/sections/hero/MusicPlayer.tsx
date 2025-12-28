import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { SiSpotify } from "react-icons/si";

// SoundCloud Widget API types (simplified)
declare global {
    interface Window {
        SC: any;
    }
}

export default function MusicPlayer() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackInfo, setTrackInfo] = useState({
        title: "",
        artist: "",
        artwork: "https://picsum.photos/seed/music/200/200"
    });
    const [volume, setVolume] = useState(50);

    const playlistUrl = "https://soundcloud.com/user-826990615-552432678/sets/vibin";

    useEffect(() => {
        const loadWidget = () => {
            if (window.SC && iframeRef.current) {
                const widget = window.SC.Widget(iframeRef.current);
                widgetRef.current = widget;

                widget.bind(window.SC.Widget.Events.READY, () => {
                    const updateHourlyTrack = () => {
                        widget.getSounds((sounds: any[]) => {
                            if (sounds && sounds.length > 0) {
                                const currentHour = new Date().getHours();
                                const today = new Date().toDateString();
                                const seed = `${today}-${currentHour}`;
                                let hash = 0;
                                for (let i = 0; i < seed.length; i++) {
                                    hash = (hash << 5) - hash + seed.charCodeAt(i);
                                    hash |= 0;
                                }
                                const index = Math.abs(hash) % sounds.length;

                                const sound = sounds[index];
                                if (sound) {
                                    setTrackInfo({
                                        title: sound.title,
                                        artist: sound.user.username,
                                        artwork: sound.artwork_url ? sound.artwork_url.replace("large", "t500x500") : "https://picsum.photos/seed/music/200/200"
                                    });
                                }
                                widget.skip(index);
                            }
                        });
                    };

                    updateHourlyTrack();

                    // Check for hour change every minute
                    const intervalId = setInterval(() => {
                        const now = new Date();
                        if (now.getMinutes() === 0 && now.getSeconds() < 10) {
                            updateHourlyTrack();
                        }
                    }, 60000);
                });

                widget.bind(window.SC.Widget.Events.PLAY, () => {
                    setIsPlaying(true);
                    widget.getCurrentSound((sound: any) => {
                        if (sound) {
                            setTrackInfo({
                                title: sound.title,
                                artist: sound.user.username,
                                artwork: sound.artwork_url ? sound.artwork_url.replace("large", "t500x500") : "https://picsum.photos/seed/music/200/200"
                            });
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
            return () => clearInterval(checkSC);
        }
    }, []);

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
                <div className="w-16 h-16 flex-shrink-0 border border-white/[0.05] overflow-hidden">
                    <img
                        src={trackInfo.artwork}
                        alt={trackInfo.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info and Progress Column */}
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <div className="min-w-0">
                        <h3 className="text-white font-bold truncate text-[16px] leading-tight mb-0.5">
                            {trackInfo.title || "Fetching for Song"}
                        </h3>
                        <p className="text-zinc-500 truncate text-[12px] leading-none uppercase tracking-wider font-medium">
                            {trackInfo.artist || "..."}
                        </p>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="flex flex-col gap-1.5">
                        <div className="h-[2px] w-full bg-white/[0.05] relative cursor-pointer group/progress">
                            <div
                                className="h-full bg-[#81f8a0] transition-all duration-300 relative"
                                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
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
