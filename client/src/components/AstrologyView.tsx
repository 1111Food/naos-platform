import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface AstrologyViewProps {
    data: any;
    profile?: any;
    onClose?: () => void;
}

// Zodiac sign symbols
const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// Planet symbols
const planetSymbols: Record<string, string> = {
    'Sol': '☉', 'Sun': '☉',
    'Luna': '☽', 'Moon': '☽',
    'Mercurio': '☿', 'Mercury': '☿',
    'Venus': '♀',
    'Marte': '♂', 'Mars': '♂',
    'Júpiter': '♃', 'Jupiter': '♃',
    'Saturno': '♄', 'Saturn': '♄',
    'Urano': '♅', 'Uranus': '♅',
    'Neptuno': '♆', 'Neptune': '♆',
    'Plutón': '♇', 'Pluto': '♇',
    'Ascendente': 'AC', 'Ascendant': 'AC',
    // Extended Symbols
    'Chiron': '⚷', 'Quirón': '⚷',
    'Lilith': '⚸',
    'North Node': '☊', 'Node': '☊', 'Nodo Norte': '☊',
    'South Node': '☋', 'Nodo Sur': '☋'
};

export const AstrologyView: React.FC<AstrologyViewProps> = ({ data, profile, onClose }) => {
    // Defensive check
    // Defensive check
    if (!data || !data.planets || !data.houses) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] text-white/50 space-y-6 bg-black/40 rounded-[3rem] border border-white/5 backdrop-blur-xl p-12 text-center">
                <div className="relative">
                    <div className="w-16 h-16 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-serif text-white tracking-widest uppercase">
                        {profile?.name ? `Iniciando Ritual para ${profile.name}` : 'Consultando las Estrellas'}
                    </h2>
                    <p className="text-sm border-t border-white/10 pt-4 max-w-xs mx-auto">
                        Calculando posiciones exactas y balance elemental... Esto puede tomar unos segundos.
                    </p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mt-8 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs uppercase tracking-widest"
                    >
                        Volver al Templo
                    </button>
                )}
            </div>
        );
    }


    // Prepare bodies for rendering (Combine planets + rising)
    // Dynamic iteration: We don't assume specific indices.
    // Prepare bodies for rendering (Combine planets + rising)
    // Dynamic iteration: We don't assume specific indices.
    const bodiesToRender = React.useMemo(() => {
        try {
            if (!data || !data.planets) return [];

            const list = [...data.planets];
            if (data.rising) {
                list.push({ ...data.rising, id: 'ASC', color: '#FFFFFF' });
            }

            return list.map((body: any, i: number) => ({
                ...body,
                // Stable ID if possible, else index
                id: body.id || body.name || `BODY_${i}`,
                // Cyclic colors for aesthetics
                color: body.color || ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'][i % 8]
            }));
        } catch (e) {
            console.error("Error processing bodies:", e);
            return [];
        }
    }, [data]);

    return (
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-black/80 to-indigo-950/20 border border-white/10 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] relative backdrop-blur-2xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-4xl font-serif text-white tracking-[0.1em] md:tracking-[0.2em] uppercase">
                        {profile?.name ? `Carta de ${profile.name}` : 'Carta Natal'}
                    </h2>
                    <p className="text-amber-500/60 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] mt-2 font-bold">
                        {profile?.birthDate} • {profile?.birthCity || 'Desconocido'} • {data.houseSystem || 'Placidus'}
                    </p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="absolute top-4 right-4 md:static p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5 text-white/40" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                {/* LEFT: Zodiac Wheel */}
                <div className="flex flex-col items-center space-y-6">
                    <svg viewBox="0 0 600 600" className="w-full max-w-[600px] h-auto">
                        <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                        {zodiacSymbols.map((symbol, i) => {
                            const angle = (i * 30) - 90;
                            const rad = (angle + 15) * Math.PI / 180;
                            const x = 300 + Math.cos(rad) * 265;
                            const y = 300 + Math.sin(rad) * 265;
                            return (
                                <g key={i}>
                                    <line
                                        x1={300 + Math.cos(angle * Math.PI / 180) * 240}
                                        y1={300 + Math.sin(angle * Math.PI / 180) * 240}
                                        x2={300 + Math.cos(angle * Math.PI / 180) * 280}
                                        y2={300 + Math.sin(angle * Math.PI / 180) * 280}
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="1"
                                    />
                                    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.4)" fontSize="20" fontFamily="serif">{symbol}</text>
                                </g>
                            );
                        })}

                        <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                        {data.houses?.map((houseCusp: number, i: number) => {
                            const angle = houseCusp - 90;
                            const rad = angle * Math.PI / 180;
                            return (
                                <line
                                    key={`house-${i}`}
                                    x1={300 + Math.cos(rad) * 100} y1={300 + Math.sin(rad) * 100}
                                    x2={300 + Math.cos(rad) * 220} y2={300 + Math.sin(rad) * 220}
                                    stroke={i === 0 ? "rgba(0,206,209,0.6)" : "rgba(255,255,255,0.15)"}
                                    strokeWidth={i === 0 ? "2" : "1"}
                                />
                            );
                        })}

                        {/* RENDER PLANETS DYNAMICALLY */}
                        {bodiesToRender.map((body: any) => {
                            const angle = body.absDegree - 90;
                            const rad = angle * Math.PI / 180;
                            const x = 300 + Math.cos(rad) * 190;
                            const y = 300 + Math.sin(rad) * 190;
                            return (
                                <g key={body.id}>
                                    <circle cx={x} cy={y} r="4" fill={body.color} stroke="white" strokeWidth="1" />
                                    <text x={x} y={y - 15} textAnchor="middle" fill={body.color} fontSize="16" fontWeight="bold" fontFamily="serif">
                                        {planetSymbols[body.name] || body.name?.[0] || '?'}
                                    </text>
                                </g>
                            );
                        })}

                        <circle cx="300" cy="300" r="80" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <text x="300" y="300" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="serif">NAOS</text>
                    </svg>

                    {/* Elemental Balance - Safe Render */}
                    {data.elements && (
                        <div className="w-full max-w-md space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Balance Elemental</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(data.elements).map(([key, value]: [string, any]) => (
                                    <div key={key} className="space-y-2">
                                        <div className="flex justify-between text-xs text-white/60">
                                            <span className="capitalize">{key}</span>
                                            <span className="font-bold text-white">{value}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-400" style={{ width: `${value}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: List */}
                <div className="bg-black/80 border border-white/20 rounded-3xl p-6 space-y-4 h-[600px] overflow-y-auto shadow-2xl backdrop-blur-xl">
                    <h3 className="text-sm uppercase tracking-[0.4em] text-amber-500 font-bold mb-6 border-b border-white/10 pb-4 sticky top-0 bg-black/95">
                        Posiciones Exactas
                    </h3>
                    {bodiesToRender.map((body: any) => (
                        <div key={body.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold border shrink-0"
                                    style={{ backgroundColor: `${body.color}20`, borderColor: `${body.color}40`, color: body.color }}>
                                    {planetSymbols[body.name] || '?'}
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-white/60 font-bold">{body.name}</div>
                                    <div className="text-sm font-serif text-white">
                                        {body.sign} <span className="text-white/50 ml-2 text-xs">{Math.floor(body.degree)}°</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold">Casa</div>
                                <div className="text-xl font-serif text-white">{body.house}</div>
                            </div>
                        </div>
                    ))}
                    {bodiesToRender.length === 0 && <div className="text-white/50 text-center">No hay datos disponibles.</div>}
                </div>
            </div>
        </div>
    );
};
