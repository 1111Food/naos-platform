// client/src/components/AstrologyView.tsx
import { useState, useMemo } from 'react';
import { useActiveProfile } from '../hooks/useActiveProfile';
import { useSubscription } from '../hooks/useSubscription';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, User, Clock, MapPin, Zap, Info, X, Theater, Shirt, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { NatalChartWheel } from './NatalChartWheel';
import { PLANETS_LIB, SIGNS_LIB, HOUSES_LIB } from '../data/astrologyLibrary';
import { ASTRO_EDUCATION, PLANET_DESCRIPTIONS, HOUSE_DESCRIPTIONS, SIGN_DESCRIPTIONS } from '../data/astrologyEducation';
import { getZodiacImage } from '../utils/zodiacMapper';


// 🌟 GLIFOS ASTROLÓGICOS
const getPlanetaryGlyph = (planetKey: string): string => {
    const glyphs: Record<string, string> = {
        Sun: '☉',
        Moon: '☽',
        Mercury: '☿',
        Venus: '♀',
        Mars: '♂',
        Jupiter: '♃',
        Saturn: '♄',
        Uranus: '♅',
        Neptune: '♆',
        Pluto: '♇',
        Ascendant: 'Asc'
    };
    return glyphs[planetKey] || '•';
};

// Subcomponente para Barra de Elementos
const ElementBar = ({ label, color, percent, icon }: { label: string, color: string, percent: number, icon: string }) => (
    <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">{icon} {label}</span>
            <span>{percent}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }} />
        </div>
    </div>
);

// Subcomponente para el Manual del Alma (Modal)
const EducationalManual = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#0a0a1f] border border-purple-500/30 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-6 custom-scrollbar"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/90 py-4 z-10 border-b border-white/5 backdrop-blur-md">
                        <h2 className="text-xl font-thin text-white tracking-[0.3em] uppercase flex items-center gap-3">
                            <Info className="text-purple-400 w-5 h-5" /> Manual del Alma
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                            <X className="text-white/30 group-hover:text-white transition-colors" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {Object.values(ASTRO_EDUCATION).map((section: any) => (
                            <div key={section.id} className="space-y-3">
                                <h3 className="text-lg font-bold text-amber-300">{section.title}</h3>
                                <p className="text-white/70 leading-relaxed">{section.content}</p>
                                <div className="p-3 bg-purple-500/10 border-l-4 border-purple-500 rounded text-purple-200 italic text-sm">
                                    "{section.metaphor}"
                                </div>
                            </div>
                        ))}

                        <div className="pt-6 border-t border-white/10">
                            <h3 className="text-lg font-bold text-emerald-300 mb-4">Los Actores (Planetas)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(PLANET_DESCRIPTIONS).map(([key, data]: [string, any]) => (
                                    <div key={key} className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{PLANETS_LIB[key]?.name || key}</span>
                                        <p className="text-sm font-medium text-white mb-1">{data.character}</p>
                                        <p className="text-xs text-white/50">{data.intro}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <h3 className="text-lg font-bold text-amber-500 mb-4">El Vestuario (Signos)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {Object.entries(SIGN_DESCRIPTIONS).map(([key, data]: [string, any]) => (
                                    <div key={key} className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center text-center group/sign hover:bg-white/10 transition-all">
                                        <div className="w-full aspect-[2/3] rounded-lg border border-amber-500/20 overflow-hidden mb-3 relative flex items-center justify-center bg-black/40">
                                            <img
                                                src={getZodiacImage(key)}
                                                alt={key}
                                                className="absolute inset-0 w-full h-full object-cover object-center scale-[2.5] brightness-110 group-hover/sign:scale-[2.6] transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter">{SIGNS_LIB[key]?.name || key}</span>
                                        <p className="text-[10px] text-white/80 font-medium leading-tight mt-1">{data.gift}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <h3 className="text-lg font-bold text-blue-300 mb-4">Los Escenarios (Casas)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(HOUSE_DESCRIPTIONS).map(([num, desc]: [string, any]) => (
                                    <div key={num} className="p-2 bg-white/5 rounded border border-white/5 flex gap-3 items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
                                            {num}
                                        </div>
                                        <p className="text-xs text-white/60 leading-tight">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// Subcomponente para el Detalle de la Tríada (Actor, Vestuario, Escenario)
const DetailCardModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => (
    <AnimatePresence>
        {isOpen && data && (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#0a0a1f] border border-purple-500/30 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header con gradiente */}
                    <div className="h-64 relative overflow-hidden flex items-end p-6">
                        <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${data.accentColor || 'from-purple-600 to-blue-900'}`} />
                        <div className="relative z-10 flex items-center gap-6">
                            {data.id && (
                                <div className="w-32 aspect-[2/3] rounded-xl border border-white/20 overflow-hidden shadow-2xl relative translate-y-4 shrink-0 bg-black/40">
                                    <img
                                        src={getZodiacImage(data.id)}
                                        alt={data.id}
                                        className="w-full h-full object-cover object-center brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-[2.5]"
                                        style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>
                            )}
                            <div className="mb-2">
                                <h3 className="text-2xl font-black uppercase tracking-widest text-white leading-none mb-1">{data.title}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">{data.subtitle}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20">
                            <X className="w-4 h-4 text-white/50" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Main Content */}
                        <div className="space-y-4">
                            {data.content.map((item: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    {item.label && <h4 className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold">{item.label}</h4>}
                                    <p className={`text-white/80 leading-relaxed ${item.highlight ? 'text-base font-medium text-white italic' : 'text-sm'}`}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Extra (Mantra/Question) */}
                        {data.footer && (
                            <div className="pt-4 border-t border-white/10 italic text-white/40 text-xs text-center">
                                "{data.footer}"
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export function AstrologyView({ onBack, overrideProfile }: { onBack?: () => void, overrideProfile?: any }) {

    // --- UNIFIED STATE (v9.16) ---
    const { profile: activeProfile, loading: activeLoading } = useActiveProfile();

    // Only fetch subscription if we are NOT in guest mode (overrideProfile is undefined)
    const { status: subscription } = useSubscription(!overrideProfile);

    // Logic for Profile Injection (Guest Mode vs User Mode)
    // PRIORIDAD CRÍTICA: Si existe overrideProfile, úsalo y NO esperes a loading
    const profile = overrideProfile || activeProfile;
    // Si hay override, loading es false. Si no, usa el loading del hook.
    const loading = overrideProfile ? false : activeLoading;

    const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
    const [showDeepInsight, setShowDeepInsight] = useState<string | null>(null); // Track which planet's deep insight is shown
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<any>(null);

    const displayName = profile?.nickname || profile?.name || 'Viajero';

    // Memoize chart data processing and Elements Balance
    const { chartData, elementsBalance, displayList } = useMemo(() => {
        const activeData = profile?.astrology;

        // Validación robusta: Si no hay datos, retornamos nulls
        if (!activeData || !activeData.planets || activeData.planets.length === 0) {
            return { chartData: null, elementsBalance: null, displayList: [] };
        }

        const ascendant = activeData.ascendant || 0;

        // 1. Process planets for Chart Wheel
        const bodiesList = activeData.planets.map((p: any) => ({
            name: PLANETS_LIB[p.name]?.name || p.name, // Nombre español si existe
            key: p.name, // Add key for consistent lookup
            signName: p.name === 'Ascendant' ? 'Ascendant' : p.sign, // Guardamos nombre inglés del signo para lookups
            signDisplay: SIGNS_LIB[p.sign]?.name || p.sign, // Nombre español para UI
            house: p.house,
            absDegree: p.absDegree, // ✅ CORREGIDO: backend envía absDegree, no absPos
            retro: p.retro,
            isAscendant: false
        }));

        const housesList = (activeData.houses || []).map((h: any, i: number) => ({
            house: i + 1,
            absDegree: typeof h === 'number' ? h : (h?.absDegree || 0)
        }));

        // Add Ascendant to display list (backend doesn't include it in planets array)
        const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const ascendantSignName = signNames[Math.floor(ascendant / 30)];
        const ascendantEntry = {
            name: 'Ascendente',
            key: 'Ascendant', // Add key for consistent lookup
            signName: ascendantSignName,
            signDisplay: SIGNS_LIB[ascendantSignName]?.name || ascendantSignName,
            house: 1, // Ascendant is always in house 1
            absDegree: ascendant,
            retro: false,
            isAscendant: true
        };

        // 2. Calculate Elements Balance (HARDCODED MAPPING)
        const ELEMENT_MAP: Record<string, string> = {
            // 🔥 FUEGO
            'Aries': 'Fire',
            'Leo': 'Fire',
            'Sagittarius': 'Fire',
            'Sagitario': 'Fire',
            // 🌍 TIERRA
            'Taurus': 'Earth',
            'Tauro': 'Earth',
            'Virgo': 'Earth',
            'Capricorn': 'Earth',
            'Capricornio': 'Earth',
            // 💨 AIRE
            'Gemini': 'Air',
            'Géminis': 'Air',
            'Libra': 'Air',
            'Aquarius': 'Air',
            'Acuario': 'Air',
            // 💧 AGUA
            'Cancer': 'Water',
            'Cáncer': 'Water',
            'Scorpio': 'Water',
            'Escorpio': 'Water',
            'Pisces': 'Water',
            'Piscis': 'Water'
        };

        const elementsCount: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

        // Count all planets (including Sun, Moon, etc.)
        activeData.planets.forEach((p: any) => {
            const element = ELEMENT_MAP[p.sign];
            if (element) {
                elementsCount[element]++;
            }
        });

        // Add Ascendant to the count
        const ascendantElement = ELEMENT_MAP[ascendantSignName];
        if (ascendantElement) {
            elementsCount[ascendantElement]++;
        }

        // Total = all planets + ascendant
        const totalPoints = activeData.planets.length + 1; // +1 for Ascendant

        // Normalize to percentages
        const balance = {
            fire: totalPoints ? Math.round((elementsCount['Fire'] || 0) / totalPoints * 100) : 0,
            earth: totalPoints ? Math.round((elementsCount['Earth'] || 0) / totalPoints * 100) : 0,
            air: totalPoints ? Math.round((elementsCount['Air'] || 0) / totalPoints * 100) : 0,
            water: totalPoints ? Math.round((elementsCount['Water'] || 0) / totalPoints * 100) : 0
        };

        return {
            chartData: { bodies: bodiesList, houses: housesList, ascendant },
            elementsBalance: balance,
            displayList: [ascendantEntry, ...bodiesList] // Ascendant first
        };
    }, [profile]);

    // --- RENDER FALLBACK IF LOADING OR NO DATA ---
    if (loading) return <div className="flex items-center justify-center h-full text-white/50 animate-pulse">Consultando a los astros...</div>;

    // Si no hay datos o la esencia está incompleta, mostrar estado vacío amigable
    if (!chartData || !profile?.birthDate) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center space-y-8">
                <Star className="w-16 h-16 text-amber-500/10 animate-pulse-slow" />
                <div className="space-y-2">
                    <h3 className="text-2xl font-thin text-amber-100 uppercase tracking-[0.3em]">Esencia en Silencio</h3>
                    <p className="text-white/30 max-w-sm text-[11px] leading-relaxed uppercase tracking-widest">
                        "Los cielos requieren tus coordenadas de origen para revelar el mapa de tu alma."
                    </p>
                </div>
                <button
                    onClick={() => onBack?.()}
                    className="px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-white/50 hover:text-white"
                >
                    Volver al Altar
                </button>
            </div>
        );
    }

    // --- DEEP INSIGHT GENERATOR (TEATRO DE LA VIDA) ---
    const generateDeepInsight = (planetKey: string, signKey: string, houseNum: number) => {
        const p = PLANETS_LIB[planetKey] || PLANETS_LIB['Sun'];
        const s = SIGNS_LIB[signKey] || SIGNS_LIB['Aries'];
        const h = HOUSES_LIB[houseNum] || HOUSES_LIB[1];

        return (
            <div className="space-y-4 text-white/90 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h4 className="text-purple-300 font-bold mb-1 text-sm uppercase tracking-wider">La Escena</h4>
                    <p className="text-lg italic font-medium">
                        "El {p.archetype} ({p.name}) actuando con el estilo de {s.name} {h.scenario.replace('el escenario de ', '')}"
                    </p>
                    <p className="text-white/70 italic text-sm mt-3 pt-3 border-t border-purple-500/10">
                        {s.essence}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="text-amber-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Tu Misión
                        </h4>
                        <p className="text-sm">{p.mission}</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-emerald-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                            <Star className="w-3 h-3" /> Tu Estilo
                        </h4>
                        <p className="text-sm">Actúas {s.style}</p>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div>
                        <span className="text-emerald-400 font-bold text-xs">EN LUZ:</span>
                        <p className="text-sm text-white/70">{p.potential} (Don: {s.gift})</p>
                    </div>
                    <div>
                        <span className="text-rose-400 font-bold text-xs">EN SOMBRA:</span>
                        <p className="text-sm text-white/70">{p.shadow} (Trampa: {s.trap})</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 italic text-purple-200">
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <Info className="w-4 h-4" /> La Pregunta del Alma:
                    </p>
                    <p className="text-base">"{p.question}"</p>
                    <p className="text-right text-xs mt-2 opacity-50">— Mantra: {s.mantra}</p>
                </div>
            </div>
        );
    };

    // Check Premium status (Guest Mode is always Premium)
    const isPremium = overrideProfile
        ? true
        : (typeof subscription === 'object' && (subscription?.plan === 'PREMIUM' || subscription?.plan === 'EXTENDED')) ||
        (typeof subscription === 'string' && (subscription === 'PREMIUM' || subscription === 'EXTENDED'));

    // Fallback default for dev if needed, or stick to strict logic? 
    // User asked for "Hack para desbloquear vistas premium en modo invitado".
    // I already did `overrideProfile ? true`.
    // I will remove the `|| true` at the end to be strict unless dev mode.
    // For safety in this demo, I will leave `|| true` commented out or remove it to prove the fix.
    // Actually, I'll allow `|| subscription?.plan === 'TRIAL'`.

    console.log('🔍 Subscription Debug:', { subscription, isPremium });

    return (
        <div className="flex flex-col lg:flex-row h-full w-full gap-8 animate-in fade-in duration-1000">
            {/* LEFT COLUMN: GRAPHIC & SUMMARY */}
            <div
                className="w-full lg:w-1/2 flex flex-col gap-6 cursor-default"
                onClick={(e) => e.stopPropagation()}
            >



                {/* Main Wheel - Motor del Alma */}
                <div
                    className="relative aspect-square w-full max-w-md mx-auto rounded-full overflow-hidden"
                    style={{
                        background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)',
                        boxShadow: '0 0 60px rgba(168, 85, 247, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    <NatalChartWheel
                        planets={chartData.bodies}
                        houses={chartData.houses}
                        ascendant={chartData.ascendant}
                    />
                </div>

                {/* Elemental Balance */}
                {elementsBalance && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <ElementBar label="Fuego" icon="🔥" color="bg-red-500" percent={elementsBalance.fire} />
                        <ElementBar label="Tierra" icon="🌍" color="bg-emerald-500" percent={elementsBalance.earth} />
                        <ElementBar label="Aire" icon="💨" color="bg-amber-100" percent={elementsBalance.air} />
                        <ElementBar label="Agua" icon="💧" color="bg-blue-500" percent={elementsBalance.water} />
                    </div>
                )}

                {/* PLACA DE VERIFICACIÓN (COORDENADAS DEL ALMA) */}
                <div className="w-full mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <p className="text-[9px] tracking-widest text-slate-600 mb-1.5">COORDENADAS DEL ALMA</p>
                    <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-300">
                        <User size={10} className="text-cyan-500" />
                        <span className="uppercase">{profile?.name || displayName}</span>
                        <span className="text-slate-600">•</span>
                        <Clock size={10} className="text-purple-500" />
                        <span>{profile?.birthTime || '--:--'}</span>
                        <span className="text-slate-600">•</span>
                        <MapPin size={10} className="text-emerald-500" />
                        <span>{profile?.birthCity || '--'}, {profile?.birthCountry || '--'}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: INTERPRETATION LIST */}
            <div
                className="w-full lg:w-1/2 flex flex-col gap-6 h-full overflow-hidden cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 🌟 THE BIG THREE (SOL, LUNA, ASCENDENTE) */}
                <div className="space-y-3 max-w-xs">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-2">
                        <Star className="w-1 h-1 rounded-full bg-amber-400" />
                        La Tríada
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {['Sun', 'Moon', 'Ascendant'].map((key) => {
                            const body = displayList.find(b => b.key === key);
                            if (!body) return null;

                            const label = key === 'Sun' ? 'Sol' : key === 'Moon' ? 'Luna' : 'Asc';
                            const accentColor = key === 'Sun' ? 'text-amber-400' : key === 'Moon' ? 'text-purple-300' : 'text-cyan-400';

                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -2 }}
                                    className="flex flex-col gap-1.5 group cursor-pointer"
                                    onClick={() => setSelectedPlanet(selectedPlanet?.key === body.key ? null : body)}
                                >
                                    <div className="aspect-[2/3] w-20 rounded-lg border border-white/10 bg-black/40 overflow-hidden relative shadow-lg group-hover:border-white/30 transition-colors mx-auto">
                                        <motion.img
                                            src={getZodiacImage(body.signName)}
                                            alt={body.signName}
                                            initial={false}
                                            animate={{ scale: 2.5 }}
                                            whileHover={{ scale: 2.6 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="absolute inset-0 w-full h-full object-cover object-center brightness-110"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-end p-1.5">
                                            <span className={cn("text-[8px] font-black uppercase tracking-widest", accentColor)}>{label}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[9px] text-white/50 font-medium uppercase tracking-tighter line-clamp-1">{body.signDisplay}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-2 mt-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-purple-500" />
                        Configuración Natales
                    </h3>
                    <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {displayList.map((body: any, idx: number) => {
                        const planetInfo = PLANETS_LIB[body.key] || { name: body.name, archetype: 'Arquetipo', mission: '...', question: '...' };
                        const signInfo = SIGNS_LIB[body.signName] || { name: body.signDisplay, style: 'con su esencia' };
                        const eduInfo = PLANET_DESCRIPTIONS[body.key];

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedPlanet(selectedPlanet?.key === body.key ? null : body)}
                                className={`
                                    group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                                    ${selectedPlanet?.key === body.key
                                        ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                                `}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner
                                            ${selectedPlanet?.key === body.key ? 'bg-purple-500 text-white' : 'bg-purple-900/30 text-purple-300'}
                                        `}
                                            style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))' }}
                                        >
                                            {getPlanetaryGlyph(body.key)}
                                        </div>
                                        <div>
                                            <h4 className="text-purple-300 font-medium flex items-center gap-2">
                                                {body.name}
                                                {body.retro && <span className="text-[10px] bg-red-500/20 text-red-400 px-1 rounded">Rx</span>}
                                            </h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">
                                                {planetInfo.archetype} • {signInfo.name} • Casa {body.house || '?'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {eduInfo && !selectedPlanet && (
                                            <Info size={14} className="text-white/20 group-hover:text-purple-400/50" />
                                        )}
                                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedPlanet?.key === body.key ? 'rotate-90 text-purple-400' : 'text-white/20'}`} />
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {selectedPlanet?.key === body.key && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70 bg-[#050510]/60 -mx-4 -mb-4 px-4 pb-4"
                                        >
                                            <div className="mb-4">
                                                <p className="text-[11px] text-purple-300/70 uppercase tracking-widest font-bold mb-2">Tu Misión Evolutiva</p>
                                                <p className="text-xs text-white/90 leading-relaxed italic border-l-2 border-purple-500/40 pl-3">
                                                    "{planetInfo.mission}"
                                                </p>
                                            </div>

                                            {/* LA TRÍADA DEL TEATRO DE LA VIDA */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                                                {/* EL ACTOR */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedDetail({
                                                            title: planetInfo.name,
                                                            subtitle: "El Actor / Arquetipo",
                                                            accentColor: "from-purple-600 to-indigo-900",
                                                            content: [
                                                                { label: "Tu Arquetipo", text: planetInfo.archetype, highlight: true },
                                                                { label: "Esencia Energética", text: planetInfo.essence },
                                                                { label: "Misión Evolutiva", text: planetInfo.mission },
                                                                { label: "Don en Luz", text: planetInfo.potential },
                                                                { label: "Trampa en Sombra", text: planetInfo.shadow }
                                                            ],
                                                            footer: planetInfo.question
                                                        });
                                                    }}
                                                    className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl flex flex-col items-center text-center group/card hover:bg-purple-500/10 hover:border-purple-500/40 transition-all active:scale-95"
                                                >
                                                    <Theater size={18} className="text-purple-400 mb-1.5" />
                                                    <span className="text-[9px] uppercase tracking-tighter text-purple-300/50 font-bold mb-1">Actor</span>
                                                    <span className="text-xs font-bold text-white leading-tight">
                                                        {planetInfo.archetype.split(' / ')[0]}
                                                    </span>
                                                </div>

                                                {/* EL VESTUARIO */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedDetail({
                                                            title: signInfo.name,
                                                            id: body.signName, // Pass original sign name
                                                            subtitle: "El Vestuario / Estilo",
                                                            accentColor: "from-amber-600 to-orange-900",
                                                            content: [
                                                                { label: "Esencia Espiritual", text: signInfo.essence, highlight: true },
                                                                { label: "Don en Luz", text: signInfo.gift },
                                                                { label: "Trampa en Sombra", text: signInfo.trap },
                                                                { label: "Estilo", text: `Actúas ${signInfo.style}` }
                                                            ],
                                                            footer: `Mantra: ${signInfo.mantra}`
                                                        });
                                                    }}
                                                    className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex flex-col items-center text-center group/card hover:bg-amber-500/10 hover:border-amber-500/40 transition-all active:scale-95"
                                                >
                                                    <div className="w-10 aspect-[2/3] rounded-md overflow-hidden flex items-center justify-center mb-1.5 relative shadow-lg border border-amber-500/20 bg-black/40">
                                                        <img src={getZodiacImage(body.signName)} alt={signInfo.name} className="absolute inset-0 w-full h-full object-cover object-center scale-[2.5] brightness-110 pointer-events-none" />
                                                        <Shirt size={18} className="text-amber-400 opacity-10 absolute" /> {/* Fallback ghost icon */}
                                                    </div>
                                                    <span className="text-[9px] uppercase tracking-tighter text-amber-300/50 font-bold mb-1">Vestuario</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white leading-tight">{signInfo.name}</span>
                                                        <span className="text-[8px] text-amber-200/40 mt-1 leading-tight uppercase font-medium">Estilo {SIGNS_LIB[body.signName]?.style.replace('con ', '').replace('una ', '')}</span>
                                                    </div>
                                                </div>

                                                {/* EL ESCENARIO */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const h = HOUSES_LIB[body.house] || HOUSES_LIB[1];
                                                        setSelectedDetail({
                                                            title: `Casa ${body.house}`,
                                                            subtitle: "El Escenario / Área de Vida",
                                                            accentColor: "from-blue-600 to-slate-900",
                                                            content: [
                                                                { label: "Identidad", text: h.title, highlight: true },
                                                                { label: "Esencia", text: h.essence },
                                                                { label: "Manifestación", text: h.manifestation },
                                                                { label: "El Desafío", text: h.challenge },
                                                                { label: "Punto Ciego", text: h.shadow }
                                                            ],
                                                            footer: "Sincronía Espacial"
                                                        });
                                                    }}
                                                    className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex flex-col items-center text-center group/card hover:bg-blue-500/10 hover:border-blue-500/40 transition-all active:scale-95"
                                                >
                                                    <Building2 size={18} className="text-blue-400 mb-1.5" />
                                                    <span className="text-[9px] uppercase tracking-tighter text-blue-300/50 font-bold mb-1">Escenario</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white leading-tight">Casa {body.house}</span>
                                                        <span className="text-[8px] text-blue-200/40 mt-1 leading-tight uppercase font-medium">{HOUSE_DESCRIPTIONS[body.house]?.split(',')[0]}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* INTERPRETACIÓN PROFUNDA (PREMIUM FEATURE) */}
                                            <div
                                                className={`mt-2 p-3 bg-gradient-to-br from-purple-900/60 to-slate-900/80 rounded-xl border border-purple-500/20 shadow-lg ${isPremium ? 'cursor-pointer hover:border-purple-400 transition-all active:scale-[0.98]' : 'opacity-80'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isPremium) {
                                                        alert('🔒 Función Premium\n\nDesbloquea el análisis del Teatro de la Vida con el plan Creador o Admin.');
                                                    } else {
                                                        setShowDeepInsight(showDeepInsight === body.key ? null : body.key);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center gap-2 text-amber-400 mb-1">
                                                    <Zap className={`w-3.5 h-3.5 ${isPremium ? 'animate-pulse' : 'text-gray-500'}`} />
                                                    <span className="text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">Interpretación Profunda</span>
                                                    {isPremium && (
                                                        <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-500 ${showDeepInsight === body.key ? 'rotate-90' : ''}`} />
                                                    )}
                                                </div>
                                                <p className="text-[9px] text-white/40 font-medium">{isPremium ? 'Toca para descubrir el diálogo entre tus personajes internos.' : 'Desbloquea la síntesis evolutiva de tu alma.'}</p>

                                                <AnimatePresence>
                                                    {isPremium && showDeepInsight === body.key && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="mt-4 pt-4 border-t border-purple-500/30 overflow-hidden"
                                                        >
                                                            {generateDeepInsight(body.key, body.signName, body.house)}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* EDUCATIONAL MANUAL MODAL */}
            <EducationalManual isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} />

            {/* TRIAD DETAIL MODAL */}
            <DetailCardModal
                isOpen={!!selectedDetail}
                onClose={() => setSelectedDetail(null)}
                data={selectedDetail}
            />
        </div>
    );
}

// Named export for compatibility
export { AstrologyView as default };