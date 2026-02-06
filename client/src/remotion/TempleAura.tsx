// PADDING TO PROTECT AGAINST CORRUPTION
// PADDING TO PROTECT AGAINST CORRUPTION
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { useMemo } from 'react';

const SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "1", "3", "7", "9", "11", "33"];

const Particle = ({ delay, x, speed, symbol }: { delay: number; x: number; speed: number; symbol: string }) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    const y = interpolate(
        (frame * speed + delay * 100) % (height + 200),
        [0, height + 200],
        [-100, height + 100]
    );

    const opacity = interpolate(
        y,
        [-100, height * 0.2, height * 0.8, height + 100],
        [0, 0.4, 0.4, 0]
    );

    const scale = interpolate(
        y,
        [-100, height],
        [0.8, 1.2]
    );

    const blur = interpolate(
        y,
        [0, height],
        [0, 2]
    );

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: y,
                fontSize: 24,
                color: '#D4AF37',
                opacity,
                transform: `scale(${scale})`,
                filter: `blur(${blur}px)`,
                fontFamily: 'serif',
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
            }}
        >
            {symbol}
        </div>
    );
};

export const TempleAura = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const beat = spring({
        frame: frame % 60,
        fps,
        config: { damping: 10, stiffness: 100 }
    });

    const glowOpacity = interpolate(beat, [0, 1], [0.3, 0.8]);
    const scaleLogo = interpolate(beat, [0, 1], [1, 1.05]);

    const particles = useMemo(() => {
        return new Array(40).fill(0).map((_, i) => ({
            id: i,
            x: random(i) * 100,
            delay: random(i + 10) * 100,
            speed: 1 + random(i * 2) * 2,
            symbol: SYMBOLS[Math.floor(random(i * 3) * SYMBOLS.length)]
        }));
    }, []);

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505' }}>
            <AbsoluteFill
                style={{
                    background: 'linear-gradient(to bottom, #050505, #121212)',
                }}
            />
            <AbsoluteFill style={{ opacity: 0.05, filter: 'contrast(150%) brightness(1000%)' }}>
                <svg width="100%" height="100%">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </AbsoluteFill>

            {particles.map(p => (
                <Particle key={p.id} {...p} />
            ))}

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ transform: `scale(${scaleLogo})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1
                        style={{
                            fontSize: '5rem',
                            fontFamily: 'serif',
                            fontWeight: 'bold',
                            letterSpacing: '0.2em',
                            background: 'linear-gradient(to bottom, #FFF8E7, #D4AF37)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: `drop-shadow(0 0 ${glowOpacity * 20}px rgba(212, 175, 55, 0.5))`
                        }}
                    >
                        NAOS
                    </h1>
                    <p style={{ marginTop: '1rem', color: '#D4AF3799', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.5em', fontWeight: '500' }}>
                        Templo de Luz
                    </p>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
