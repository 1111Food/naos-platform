
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Sparkles, Star, Hash, Flower2, ScrollText, ArrowLeft, Calculator, Users, MapPin, Globe } from 'lucide-react';
import AstrologyView from '../components/AstrologyView';
import { NumerologyView } from '../components/NumerologyView';
import { NawalView } from '../components/NawalView';
import { SabiduriaOriental } from '../components/SabiduriaOriental';

// --- TYPES & INTERFACES ---
type ViewMode = 'MENU' | 'USER_TABS' | 'GUEST_FORM' | 'GUEST_RESULT';
type Tab = 'ASTRO' | 'NUMERO' | 'MAYA' | 'ORIENTAL';

interface EnergyCodeViewProps {
    onBack: () => void;
}

// --- SUBCOMPONENT: MENU DASHBOARD ---
const EnergyCodeMenu = ({ onSelect, onBack }: { onSelect: (mode: 'USER' | 'GUEST') => void, onBack: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4 animate-in fade-in duration-700">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <Sparkles size={24} className="text-purple-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200">
                    Tu Código Energético
                </h1>
                <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                    Explora la arquitectura espiritual de tu ser o calcula las frecuencias de otros viajeros.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
                {/* 1. CARTA ASTRAL */}
                <button
                    onClick={() => onSelect('USER')}
                    className="group relative h-64 rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-6 left-6 text-amber-500">
                        <Star size={32} />
                    </div>
                    <div className="absolute bottom-6 left-6 text-left">
                        <h3 className="text-xl font-serif text-white mb-1">Mi Código</h3>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Carta • Pináculo • Nawal</p>
                    </div>
                </button>

                {/* 2. PINÁCULO (Visual Shortcut - Actions map to same 'USER' mode but maybe pre-select tab? For now simple.) */}
                {/* Let's make the first card "My Energy Code" covering all user tabs, and specifically highlight "Calculadora" separately */}

                <button
                    onClick={() => onSelect('GUEST')}
                    className="group relative h-64 md:col-span-2 lg:col-span-1 rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden hover:border-emerald-500/30 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-6 left-6 text-emerald-500">
                        <Calculator size={32} />
                    </div>
                    <div className="absolute bottom-6 left-6 text-left">
                        <h3 className="text-xl font-serif text-white mb-1">Calculadora</h3>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Laboratorio Temporal</p>
                    </div>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={80} strokeWidth={1} />
                    </div>
                </button>
            </div>

            <button onClick={onBack} className="text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors mt-8">
                Volver al Templo
            </button>
        </div>
    );
};

// --- SUBCOMPONENT: GUEST FORM ---
const COUNTRIES = [
    "Guatemala", "México", "Estados Unidos", "España",
    "Colombia", "Argentina", "Chile", "Perú", "Ecuador", "Venezuela",
    "El Salvador", "Honduras", "Costa Rica", "Panamá",
    "República Dominicana", "Puerto Rico", "Otro"
];

const GuestDataForm = ({ onCalculate, onBack, loading }: { onCalculate: (data: any) => void, onBack: () => void, loading: boolean }) => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        birthTime: '12:00',
        birthCity: '',
        birthCountry: 'Guatemala' // Default
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <div className="w-full max-w-lg mx-auto min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />

                <button onClick={onBack} className="absolute top-6 right-6 text-white/30 hover:text-white">
                    <ArrowLeft size={20} />
                </button>

                <div className="mb-8">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                        <Calculator size={20} />
                    </div>
                    <h2 className="text-2xl font-serif text-white mb-2">Calculadora Energética</h2>
                    <p className="text-white/40 text-sm">Ingresa las coordenadas natales para calcular un código temporal. Los datos no se guardarán.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/30 mb-2 ml-1">Nombre (Referencia)</label>
                        <input
                            required
                            type="text"
                            placeholder="Ej: Invitado"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-serif"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/30 mb-2 ml-1">Fecha</label>
                            <div className="relative">
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-sans text-sm"
                                    value={formData.birthDate}
                                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/30 mb-2 ml-1">Hora</label>
                            <div className="relative">
                                <input
                                    required
                                    type="time"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-sans text-sm"
                                    value={formData.birthTime}
                                    onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/30 mb-2 ml-1">Ciudad</label>
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej: CDMX"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-serif"
                                    value={formData.birthCity}
                                    onChange={e => setFormData({ ...formData, birthCity: e.target.value })}
                                />
                                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/30 mb-2 ml-1">País</label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-serif appearance-none cursor-pointer"
                                    value={formData.birthCountry}
                                    onChange={e => setFormData({ ...formData, birthCountry: e.target.value })}
                                >
                                    <option value="" disabled>Seleccionar</option>
                                    {COUNTRIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                                </select>
                                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? "Calculando..." : "Calcular Frecuencia"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export const EnergyCodeView: React.FC<EnergyCodeViewProps> = ({ onBack }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('MENU');
    const [activeTab, setActiveTab] = useState<Tab>('ASTRO');

    // GUEST STATE
    const [guestProfile, setGuestProfile] = useState<any>(null);
    const [calculating, setCalculating] = useState(false);

    // --- LOGIC: HANDLE NAVIGATION ---
    const handleMenuSelect = (mode: 'USER' | 'GUEST') => {
        if (mode === 'USER') {
            setViewMode('USER_TABS');
            setActiveTab('ASTRO');
        } else {
            setViewMode('GUEST_FORM');
        }
    };

    const handleBack = () => {
        if (viewMode === 'MENU') {
            onBack(); // Back to Temple
        } else if (viewMode === 'USER_TABS') {
            setViewMode('MENU');
        } else if (viewMode === 'GUEST_FORM') {
            setViewMode('MENU');
        } else if (viewMode === 'GUEST_RESULT') {
            // Confirm loss of data? Maybe implied.
            setGuestProfile(null);
            setViewMode('GUEST_FORM'); // Or MENU? Let's go MENU for cleanliness
        }
    };

    // --- LOGIC: CALCULATE GUEST ---
    const calculateGuest = async (data: any) => {
        setCalculating(true);
        try {
            // 2. Call Calculation API (Modifying Astrology Route in Step 3, utilizing it here anticipating)
            const response = await fetch('/api/astrology/natal-chart-temp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    birthDate: data.birthDate,
                    birthTime: data.birthTime,
                    birthCity: data.birthCity,
                    birthCountry: data.birthCountry
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Error de cálculo. Verifica los datos.");
            }

            const resultData = await response.json();

            // 3. Construct Guest Profile Object
            // We merge the backend response (astrology, numerology, mayan, chinese props) into the profile
            const guest: any = {
                id: 'guest-temp-' + Date.now(),
                name: data.name,
                birthDate: data.birthDate,
                birthTime: data.birthTime,
                birthCity: data.birthCity,
                birthCountry: data.birthCountry,
                subscription: { plan: 'PREMIUM', validUntil: '2099-12-31' }, // Hack Premium for Guest
                ...resultData // Spread astrology, numerology, mayan, chinese_animal, etc.
            };

            setGuestProfile(guest);
            setViewMode('GUEST_RESULT');

        } catch (e: any) {
            console.error(e);
            alert(e.message || "Error calculando energía temporal.");
        } finally {
            setCalculating(false);
        }
    };

    // --- TABS CONFIG ---
    const tabs = [
        { id: 'ASTRO', label: 'Carta Astral', icon: Star, color: 'text-amber-400' },
        { id: 'NUMERO', label: 'Pináculo', icon: Hash, color: 'text-blue-400' },
        { id: 'MAYA', label: 'Nawal Maya', icon: Flower2, color: 'text-emerald-400' },
        { id: 'ORIENTAL', label: 'Oriental', icon: ScrollText, color: 'text-rose-400' },
    ];

    // --- RENDER HELPERS ---
    // If in result mode (User or Guest), we show the Tabs UI
    const isResultView = viewMode === 'USER_TABS' || viewMode === 'GUEST_RESULT';
    // If Guest, we pass override
    const activeProfileOverride = viewMode === 'GUEST_RESULT' ? guestProfile : undefined;

    return (
        <div className="w-full min-h-screen pt-4 pb-32">

            {/* 1. MENU MODE */}
            <AnimatePresence>
                {viewMode === 'MENU' && (
                    <EnergyCodeMenu onSelect={handleMenuSelect} onBack={handleBack} />
                )}
            </AnimatePresence>

            {/* 2. FORM MODE */}
            <AnimatePresence>
                {viewMode === 'GUEST_FORM' && (
                    <GuestDataForm onCalculate={calculateGuest} onBack={handleBack} loading={calculating} />
                )}
            </AnimatePresence>

            {/* 3. RESULT VIEW (USER or GUEST) */}
            {isResultView && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header / Nav */}
                    <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 mb-8 pt-4 pb-4">
                        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button onClick={handleBack} className="p-2 text-white/50 hover:text-white transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                                <div>
                                    <h1 className="text-xl font-serif text-white italic flex items-center gap-2">
                                        <Sparkles size={16} className="text-purple-400" />
                                        {viewMode === 'GUEST_RESULT' ? `Código: ${guestProfile?.name}` : 'Tu Código Energético'}
                                    </h1>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                                        {viewMode === 'GUEST_RESULT' ? 'Modo Laboratorio (Temporal)' : 'Mapa de Identidad Espiritual'}
                                    </p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as Tab)}
                                            className={cn(
                                                "relative px-4 py-2 rounded-full flex items-center gap-2 transition-all whitespace-nowrap",
                                                isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                            )}
                                        >
                                            <tab.icon size={14} className={isActive ? tab.color : ""} />
                                            <span className="text-xs uppercase tracking-wider font-medium">{tab.label}</span>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className={cn("absolute inset-0 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]", "bg-gradient-to-r from-transparent via-white/5 to-transparent")}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-6xl mx-auto px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'ASTRO' && (
                                    <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8">
                                        <AstrologyView onBack={handleBack} overrideProfile={activeProfileOverride} />
                                    </div>
                                )}
                                {activeTab === 'NUMERO' && (
                                    <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8">
                                        <NumerologyView overrideProfile={activeProfileOverride} />
                                    </div>
                                )}
                                {activeTab === 'MAYA' && (
                                    <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8">
                                        <NawalView overrideProfile={activeProfileOverride} />
                                    </div>
                                )}
                                {activeTab === 'ORIENTAL' && (
                                    <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8">
                                        <SabiduriaOriental overrideProfile={activeProfileOverride} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
};
