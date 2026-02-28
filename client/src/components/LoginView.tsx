import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';

interface LoginViewProps {
    onCancel?: () => void;
    onSuccess?: (view: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onCancel, onSuccess }) => {
    // const [name, setName] = useState(''); // Removed
    const [loading, setLoading] = useState(false);
    const { signInAnonymously } = useAuth();
    const { refreshProfile } = useProfile(); // Get refetcher

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            // 1. Iniciar sesión anónima en Supabase
            console.log("🚀 LoginView: Iniciando portal anónimo...");
            const { data, error } = await signInAnonymously();

            // Manejo específico de error
            if (error) {
                if (error.message.includes("Anonymous sign-ins disabled")) {
                    alert("⚠️ ERROR CRÍTICO: 'Anonymous sign-ins' desactivados.");
                } else {
                    console.error("Error login anónimo:", error);
                    alert("Error conectando con el Templo: " + error.message);
                }
                setLoading(false);
                return;
            }

            const user = data?.user;
            if (user) {
                console.log("🚀 LoginView: Portal abierto. Verificando identidad...");

                // Force a fresh fetch to be sure
                const freshProfile = await refreshProfile();

                if (freshProfile && freshProfile.birthDate) {
                    console.log("🔮 LoginView: Identidad confirmada. Entrando al Templo.");
                    if (onSuccess) onSuccess('TEMPLE');
                } else {
                    console.log("🌑 LoginView: Sin identidad. Redirigiendo a Onboarding.");
                    if (onSuccess) onSuccess('ONBOARDING');
                }
            }
        } catch (err: any) {
            console.error('Error fatal en el portal de acceso:', err);
            alert(`Hubo un problema inseperado al abrir el portal: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto space-y-12 bg-[#0a0a1f]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative"
        >
            {onCancel && (
                <button
                    onClick={onCancel}
                    className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                    <X size={20} />
                </button>
            )}

            <div className="text-center space-y-4">
                <Sparkles className="mx-auto text-amber-300/40 w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">
                    DECLARA TU ESENCIA
                </h1>
                <p className="text-violet-200/40 text-[10px] uppercase tracking-[0.4em] font-light italic">
                    Escribe tu nombre para entrar al Templo.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
                {/* Name Input Removed - Identity is claimed in Onboarding */}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 text-white font-bold uppercase tracking-[0.5em] text-[11px] shadow-[0_10px_40px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_60px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:pointer-events-none"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                    {loading ? "ABRIENDO PORTAL..." : "INGRESAR AL TEMPLO"}
                </motion.button>
            </form>

            <div className="pt-8 text-center">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 italic leading-relaxed">
                    Acceso Instantáneo • Identidad Protegida • Propósito Manifestado
                </p>
            </div>
        </motion.div>
    );
};
