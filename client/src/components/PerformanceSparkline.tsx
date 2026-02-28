
import React from 'react';
import { motion } from 'framer-motion';

interface PerformanceSparklineProps {
    data: number[]; // Array of last 30 scores
    color?: string;
}

export const PerformanceSparkline: React.FC<PerformanceSparklineProps> = ({ data = [], color = '#06b6d4' }) => {
    // If no data, show flat line
    const points = data.length > 0 ? data : Array(30).fill(50);

    // Normalize to SVG viewbox 100x30
    const max = 100;
    const min = 0;
    const width = 100;
    const height = 30;

    const polyline = points.map((val, i) => {
        const xFactor = points.length > 1 ? (i / (points.length - 1)) : 0;
        const x = xFactor * width;

        const numericVal = typeof val === 'number' && !isNaN(val) ? val : 50;
        const yValue = ((numericVal - min) / (max - min)) * height;
        const y = height - (isNaN(yValue) ? height / 2 : yValue);

        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full h-12 relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 border-b border-l border-white/5 opacity-30" />

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible preserve-3d">
                <defs>
                    <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area Fill */}
                <motion.path
                    d={`M 0 ${height} L ${polyline} L ${width} ${height} Z`}
                    fill="url(#sparkGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Line */}
                <motion.polyline
                    points={polyline}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>

            {/* Tooltip on hover could go here, keeping it minimal for now */}
        </div>
    );
};
