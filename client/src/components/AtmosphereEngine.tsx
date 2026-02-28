import React, { useEffect, useRef } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { useCoherence } from '../hooks/useCoherence';

// Particle definition
interface Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
}

const MODES = {
    consciousness: {
        color: '#3b82f6', // Indigo/Blue
        sizeRange: [4, 12],
        speed: 0.2,
        blur: 8,
        count: 40,
        behavior: 'drift'
    },
    productivity: {
        color: '#22d3ee', // Electric Cyan
        sizeRange: [1, 2],
        speed: 2.5,
        blur: 0,
        count: 80,
        behavior: 'upward'
    },
    fitness: {
        color: '#f59e0b', // Amber
        sizeRange: [3, 8],
        speed: 1.2,
        blur: 4,
        count: 50,
        behavior: 'pulse'
    },
    creativity: {
        color: '#a855f7', // Violet
        sizeRange: [2, 10],
        speed: 1.0,
        blur: 2,
        count: 60,
        behavior: 'chaotic'
    },
    none: {
        color: '#ffffff',
        sizeRange: [1, 3],
        speed: 0.3,
        blur: 0,
        count: 20,
        behavior: 'drift'
    }
};

export const AtmosphereEngine: React.FC = () => {
    const { profile } = useProfile();
    const { score } = useCoherence();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const requestRef = useRef<number>(0);

    const currentIntent = profile?.dominant_intent || 'none';
    const config = MODES[currentIntent as keyof typeof MODES] || MODES.none;

    const densityMultiplier = 1 + (score / 100);
    const targetCount = Math.floor(config.count * densityMultiplier);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const createParticle = (randomPos: boolean = false): Particle => {
            const size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0];
            return {
                x: randomPos ? Math.random() * canvas.width : (Math.random() * 0.2 + 0.4) * canvas.width,
                y: randomPos ? Math.random() * canvas.height : (Math.random() * 0.2 + 0.4) * canvas.height,
                size,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() - 0.5) * config.speed,
                alpha: Math.random() * 0.5 + 0.1
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < targetCount; i++) {
                particlesRef.current.push(createParticle(true));
            }
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (particlesRef.current.length < targetCount) {
                particlesRef.current.push(createParticle());
            } else if (particlesRef.current.length > targetCount) {
                particlesRef.current.pop();
            }

            particlesRef.current.forEach((p) => {
                switch (config.behavior) {
                    case 'upward':
                        p.vy = -config.speed * (1 + Math.random() * 0.2);
                        p.vx = (Math.random() - 0.5) * 0.2;
                        p.y += p.vy;
                        p.x += p.vx;
                        break;
                    case 'pulse':
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        const angle = Math.atan2(p.y - centerY, p.x - centerX);
                        const pulseScale = Math.sin(time / 1000) * 0.5 + 1;
                        p.vx = Math.cos(angle) * config.speed * pulseScale;
                        p.vy = Math.sin(angle) * config.speed * pulseScale;
                        p.x += p.vx;
                        p.y += p.vy;
                        break;
                    case 'chaotic':
                        p.vx += (Math.random() - 0.5) * 0.5;
                        p.vy += (Math.random() - 0.5) * 0.5;
                        const mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                        if (mag > config.speed * 2) {
                            p.vx = (p.vx / mag) * config.speed * 2;
                            p.vy = (p.vy / mag) * config.speed * 2;
                        }
                        p.x += p.vx;
                        p.y += p.vy;
                        break;
                    default:
                        p.x += p.vx;
                        p.y += p.vy;
                }

                if (p.x < -20) p.x = canvas.width + 20;
                if (p.x > canvas.width + 20) p.x = -20;
                if (p.y < -20) p.y = canvas.height + 20;
                if (p.y > canvas.height + 20) p.y = -20;

                ctx.beginPath();
                if (config.behavior === 'upward') {
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + p.size * 10);
                    ctx.strokeStyle = config.color;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = p.alpha * 0.5;
                    ctx.stroke();
                } else {
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = config.color;
                    ctx.globalAlpha = p.alpha * 0.8;
                    ctx.fill();
                }
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestRef.current);
        };
    }, [currentIntent, targetCount]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 transition-all duration-[2000ms]"
            style={{
                filter: `blur(${config.blur}px)`,
                opacity: score > 30 ? 0.6 : 0.3
            }}
        />
    );
};
