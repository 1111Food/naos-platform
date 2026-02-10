import React, { useState } from 'react';

interface OnboardingFormProps {
    onComplete: (data: any) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        birthDate: '',
        birthTime: '12:00',
        birthCity: '',
        birthState: '', // Kept for backend compatibility but not shown in form
        birthCountry: '',
    });
    const [saveProfile, setSaveProfile] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.birthDate || !formData.birthCity) return;

        // --- PERSISTENCIA FORZADA (v9.14) ---
        // Guardar SIEMPRE en localStorage antes de llamar al backend
        // Esto asegura que los datos estén disponibles incluso si la API falla
        const profileData = { ...formData, isTemp: !saveProfile };

        try {
            localStorage.setItem('user_profile', JSON.stringify(profileData));
            localStorage.setItem('naos_active_profile_id', saveProfile ? 'new-profile' : 'temp');
            console.log("✅ GUARDADO EXITOSO EN 5174 (localStorage):", profileData);
            console.log("   - Nombre:", profileData.name);
            console.log("   - Nickname:", profileData.nickname);
            console.log("   - Fecha:", profileData.birthDate);
            console.log("   - Hora:", profileData.birthTime);
            console.log("   - Lugar:", profileData.birthCity, profileData.birthCountry);
        } catch (err) {
            console.error("❌ Error guardando en localStorage:", err);
        }

        // Ahora sí, llamar al backend (que puede fallar sin romper la app)
        onComplete(profileData);
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

                        {/* Field: Nickname (New) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-amber-500/60 block">APODO / NICKNAME</label>
                            <input
                                type="text"
                                placeholder="¿Cómo te llama el Sigilo?"
                                className="ceremonial-input border-amber-500/20 focus:border-amber-500/50 text-amber-100 placeholder:text-amber-500/20"
                                value={formData.nickname}
                                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
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

                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group cursor-pointer" onClick={() => setSaveProfile(!saveProfile)}>
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${saveProfile ? 'bg-amber-500 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-white/20 bg-transparent'}`}>
                            {saveProfile && <span className="text-black text-xs font-bold">✓</span>}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Guardar mi esencia</p>
                            <p className="text-[9px] text-white/30 uppercase tracking-widest mt-0.5">Recordar este perfil permanentemente en el templo.</p>
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
