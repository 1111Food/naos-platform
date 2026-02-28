import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface HexagonToggleProps {
    checked: boolean;
    onClick: () => void;
    color: string;
}

export const HexagonToggle: React.FC<HexagonToggleProps> = ({ checked, onClick, color }) => {
    const colorMap: Record<string, string> = {
        emerald: "text-emerald-500",
        orange: "text-orange-500",
        indigo: "text-indigo-500",
        violet: "text-violet-500",
        rose: "text-rose-500",
        cyan: "text-cyan-500"
    };

    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={cn(
                "relative flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer group",
                checked ? "scale-100" : "scale-100 opacity-80 hover:opacity-100 hover:scale-110"
            )}
        >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                <path
                    d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                    fill="currentColor"
                    fillOpacity={checked ? 1 : 0}
                    stroke="currentColor"
                    strokeWidth={checked ? 0 : 2}
                    className={cn(
                        "transition-all duration-300 ease-out",
                        checked ? colorMap[color] : "text-zinc-700 group-hover:text-zinc-500"
                    )}
                />
            </svg>
            {checked && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10"
                >
                    <div className="w-1.5 h-1.5 bg-black rounded-full shadow-white" />
                </motion.div>
            )}
        </div>
    );
};
