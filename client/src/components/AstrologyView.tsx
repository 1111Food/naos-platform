
// client/src/components/AstrologyView.tsx
import React, { useState, useMemo } from 'react';
import { useActiveProfile } from '../hooks/useActiveProfile';
import { useSubscription } from '../hooks/useSubscription';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, AlertCircle, ChevronRight, X, Star, User, Clock, MapPin } from 'lucide-react';
import { NatalChartWheel } from './NatalChartWheel';
import { PLANETS_LIB, SIGNS_LIB, HOUSES_LIB } from '../data/astrologyLibrary';

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

export function AstrologyView() {
    // --- UNIFIED STATE (v9.16) ---
    const { profile, loading } = useActiveProfile();
    const { status: subscription } = useSubscription();
    const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
    const [showDeepInsight, setShowDeepInsight] = useState<string | null>(null); // Track which planet's deep insight is shown

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
            signName: p.name === 'Ascendant' ? 'Ascendant' : p.sign, // Guardamos nombre inglés del signo para lookups
            signDisplay: SIGNS_LIB[p.sign]?.name || p.sign, // Nombre español para UI
            house: p.house,
            absDegree: p.absDegree, // ✅ CORREGIDO: backend envía absDegree, no absPos
            retro: p.retro,
            isAscendant: false
        }));

        const housesList = activeData.houses.map((h: number, i: number) => ({
            house: i + 1,
            absDegree: h
        }));

        // Add Ascendant to display list (backend doesn't include it in planets array)
        const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const ascendantSignName = signNames[Math.floor(ascendant / 30)];
        const ascendantEntry = {
            name: 'Ascendente',
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

    // Si no hay datos, mostrar estado vacío amigable
    if (!chartData) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center space-y-4">
                <Star className="w-16 h-16 text-amber-500/50" />
                <h3 className="text-2xl font-light text-amber-100">Carta Astral de {displayName}</h3>
                <p className="text-white/60 max-w-md">
                    Los datos astronómicos aún no se han alineado. Asegúrate de haber ingresado tu fecha de nacimiento completa en el registro.
                </p>
            </div>
        );
    }

    // --- DEEP INSIGHT GENERATOR (PLACEHOLDER CONTENT) ---
    const generateDeepInsight = (planetName: string, signName: string, house: number) => {
        const insights = {
            'Sun': `En la profundidad de este tránsito solar, el arquetipo del Rey Interior se fusiona con la esencia elemental de ${signName}, revelando un camino de autorrealización que trasciende lo mundano. Esta posición en Casa ${house} sugiere que tu propósito vital se manifiesta a través de ${house === 1 ? 'la expresión personal directa' : house === 10 ? 'el logro profesional y el reconocimiento público' : 'las experiencias cotidianas'}. Los desafíos kármicos asociados invitan a equilibrar el ego con la humildad, mientras que las oportunidades evolutivas apuntan hacia el desarrollo de una identidad auténtica que inspire a otros. Consejo práctico: Medita sobre qué aspectos de tu personalidad brillan naturalmente y cuáles requieren cultivo consciente.`,
            'Moon': `La Luna en ${signName} revela las profundidades emocionales de tu ser, un océano interior que responde a las mareas cósmicas con sensibilidad única. En Casa ${house}, tus necesidades emocionales se satisfacen a través de ${house === 4 ? 'la seguridad del hogar y las raíces familiares' : house === 7 ? 'las relaciones íntimas y el reflejo en el otro' : 'experiencias específicas de esta área vital'}. El desafío kármico reside en no dejarse arrastrar por las corrientes emocionales, sino aprender a navegar con sabiduría. La oportunidad evolutiva es desarrollar inteligencia emocional que te permita nutrir tanto a ti mismo como a quienes amas. Consejo: Lleva un diario lunar para rastrear tus ciclos emocionales y descubrir patrones ocultos.`,
            'Ascendente': `El Ascendente en ${signName} es la máscara sagrada que presentas al mundo, el umbral entre tu ser interior y la realidad externa. Esta posición define cómo inicias nuevos ciclos y cómo los demás perciben tu energía al primer encuentro. El arquetipo de ${signName} colorea tu enfoque vital con ${signName === 'Aries' ? 'valentía pionera' : signName === 'Virgo' ? 'precisión analítica' : 'cualidades únicas'}. Tu desafío kármico es no identificarte completamente con esta máscara, sino usarla conscientemente como herramienta de manifestación. La oportunidad evolutiva radica en integrar esta energía ascendente con tu Sol y Luna para crear una personalidad coherente y poderosa. Consejo: Observa cómo cambias tu comportamiento en diferentes contextos sociales.`,
            'default': `El arquetipo de ${planetName} en ${signName} crea una sinfonía cósmica única en tu carta natal. Esta posición en Casa ${house} indica que esta energía planetaria se expresa principalmente a través de ${house <= 4 ? 'asuntos personales y privados' : house <= 8 ? 'relaciones y recursos compartidos' : 'expansión social y espiritual'}. Los retos kármicos asociados te invitan a dominar las lecciones específicas de ${planetName}, transformando sus expresiones más densas en manifestaciones elevadas. Las oportunidades evolutivas incluyen desarrollar maestría en el uso consciente de esta energía para co-crear tu realidad. Consejo práctico: Estudia los ciclos de ${planetName} y cómo se correlacionan con eventos significativos en tu vida.`
        };

        return insights[planetName as keyof typeof insights] || insights['default'];
    };

    // Helper para formatear fecha (si se usara)
    // const formatDate = (dateStr?: string) => ...

    // Check Premium status (more permissive for testing)
    const isPremium = subscription?.tier === 'PREMIUM' ||
        subscription?.tier === 'EXTENDED' ||
        subscription?.tier === 'admin' ||
        subscription === 'PREMIUM' ||
        subscription === 'EXTENDED' ||
        subscription === 'admin' ||
        true; // TEMPORARY: Always allow for testing

    console.log('🔍 Subscription Debug:', { subscription, isPremium });

    return (
        <div className="flex flex-col lg:flex-row h-full w-full gap-6 animate-in fade-in duration-700">

            {/* LEFT COLUMN: GRAPHIC & SUMMARY */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">

                {/* Header Profile */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div>
                        <h2 className="text-xl font-light text-white tracking-widest uppercase">Carta Natal</h2>
                        <p className="text-amber-500/80 text-sm font-medium">{displayName}</p>
                    </div>
                </div>

                {/* Main Wheel */}
                <div className="relative aspect-square w-full max-w-md mx-auto bg-black/40 rounded-full shadow-[0_0_50px_rgba(120,50,255,0.1)] border border-white/5 p-4">
                    {/* Pass loaded data to SVG wheel */}
                    <NatalChartWheel
                        planets={chartData.bodies}
                        houses={chartData.houses}
                        ascendant={chartData.ascendant}
                    />

                    {/* Center Info Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center opacity-50">
                            <span className="text-xs uppercase tracking-widest text-white/30">NAOS</span>
                        </div>
                    </div>
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
            <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full overflow-hidden">
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2">Posiciones Planetarias</h3>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {displayList.map((body: any, idx: number) => {
                        const isAsc = body.name === 'Ascendant';
                        const signInfo = SIGNS_LIB[body.signName] || {};

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => {
                                    if (selectedPlanet && selectedPlanet.name === body.name) {
                                        setSelectedPlanet(null); // Si ya es el mismo, ciérralo
                                    } else {
                                        setSelectedPlanet(body); // Si es otro, ábrelo
                                    }
                                }}
                                className={`
                                    group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                                    ${selectedPlanet?.name === body.name
                                        ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                                `}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner
                                            ${selectedPlanet?.name === body.name ? 'bg-purple-500 text-white' : 'bg-black/30 text-white/70'}
                                        `}>
                                            {PLANETS_LIB[body.name]?.symbol || (isAsc ? 'Asc' : '•')}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium flex items-center gap-2">
                                                {body.name}
                                                {body.retro && <span className="text-[10px] bg-red-500/20 text-red-400 px-1 rounded">Rx</span>}
                                            </h4>
                                            <p className="text-sm text-white/50">
                                                en <span className="text-amber-400">{body.signDisplay}</span>
                                                {!isAsc && ` • Casa ${body.house}`}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedPlanet?.name === body.name ? 'rotate-90 text-purple-400' : 'text-white/20'}`} />
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {selectedPlanet?.name === body.name && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70 bg-black/20 -mx-4 -mb-4 px-4 pb-4"
                                        >
                                            <p className="italic mb-2 text-purple-200">
                                                "{signInfo.style_paragraph || 'Una energía única que influye en tu destino.'}"
                                            </p>

                                            {/* INTERPRETACIÓN PROFUNDA (PREMIUM FEATURE) */}
                                            <div
                                                className={`mt-3 p-3 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded border border-white/10 ${isPremium ? 'cursor-pointer hover:border-purple-500/50 transition-all' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent closing parent panel
                                                    if (!isPremium) {
                                                        alert('🔒 Función Premium\n\nDesbloquea interpretaciones profundas con el plan Creador o Admin.');
                                                    } else {
                                                        // Toggle deep insight
                                                        setShowDeepInsight(showDeepInsight === body.name ? null : body.name);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center gap-2 text-amber-400 mb-1">
                                                    <Lock className="w-3 h-3" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Interpretación Profunda</span>
                                                    {isPremium && (
                                                        <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${showDeepInsight === body.name ? 'rotate-90' : ''}`} />
                                                    )}
                                                </div>
                                                {!isPremium ? (
                                                    <p className="text-[10px] text-white/50 mb-2">Desbloquea el análisis detallado de Liz Greene.</p>
                                                ) : (
                                                    <p className="text-[10px] text-white/50 mb-2">Haz clic para {showDeepInsight === body.name ? 'ocultar' : 'revelar'} el análisis profundo.</p>
                                                )}

                                                {/* DEEP INSIGHT CONTENT (EXPANDABLE) */}
                                                <AnimatePresence>
                                                    {isPremium && showDeepInsight === body.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="mt-3 pt-3 border-t border-purple-500/30 overflow-hidden"
                                                        >
                                                            <p className="text-xs text-purple-100/90 leading-relaxed">
                                                                {generateDeepInsight(body.name, body.signDisplay, body.house)}
                                                            </p>
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

            {/* ERROR BOUNDARY MODAL (SI EXISTIERA ERROR LOCAL) */}
            {/* ... */}
        </div>
    );
}

// Named export for compatibility
export { AstrologyView as default };