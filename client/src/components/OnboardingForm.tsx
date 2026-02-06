import React, { useState } from 'react';

interface OnboardingFormProps {
    onComplete: (data: any) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        birthTime: '12:00',
        birthCity: '',
        birthState: '', // Kept for backend compatibility but not shown in form
        birthCountry: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.birthDate || !formData.birthCity) return;
        onComplete(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-y-auto py-20 px-4">
            {/* Background Pattern (Diamond/Grid subtle) */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="w-full max-w-lg relative">
                <div className="text-center mb-12">
                    <p className="text-amber-500/60 text-[10px] uppercase tracking-[0.5em] mb-2 font-bold">Registro Ceremonial</p>
                    <div className="h-[1px] w-12 bg-amber-500/20 mx-auto" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 bg-[#0a0a0a]/40 p-12 rounded-[2rem] border border-white/5 backdrop-blur-sm">

                    <div className="space-y-8">
                        {/* Field: Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">NOMBRE COMPLETO</label>
                            <input
                                required
                                type="text"
                                placeholder="Escribe tu nombre verdadero..."
                                className="ceremonial-input"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Field: Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">EMAIL</label>
                            <input
                                required
                                type="email"
                                placeholder="tu@conexion.cosmica"
                                className="ceremonial-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        {/* Row: Date & Time */}
                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">FECHA DE NACIMIENTO</label>
                                <input
                                    required
                                    type="date"
                                    className="ceremonial-input [color-scheme:dark]"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">HORA DE NACIMIENTO</label>
                                <input
                                    required
                                    type="time"
                                    className="ceremonial-input [color-scheme:dark]"
                                    value={formData.birthTime}
                                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Field: Country */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500/60 block">1. PAÍS DE NACIMIENTO</label>
                            <input
                                required
                                type="text"
                                placeholder="Ej: Guatemala, España, México..."
                                className="ceremonial-input border-amber-500/10 focus:border-amber-500/40"
                                value={formData.birthCountry}
                                onChange={(e) => setFormData({ ...formData, birthCountry: e.target.value })}
                            />
                        </div>

                        {/* State field removed for simplification - auto-filled from city geocoding */}

                        {/* Field: City */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500/60 block">2. CIUDAD DE NACIMIENTO</label>
                            <input
                                required
                                type="text"
                                placeholder="Ej: Guatemala City, Cali, Barcelona..."
                                className="ceremonial-input border-amber-500/10 focus:border-amber-500/40"
                                value={formData.birthCity}
                                onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
                            />
                            <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-6 italic text-center leading-relaxed">
                                Sigil trazará las coordenadas exactas de las estrellas en el momento de tu llegada.
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-6 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-500 font-bold text-sm tracking-[0.4em] uppercase hover:bg-amber-500/10 transition-all flex items-center justify-center gap-4 group"
                    >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                        Iniciar Ritual
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
