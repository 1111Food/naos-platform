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

    // const glowOpacity = interpolate(beat, [0, 1], [0.3, 0.8]); // Removed after logo integration.业务
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
                <div style={{ position: 'absolute', left: '50%', transform: `scale(${scaleLogo}) translate(-50%, -95%)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src="/logo-naos.png?v=2"
                        alt="NAOS"
                        className="naos-logo"
                        style={{
                            width: '280px',
                            maxWidth: '80vw',
                            height: 'auto',
                            margin: '0 auto',
                            filter: `drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))`,
                            opacity: 0.9,
                            display: 'block'
                        }}
                    />
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
