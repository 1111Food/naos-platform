import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { getNumberImage } from '../utils/numberMapper';

interface NeonNumberProps {
    value: string | number;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'cyan' | 'fuchsia' | 'amber' | 'emerald' | 'rose';
    isFullCard?: boolean;
}

export const NeonNumber: React.FC<NeonNumberProps> = ({
    value,
    className,
    size = 'md',
    color = 'fuchsia',
    isFullCard = false
}) => {
    const [useImage, setUseImage] = React.useState(true);
    const imgUrl = getNumberImage(value);

    const colorMap = {
        cyan: 'text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] shadow-cyan-500/50 bg-cyan-500/20',
        fuchsia: 'text-fuchsia-400 drop-shadow-[0_0_15px_rgba(192,38,211,0.8)] shadow-fuchsia-500/50 bg-fuchsia-500/20',
        amber: 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] shadow-amber-500/50 bg-amber-500/20',
        emerald: 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] shadow-emerald-500/50 bg-emerald-500/20',
        rose: 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] shadow-rose-500/50 bg-rose-500/20',
    };

    const sizeMap = {
        sm: 'text-2xl h-[2rem]',
        md: 'text-4xl h-[4rem]',
        lg: 'text-5xl sm:text-6xl h-[4rem] sm:h-[6rem]',
        xl: 'text-[80px] sm:text-[100px] lg:text-[120px] h-[6rem] sm:h-[8rem] lg:h-[10rem]',
    };

    return (
        <div className={cn("relative flex items-center justify-center font-black tracking-tighter italic", className)}>
            {useImage ? (
                <div className={cn("relative", isFullCard ? "absolute inset-0 w-full h-full" : "flex items-center justify-center")}>
                    <motion.img
                        src={imgUrl}
                        alt={String(value)}
                        initial={false}
                        animate={{
                            scale: isFullCard ? 2.5 : 1
                        }}
                        whileHover={{
                            scale: isFullCard ? 2.6 : 1.1
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={cn(
                            "w-full h-full object-cover object-center",
                            !isFullCard && cn("w-auto object-contain", sizeMap[size].split(' ')[1])
                        )}
                        onError={() => setUseImage(false)}
                    />
                    {/* Shadow/Glow layer behind image */}
                    {!isFullCard && (
                        <div className={cn(
                            "absolute inset-0 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full pointer-events-none",
                            colorMap[color].split(' ').pop()
                        )} />
                    )}
                </div>
            ) : (
                <>
                    {/* Background Glow */}
                    <div className={cn(
                        "absolute blur-[30px] opacity-20 pointer-events-none select-none",
                        sizeMap[size].split(' ')[0],
                        colorMap[color].split(' ')[1] // Extract shadow class
                    )}>
                        {value}
                    </div>

                    {/* Main Number */}
                    <span className={cn(
                        "relative z-10 leading-none select-none",
                        sizeMap[size].split(' ')[0],
                        colorMap[color].split(' ').slice(0, 3).join(' ')
                    )}>
                        {value}
                    </span>

                    {/* Subtle Inner Reflection */}
                    <span className={cn(
                        "absolute z-20 leading-none opacity-40 blur-[1px] select-none translate-x-[1px] -translate-y-[1px]",
                        sizeMap[size].split(' ')[0],
                        "text-white"
                    )}>
                        {value}
                    </span>
                </>
            )}
        </div>
    );
};
