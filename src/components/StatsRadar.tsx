import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'
import type { Character } from '../types'

interface StatsRadarProps {
    stats: Character['stats']['base']
}

export function StatsRadar({ stats }: StatsRadarProps) {
    const { data, maxValue, angleDeg } = useMemo(() => {
        const entries = Object.entries(stats) as [string, number][];
        if (entries.length === 0) {
            return { data: [], maxValue: 1, angleDeg: 0 };
        }
        const max = Math.max(...entries.map(([, v]) => v), 1);
        const chartData = entries.map(([key, value]) => ({
            stat: key.slice(0, 3).toUpperCase(),
            value,
            fullMark: max,
        }));

        let highestIdx = 0;
        let highestVal = -1;
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][1] > highestVal) {
                highestVal = entries[i][1];
                highestIdx = i;
            }
        }

        return {
            data: chartData,
            maxValue: max,
            angleDeg: highestIdx * (360 / entries.length),
        };
    }, [stats]);

    return (
        <div className="relative aspect-square w-full min-h-[200px] max-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid
                        stroke="var(--color-gold-900)"
                        strokeOpacity={0.4}
                    />
                    <PolarAngleAxis
                        dataKey="stat"
                        tick={{
                            fill: 'var(--color-gold-400)',
                            fontSize: 11,
                            fontWeight: 600,
                        }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, maxValue]}
                        tick={{ fill: 'var(--color-gold-600)', fontSize: 9 }}
                        tickCount={5}
                        axisLine={false}
                    />
                    <Radar
                        name="Stats"
                        dataKey="value"
                        stroke="var(--color-gold-500)"
                        strokeWidth={2}
                        fill="var(--color-gold-500)"
                        fillOpacity={0.25}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Static arrow pointing at highest stat */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                    width="90"
                    height="90"
                    viewBox="0 0 100 100"
                    className="opacity-55"
                    style={{ transform: `rotate(${angleDeg}deg)` }}
                >
                    <defs>
                        <linearGradient id="radarArrowGrad" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--color-gold-900)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--color-gold-400)" stopOpacity="0.85" />
                        </linearGradient>
                    </defs>
                    <line x1="50" y1="50" x2="50" y2="16" stroke="url(#radarArrowGrad)" strokeWidth="1.2" strokeLinecap="round" />
                    <polygon points="50,12 47,19 53,19" fill="var(--color-gold-400)" opacity="0.8" />
                    <line x1="50" y1="50" x2="50" y2="70" stroke="var(--color-gold-900)" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                    <circle cx="50" cy="50" r="2.5" fill="var(--color-gold-500)" opacity="0.6" />
                    <circle cx="50" cy="50" r="1.2" fill="var(--color-gold-400)" />
                </svg>
            </div>
        </div>
    )
}
