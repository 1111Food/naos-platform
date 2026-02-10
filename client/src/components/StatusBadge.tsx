import React from 'react';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
    plan: 'FREE' | 'PREMIUM' | 'EXTENDED';
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ plan, className = "" }) => {
    if (plan === 'PREMIUM' || plan === 'EXTENDED') {
        return (
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] animate-in fade-in zoom-in duration-500 ${className}`}>
                <div className="relative">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-amber-300 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    NAOS {plan}
                </span>
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 ${className}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                NAOS INICIADO
            </span>
        </div>
    );
};
