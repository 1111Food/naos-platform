
import React from 'react';
import { Player } from '@remotion/player';
import { TempleAura } from '../remotion/TempleAura';
import { motion } from 'framer-motion';
import { useEnergy } from '../hooks/useEnergy';
import { useCoherence } from '../hooks/useCoherence';
import { useProfile } from '../hooks/useProfile';
import { supabase } from '../lib/supabase';
import { IntentionWidget } from '../components/IntentionWidget';
import { BentoBlock } from '../components/BentoBlock';
import { WisdomButton } from '../components/WisdomOverlay';
import { useWisdom } from '../hooks/useWisdom';
import { useSound } from '../hooks/useSound';

interface HomeProps {
    onSelectFeature: (feature: any, payload?: any) => void;
    activeFeature?: string;
}

export const Home: React.FC<HomeProps> = ({ onSelectFeature }) => {
    const { score, volatility } = useCoherence();
    const { profile } = useProfile();
    const { energy } = useEnergy();
    const { openWisdom } = useWisdom();
    const { playSound } = useSound();
    // Focused block state removed for Protocol/Lab as they now navigate directly.

    const isBunkerMode = volatility?.system_recommendation === 'TRIGGER_TRIAGE_MODE';

    // Realtime & Fetch Logic
    React.useEffect(() => {
        if (!profile?.id) return;

        const fetchIntentions = async () => {
            try {
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const startOfDayUTC = startOfDay.toISOString();

                await supabase
                    .from('intentions')
                    .select('intention_text')
                    .eq('user_id', profile.id)
                    .gte('created_at', startOfDayUTC)
                    .order('created_at', { ascending: false });

                // Intentions logic removed as per activeIntentions removal
            } catch (error) {
                console.error("Error fetching intentions:", error);
            }
        };

        fetchIntentions();

        const channel = supabase
            .channel('intentions_updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'intentions',
                    filter: `user_id=eq.${profile.id}`
                },
                (payload) => {
                    console.log('⚡ Realtime Update:', payload);
                    fetchIntentions();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [profile?.id]);

    const playerProps = React.useMemo(() => ({ score }), [score]);
    const playerStyle = React.useMemo(() => ({ width: '100%', height: '100%', objectFit: 'cover' as const, filter: isBunkerMode ? 'hue-rotate(320deg) saturate(0.8)' : 'none' }), [isBunkerMode]);

    return (
        <div className={`relative min-h-screen w-full flex flex-col items-center justify-start font-sans text-white transition-colors duration-1000 ${isBunkerMode ? 'bg-[#050000]' : 'bg-[#020202]'}`}>

            {/* 1. BACKGROUND ENGINE */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Player
                    component={TempleAura}
                    durationInFrames={900}
                    compositionWidth={1920} compositionHeight={1080} fps={60}
                    style={playerStyle}
                    autoPlay loop controls={false}
                    inputProps={playerProps}
                    acknowledgeRemotionLicense
                />
            </div>
            {isBunkerMode && <div className="fixed inset-0 z-[1] bg-red-900/5 mix-blend-color-burn pointer-events-none" />}

            {/* 2. SIGIL LAYER (PERSISTENT NARRATOR) */}
            <header className="relative z-50 w-full max-w-2xl px-6 pt-12 pb-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="w-full text-center cursor-pointer group"
                    onClick={() => { playSound('click'); onSelectFeature('CHAT'); }}
                >
                    <div className="relative p-6 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-500/20 blur-2xl rounded-full" />
                        <p className="text-lg md:text-xl font-serif italic text-white/90 leading-relaxed transition-colors">
                            {energy?.guidance ? `"${energy.guidance}"` : "Sincronizando frecuencias natales..."}
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-3 opacity-20 group-hover:opacity-60 transition-opacity">
                            <div className="h-[0.5px] w-4 bg-white" />
                            <span className="text-[8px] uppercase tracking-[0.6em] font-black">Sigil Guardian</span>
                            <div className="h-[0.5px] w-4 bg-white" />
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* 3. BENTO GRID (THE PIECES) */}
            <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 flex-1 flex flex-col justify-center gap-12">

                {/* 1. SVG CLIP PATHS DEFINITIONS */}
                <svg width="0" height="0" className="absolute pointer-events-none">
                    <defs>
                        <clipPath id="puzzle-astro" clipPathUnits="objectBoundingBox">
                            <path d="M 0,0 H 0.9 V 0.4 C 0.8,0.4 0.8,0.6 0.9,0.6 V 0.9 H 0.6 C 0.6,1 0.4,1 0.4,0.9 H 0 Z" />
                        </clipPath>
                        <clipPath id="puzzle-command" clipPathUnits="objectBoundingBox">
                            <path d="M 0.1,0 H 1 V 0.9 H 0.6 C 0.6,0.8 0.4,0.8 0.4,0.9 H 0.1 V 0.6 C 0,0.6 0,0.4 0.1,0.4 Z" />
                        </clipPath>
                        <clipPath id="puzzle-protocol" clipPathUnits="objectBoundingBox">
                            <path d="M 0,0.1 H 0.4 C 0.4,0.2 0.6,0.2 0.6,0.1 H 0.9 V 0.4 C 1,0.4 1,0.6 0.9,0.6 V 1 H 0 Z" />
                        </clipPath>
                        <clipPath id="puzzle-evolution" clipPathUnits="objectBoundingBox">
                            <path d="M 0.1,0.1 H 0.4 C 0.4,0 0.6,0 0.6,0.1 H 1 V 1 H 0.1 V 0.6 C 0.2,0.6 0.2,0.4 0.1,0.4 Z" />
                        </clipPath>
                    </defs>
                </svg>

                <div className="flex justify-center mb-8">
                    <WisdomButton color="cyan" onClick={() => { playSound('click'); openWisdom('IDENTITY'); }} />
                </div>

                {/* THE OVERLAPPING PUZZLE CONTAINER */}
                <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                    <div className="flex w-full -mb-[10%] relative z-20">
                        <div className="relative z-30 w-1/2 -mr-[5%]">
                            <BentoBlock
                                isTopRow={true}
                                title="CÓDIGO DE IDENTIDAD"
                                accent="cyan"
                                clipPath="url(#puzzle-astro)"
                                pathData="M 0,0 H 0.9 V 0.4 C 0.8,0.4 0.8,0.6 0.9,0.6 V 0.9 H 0.6 C 0.6,1 0.4,1 0.4,0.9 H 0 Z"
                                onClick={() => { playSound('click'); onSelectFeature('IDENTITY_NEXUS'); }}
                            />
                        </div>
                        <div className="relative z-10 w-1/2 -ml-[5%]">
                            <BentoBlock
                                isTopRow={true}
                                title="ORÁCULO DE ALMAS"
                                accent="magenta"
                                clipPath="url(#puzzle-command)"
                                pathData="M 0.1,0 H 1 V 0.9 H 0.6 C 0.6,0.8 0.4,0.8 0.4,0.9 H 0.1 V 0.6 C 0,0.6 0,0.4 0.1,0.4 Z"
                                onClick={() => { playSound('click'); onSelectFeature('ORACLE_SOULS'); }}
                            />
                        </div>
                    </div>

                    <div className="flex w-full relative z-10">
                        <div className="relative z-20 w-1/2 -mr-[5%]">
                            <BentoBlock
                                isTopRow={false}
                                title="PROTOCOLOS Y RANGO"
                                accent="emerald"
                                clipPath="url(#puzzle-protocol)"
                                pathData="M 0,0.1 H 0.4 C 0.4,0.2 0.6,0.2 0.6,0.1 H 0.9 V 0.4 C 1,0.4 1,0.6 0.9,0.6 V 1 H 0 Z"
                                onClick={() => { playSound('click'); onSelectFeature('PROTOCOL21'); }}
                            />
                        </div>
                        <div className="relative z-10 w-1/2 -ml-[5%]">
                            <BentoBlock
                                isTopRow={false}
                                title="LABORATORIO ELEMENTAL"
                                accent="orange"
                                clipPath="url(#puzzle-evolution)"
                                pathData="M 0.1,0.1 H 0.4 C 0.4,0 0.6,0 0.6,0.1 H 1 V 1 H 0.1 V 0.6 C 0.2,0.6 0.2,0.4 0.1,0.4 Z"
                                onClick={() => { playSound('click'); onSelectFeature('ELEMENTAL_LAB'); }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <IntentionWidget />
                </div>
            </main>

            {/* 4. INTERACTIVE FOCUS OVERLAY - MODAL LOGIC REMOVED FOR PROTOCOL/LAB */}
        </div>
    );
};
