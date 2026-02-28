// client/src/components/NatalChartWheel.tsx
// 🌌 FUTURISMO MÍSTICO - Motor del Alma
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- PALETA MÍSTICA ---
const ZODIAC_SIGNS = [
    { symbol: '♈', name: 'Aries', color: '#ff6b9d' },       // Rosa espacial
    { symbol: '♉', name: 'Tauro', color: '#4ecdc4' },       // Cian
    { symbol: '♊', name: 'Géminis', color: '#ffe66d' },     // Ámbar
    { symbol: '♋', name: 'Cáncer', color: '#a8dadc' },      // Azul pálido
    { symbol: '♌', name: 'Leo', color: '#f4a261' },         // Dorado pálido
    { symbol: '♍', name: 'Virgo', color: '#95e1d3' },       // Verde agua
    { symbol: '♎', name: 'Libra', color: '#f38181' },       // Rosa coral
    { symbol: '♏', name: 'Escorpio', color: '#aa4465' },    // Magenta oscuro
    { symbol: '♐', name: 'Sagitario', color: '#9d84b7' },   // Violeta
    { symbol: '♑', name: 'Capricornio', color: '#c5c6c7' }, // Plata
    { symbol: '♒', name: 'Acuario', color: '#66d9ef' },     // Cian brillante
    { symbol: '♓', name: 'Piscis', color: '#b4a7d6' }       // Lavanda
];

interface PlanetPos {
    name: string;
    absDegree: number;
    house: number;
    retrograde?: boolean;
}

interface HouseCusp {
    house: number;
    absDegree: number;
}

interface NatalChartWheelProps {
    planets: PlanetPos[];
    houses: HouseCusp[];
    ascendant?: number;
    size?: number;
    suppressZoom?: boolean;
}

export const NatalChartWheel: React.FC<NatalChartWheelProps> = ({
    planets,
    houses,
    ascendant = 0,
    size = 500,
    suppressZoom = false
}) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const center = size / 2;
    const radius = size / 2 - 30;

    // 🌀 ANILLOS CONCÉNTRICOS (Múltiples capas - Estratificación Radial)
    const outerRing = radius;               // 1.00r (Borde místico)
    const zodiacOrbital = radius * 0.96;    // 0.96r (Capa Signos)
    const ticksOrbital = radius * 0.86;     // 0.86r (Capa Ticks)
    const housesOrbital = radius * 0.76;    // 0.76r (Capa Casas)
    const planetRing = radius * 0.55;       // 0.55r (Capa Planetas)
    const coreRing = radius * 0.15;         // 0.15r (Núcleo)

    const getPos = (deg: number, r: number) => {
        // 📐 ESTÁNDAR ASTROLÓGICO: Los grados aumentan en sentido ANTI-HORARIO.
        // SVG aumenta en sentido HORARIO. Invertimos la resta para sincronizar.
        // Anclamos 'ascendant' a 180° (izquierda horizontal).
        const rad = (180 - (deg - ascendant)) * (Math.PI / 180);
        return {
            x: center + r * Math.cos(rad),
            y: center + r * Math.sin(rad)
        };
    };

    const zodiacSectors = useMemo(() => {
        return ZODIAC_SIGNS.map((sign, i) => {
            const startAngle = i * 30;
            const textPos = getPos(startAngle + 15, zodiacOrbital);
            return { startAngle, sign, textPos };
        });
    }, [center, zodiacOrbital, ascendant]);

    return (
        <div className="relative flex items-center justify-center select-none">
            {/* 🌌 POLVO DE ESTRELLAS (Fondo) */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.3,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={`relative z-10 ${(!isZoomed && !suppressZoom) ? 'cursor-zoom-in' : 'cursor-default'}`}
                style={{
                    filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))'
                }}
                onClick={() => !isZoomed && !suppressZoom && setIsZoomed(true)}
            >
                {/* 🎨 DEFINICIONES */}
                <defs>
                    {/* Gradiente Radial Profundo */}
                    <radialGradient id="deepSpace" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#1a1a2e" stopOpacity="1" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                    </radialGradient>

                    {/* Gradiente Violeta Místico */}
                    <radialGradient id="mysticGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>

                    {/* Gradiente Dorado */}
                    <radialGradient id="goldenCore" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>

                    {/* Filtro de Glow */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Filtro de Glow Fuerte */}
                    <filter id="strongGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 🌑 FONDO CENTRAL */}
                <circle cx={center} cy={center} r={outerRing} fill="url(#deepSpace)" />


                {/* GRUPO ROTADO (Ahora con posicionamiento anclado manualmente) */}
                <g id="astral-rotatable-group">

                    {/* 🔮 ANILLOS CONCÉNTRICOS DECORATIVOS (Alineados a nuevas órbitas) */}
                    <circle
                        cx={center} cy={center} r={outerRing}
                        fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.2"
                    />
                    <circle
                        cx={center} cy={center} r={ticksOrbital}
                        fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.2"
                    />
                    <circle
                        cx={center} cy={center} r={housesOrbital}
                        fill="none" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.1"
                    />

                    {/* (Old degree ticks removed from here for visibility layering) */}


                    {/* 🌀 ANILLO ANIMADO (Rotación lenta) */}
                    <circle
                        cx={center} cy={center} r={coreRing}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        strokeDasharray="3 6"
                        filter="url(#glow)"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${center} ${center}`}
                            to={`360 ${center} ${center}`}
                            dur="60s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* ♈ SECTORES ZODIACALES */}
                    {zodiacSectors.map((sector, i) => (
                        <g key={i}>
                            {/* Divisor de Sector (Signos) */}
                            <line
                                x1={getPos(sector.startAngle, outerRing).x}
                                y1={getPos(sector.startAngle, outerRing).y}
                                x2={getPos(sector.startAngle, ticksOrbital).x}
                                y2={getPos(sector.startAngle, ticksOrbital).y}
                                stroke="#ffffff"
                                strokeOpacity="0.1"
                                strokeWidth="0.5"
                            />

                            {/* Símbolos del Zodiaco con Glow - Ahora anclados a la rotación maestra */}
                            <text
                                x={sector.textPos.x}
                                y={sector.textPos.y}
                                fill={sector.sign.color}
                                fontSize="18"
                                fontWeight="600"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                filter="url(#glow)"
                            >
                                {sector.sign.symbol}
                            </text>
                        </g>
                    ))}

                    {/* --- CAPA DE GRADOS (TICKS) - SINCRONIZADA --- */}
                    <g id="degree-ticks-layer">
                        {Array.from({ length: 360 }).map((_, i) => {
                            const isMajor = i % 10 === 0;
                            const isMid = i % 5 === 0;

                            const lengthFactor = isMajor ? 0.04 : (isMid ? 0.025 : 0.015);
                            const rIn = ticksOrbital - (radius * lengthFactor);
                            const posIn = getPos(i, rIn);
                            const posOut = getPos(i, ticksOrbital);

                            return (
                                <line
                                    key={`tick-forced-${i}`}
                                    x1={posIn.x}
                                    y1={posIn.y}
                                    x2={posOut.x}
                                    y2={posOut.y}
                                    stroke={isMajor ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.2)"}
                                    strokeWidth={isMajor ? 1.5 : 0.5}
                                />
                            );
                        })}
                    </g>

                    {/* 🏠 LÍNEAS DIVISORIAS DE CASAS (VERDES - ESTÉTIQUE) */}
                    <g id="house-lines">
                        {houses
                            .filter(house => house && typeof house.absDegree === 'number' && !isNaN(house.absDegree))
                            .map((house, i) => {
                                const isAngular = i % 3 === 0; // AC, IC, DC, MC

                                return (
                                    <line
                                        key={`house-line-${i}`}
                                        // Empieza después de la espiral central
                                        x1={getPos(house.absDegree, radius * 0.20).x}
                                        y1={getPos(house.absDegree, radius * 0.20).y}
                                        // Termina antes del borde final (Penúltimo círculo)
                                        x2={getPos(house.absDegree, radius * 0.92).x}
                                        y2={getPos(house.absDegree, radius * 0.92).y}
                                        stroke="#34d399" // Verde Esmeralda Neón
                                        strokeWidth={isAngular ? "1.5" : "1"}
                                        strokeOpacity={isAngular ? "0.6" : "0.3"}
                                    />
                                );
                            })}
                    </g>

                    {/* 🪐 PLANETAS */}
                    {planets.map((planet, i) => {
                        const planetRadius = planetRing + (i % 3 === 0 ? 15 : i % 3 === 1 ? 0 : -15);
                        const pos = getPos(planet.absDegree, planetRadius);
                        const planetColor = getPlanetColor(planet.name);

                        return (
                            <g key={i}>
                                {/* Línea de Proyección Técnica (Hasta penúltimo círculo) */}
                                <line
                                    x1={pos.x}
                                    y1={pos.y}
                                    x2={getPos(planet.absDegree, outerRing).x}
                                    y2={getPos(planet.absDegree, outerRing).y}
                                    stroke="#10b981"
                                    strokeOpacity="0.3"
                                    strokeWidth="1"
                                />
                                {/* Línea al centro (sutil) */}
                                <line
                                    x1={getPos(planet.absDegree, coreRing).x}
                                    y1={getPos(planet.absDegree, coreRing).y}
                                    x2={pos.x}
                                    y2={pos.y}
                                    stroke="#10b981"
                                    strokeOpacity="0.2"
                                    strokeWidth="1"
                                />

                                {/* Círculo del planeta */}
                                <circle
                                    cx={pos.x} cy={pos.y}
                                    r="8"
                                    fill="#0a0a0a"
                                    stroke={planetColor}
                                    strokeWidth="2"
                                    filter="url(#glow)"
                                />

                                {/* Símbolo del planeta */}
                                <text
                                    x={pos.x} y={pos.y}
                                    fill="#fef3c7"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    filter="url(#strongGlow)"
                                >
                                    {getPlanetSymbol(planet.name)}
                                </text>

                                {/* Indicador Rx */}
                                {planet.retrograde && (
                                    <text
                                        x={pos.x + 10} y={pos.y - 10}
                                        fill="#ff6b9d"
                                        fontSize="7"
                                        fontWeight="bold"
                                    >
                                        Rx
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {(() => {
                        const pos = getPos(ascendant, planetRing);
                        return (
                            <g>
                                {/* Línea de Proyección del AC (Hasta el borde exterior) */}
                                <line
                                    x1={pos.x}
                                    y1={pos.y}
                                    x2={getPos(ascendant, outerRing).x}
                                    y2={getPos(ascendant, outerRing).y}
                                    stroke="#10b981"
                                    strokeOpacity="0.3"
                                    strokeWidth="1"
                                />
                                {/* Línea del centro al AC (Instrumental) */}
                                <line
                                    x1={getPos(ascendant, coreRing).x}
                                    y1={getPos(ascendant, coreRing).y}
                                    x2={pos.x}
                                    y2={pos.y}
                                    stroke="#10b981"
                                    strokeOpacity="0.3"
                                    strokeWidth="1"
                                />

                                {/* Círculo del Ascendente (Integrado como un planeta) */}
                                <circle
                                    cx={pos.x} cy={pos.y}
                                    r="8"
                                    fill="#0a0a0a"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    filter="url(#glow)"
                                />

                                <text
                                    x={pos.x} y={pos.y}
                                    fill="#10b981"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    filter="url(#strongGlow)"
                                    letterSpacing="0.05em"
                                >
                                    AC
                                </text>
                            </g>
                        );
                    })()}
                </g>

                {/* 🕉️ MANDALA CENTRAL (No rotado) */}
                <g>
                    {/* Glow de fondo */}
                    <circle cx={center} cy={center} r={coreRing * 2} fill="url(#mysticGlow)" />
                    <circle cx={center} cy={center} r={coreRing * 1.2} fill="url(#goldenCore)" />

                    {/* 🌀 ESPIRAL HOLOGRÁFICA - Núcleo del Alma */}
                    <image
                        href="/spiral.png"
                        x={center - 40}
                        y={center - 40}
                        width="80"
                        height="80"
                        opacity="0.8"
                        style={{ mixBlendMode: 'screen' }}
                        filter="url(#glow)"
                    />
                </g>

                {/* --- CAPA DE NÚMEROS DE CASAS (ASTRONOMICAL ALIGNMENT - RENDER LAST) --- */}
                <g id="house-numbers-layer">
                    {houses.map((house, i) => {
                        const houseNum = i + 1;
                        if (!house || isNaN(house.absDegree)) return null;

                        const startDeg = house.absDegree;
                        const nextHouse = houses[(i + 1) % 12];
                        let endDeg = nextHouse?.absDegree ?? (startDeg + 30);

                        // Diferencia angular real para el punto medio
                        let diff = endDeg - startDeg;
                        if (diff < 0) diff += 360;
                        const midDeg = (startDeg + diff / 2) % 360;

                        // Posicionamiento en el eje de rotación global (Capa 0.76r)
                        const { x, y } = getPos(midDeg, housesOrbital);

                        return (
                            <g key={`house-orb-final-${houseNum}`}>
                                <circle
                                    cx={x} cy={y}
                                    r={isZoomed ? 14 : 9}
                                    fill="#0f172a"
                                    stroke="rgba(168, 85, 247, 0.4)"
                                    strokeWidth="1"
                                    filter="url(#glow)"
                                />
                                <text
                                    x={x} y={y}
                                    fill="#fbbf24"
                                    fontSize={isZoomed ? "16" : "10"}
                                    fontWeight="700"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {houseNum}
                                </text>
                            </g>
                        );
                    })}
                </g>

            </motion.svg>

            {/* 🔍 MODAL DE ZOOM (Lightbox) */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
                        onClick={() => setIsZoomed(false)}
                    >
                        {/* Botón de Cierre */}
                        <button
                            className="absolute top-6 right-6 p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-full border border-purple-500/30 transition-colors z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(false);
                            }}
                        >
                            <X size={32} className="text-white" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, rotate: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <NatalChartWheel
                                planets={planets}
                                houses={houses}
                                ascendant={ascendant}
                                size={Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9)}
                                suppressZoom={true}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

// 🎨 COLORES PLANETARIOS (Espaciales)
function getPlanetColor(name: string): string {
    const colors: any = {
        Sun: '#fbbf24',      // Dorado
        Moon: '#e0e7ff',     // Plata lunar
        Mercury: '#66d9ef',  // Cian
        Venus: '#ff6b9d',    // Rosa espacial
        Mars: '#ff4d4d',     // Rojo neón
        Jupiter: '#f59e0b',  // Ámbar
        Saturn: '#c5c6c7',   // Plata
        Uranus: '#4ecdc4',   // Turquesa
        Neptune: '#9d84b7',  // Violeta
        Pluto: '#aa4465',    // Magenta oscuro
        Ascendant: '#fbbf24' // Dorado
    };
    return colors[name] || '#a8dadc';
}

// ✨ SÍMBOLOS PLANETARIOS
function getPlanetSymbol(name: string): string {
    // Normalizar nombre (capitalizar primera letra, resto minúsculas)
    const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const symbols: Record<string, string> = {
        'Sun': '☉',
        'Sol': '☉',
        'Moon': '☽',
        'Luna': '☽',
        'Mercury': '☿',
        'Mercurio': '☿',
        'Venus': '♀',
        'Mars': '♂',
        'Marte': '♂',
        'Jupiter': '♃',
        'Júpiter': '♃',
        'Saturn': '♄',
        'Saturno': '♄',
        'Uranus': '♅',
        'Urano': '♅',
        'Neptune': '♆',
        'Neptuno': '♆',
        'Pluto': '♇',
        'Plutón': '♇'
    };

    const symbol = symbols[normalizedName] || symbols[name];

    // Debug: mostrar en consola si no se encuentra el símbolo
    if (!symbol) {
        console.warn(`⚠️ No se encontró símbolo para planeta: "${name}" (normalizado: "${normalizedName}")`);
    }

    return symbol || name.substring(0, 2);
}
