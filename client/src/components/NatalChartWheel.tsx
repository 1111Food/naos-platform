// client/src/components/NatalChartWheel.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- CONSTANTES ---
const ZODIAC_SIGNS = [
    { symbol: '♈', name: 'Aries', color: '#ff4d4d' },
    { symbol: '♉', name: 'Tauro', color: '#4da6ff' },
    { symbol: '♊', name: 'Géminis', color: '#ffff4d' },
    { symbol: '♋', name: 'Cáncer', color: '#ff4da6' },
    { symbol: '♌', name: 'Leo', color: '#ffad33' },
    { symbol: '♍', name: 'Virgo', color: '#80ffcc' },
    { symbol: '♎', name: 'Libra', color: '#ff99cc' },
    { symbol: '♏', name: 'Escorpio', color: '#ff3333' },
    { symbol: '♐', name: 'Sagitario', color: '#b366ff' },
    { symbol: '♑', name: 'Capricornio', color: '#bfbfbf' },
    { symbol: '♒', name: 'Acuario', color: '#66ccff' },
    { symbol: '♓', name: 'Piscis', color: '#99ff99' }
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
}

export const NatalChartWheel: React.FC<NatalChartWheelProps> = ({
    planets,
    houses,
    ascendant = 0,
    size = 500
}) => {

    // --- LÓGICA DE DIBUJO ---
    const center = size / 2;
    const radius = size / 2 - 20; // Margen
    const outerRadius = radius;
    const innerRadius = radius * 0.85; // Banda del zodiaco
    const housesRadius = radius * 0.35; // Centro vacío

    // Función auxiliar para convertir grados polar a coordenadas cartesianas
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // CORRECCIÓN VISUAL v9.7:
    // En SVG, 0 grados apunta a la derecha (3 en punto).
    // En Astrología, el Ascendente (Horizonte Este) se dibuja a la Izquierda (9 en punto = 180° visuales).
    // Queremos rotar la rueda de modo que el grado del ASC coincida con la posición 180°.
    // Ecuación: GradoASC + Rotación = 180. 
    // Por tanto: Rotación = 180 - GradoASC.
    const rotationOffset = 180 - ascendant;

    const zodiacSectors = useMemo(() => {
        return ZODIAC_SIGNS.map((sign, i) => {
            const startAngle = i * 30;
            const endAngle = (i + 1) * 30;

            const start = polarToCartesian(center, center, outerRadius, startAngle);
            const end = polarToCartesian(center, center, outerRadius, endAngle);
            const startInner = polarToCartesian(center, center, innerRadius, startAngle);
            const endInner = polarToCartesian(center, center, innerRadius, endAngle);

            // Path for the sector slice
            const path = [
                `M ${start.x} ${start.y}`,
                `A ${outerRadius} ${outerRadius} 0 0 1 ${end.x} ${end.y}`,
                `L ${endInner.x} ${endInner.y}`,
                `A ${innerRadius} ${innerRadius} 0 0 0 ${startInner.x} ${startInner.y}`,
                'Z'
            ].join(' ');

            // Text position (center of sector)
            const textPos = polarToCartesian(center, center, (outerRadius + innerRadius) / 2, startAngle + 15);

            return { path, textPos, sign };
        });
    }, [center, outerRadius, innerRadius]);

    return (
        <div className="relative flex items-center justify-center select-none">
            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
                {/* Definiciones de gradientes */}
                <defs>
                    <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                        <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* GRUPO ROTADO SEGÚN ASCENDENTE */}
                <g transform={`rotate(${rotationOffset}, ${center}, ${center})`}>

                    {/* 1. SECTORES ZODIACALES */}
                    {zodiacSectors.map((sector, i) => (
                        <g key={i}>
                            <path
                                d={sector.path}
                                fill="none"
                                stroke="#ffffff"
                                strokeOpacity="0.1"
                                strokeWidth="1"
                            />
                            {/* Texto del Signo Rotado */}
                            <text
                                x={sector.textPos.x}
                                y={sector.textPos.y}
                                fill={sector.sign.color}
                                fontSize="16"
                                fontWeight="bold"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                transform={`rotate(${-rotationOffset}, ${sector.textPos.x}, ${sector.textPos.y})`}
                                style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}
                            >
                                {sector.sign.symbol}
                            </text>
                        </g>
                    ))}

                    {/* 2. LÍNEAS DE CASAS */}
                    {houses.map((house, i) => {
                        const posStart = polarToCartesian(center, center, innerRadius, house.absDegree);
                        const posEnd = polarToCartesian(center, center, housesRadius, house.absDegree);
                        return (
                            <line
                                key={i}
                                x1={posStart.x} y1={posStart.y}
                                x2={posEnd.x} y2={posEnd.y}
                                stroke="#ffffff"
                                strokeOpacity={i % 3 === 0 ? "0.3" : "0.1"}
                                strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
                            />
                        );
                    })}

                    {/* 3. PLANETAS */}
                    {planets.map((planet, i) => {
                        // Radio variable para evitar superposiciones (simulado)
                        const planetRadius = (innerRadius + housesRadius) / 2 + (i % 2 === 0 ? 10 : -10);
                        const pos = polarToCartesian(center, center, planetRadius, planet.absDegree);

                        return (
                            <g key={i}>
                                <line
                                    x1={center} y1={center}
                                    x2={pos.x} y2={pos.y}
                                    stroke={getPlanetColor(planet.name)}
                                    strokeOpacity="0.1"
                                    strokeWidth="1"
                                />
                                <circle
                                    cx={pos.x} cy={pos.y}
                                    r="10"
                                    fill="#000"
                                    stroke={getPlanetColor(planet.name)}
                                    strokeWidth="1.5"
                                />
                                <text
                                    x={pos.x} y={pos.y}
                                    fill="#fff"
                                    fontSize="10"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    transform={`rotate(${-rotationOffset}, ${pos.x}, ${pos.y})`}
                                >
                                    {planet.name.substring(0, 2)}
                                </text>
                                {planet.retrograde && (
                                    <text
                                        x={pos.x + 8} y={pos.y - 8}
                                        fill="#ff4d4d"
                                        fontSize="8"
                                        fontWeight="bold"
                                        transform={`rotate(${-rotationOffset}, ${pos.x}, ${pos.y})`}
                                    >
                                        Rx
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* 4. MARCADOR ASCENDENTE (Flecha AC) */}
                    {(() => {
                        const ascStart = polarToCartesian(center, center, housesRadius, ascendant);
                        const ascEnd = polarToCartesian(center, center, outerRadius + 15, ascendant);
                        const textPos = polarToCartesian(center, center, outerRadius + 28, ascendant);

                        return (
                            <g>
                                <line
                                    x1={ascStart.x} y1={ascStart.y}
                                    x2={ascEnd.x} y2={ascEnd.y}
                                    stroke="#FFD700"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Flecha indicadora */}
                                <polygon
                                    points={`${ascEnd.x},${ascEnd.y} ${ascEnd.x - 5},${ascEnd.y + 5} ${ascEnd.x - 5},${ascEnd.y - 5}`} // Simplificado, la rotación hará el resto
                                    fill="#FFD700"
                                    transform={`rotate(${ascendant}, ${ascEnd.x}, ${ascEnd.y})`} // Alinear flecha con el eje
                                // Nota: Como todo el grupo ya está rotado, solo necesitamos asegurarnos que la flecha apunte hacia afuera en el ángulo 'ascendant'.
                                />

                                <text
                                    x={textPos.x} y={textPos.y}
                                    fill="#FFD700"
                                    fontSize="14"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${-rotationOffset}, ${textPos.x}, ${textPos.y})`}
                                    style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))' }}
                                >
                                    AC
                                </text>
                            </g>
                        );
                    })()}

                </g> {/* Fin Grupo Rotado */}

                {/* CENTRO (No rotado) */}
                <circle cx={center} cy={center} r={housesRadius} fill="url(#centerGlow)" />
                <text x={center} y={center} fill="#ffffff" fillOpacity="0.8" fontSize="12" letterSpacing="0.2em" textAnchor="middle" dominantBaseline="middle" className="font-serif">
                    NAOS
                </text>

            </motion.svg>
        </div>
    );
};

// Helper colors
function getPlanetColor(name: string): string {
    const colors: any = {
        Sun: '#FFD700', Moon: '#E0E0E0', Mercury: '#ADD8E6', Venus: '#FF69B4',
        Mars: '#FF0000', Jupiter: '#FFA500', Saturn: '#D2B48C', Uranus: '#40E0D0',
        Neptune: '#000080', Pluto: '#800080', Ascendant: '#FFFFFF'
    };
    return colors[name] || '#FFFFFF';
}
