import React, { useEffect, useRef } from 'react';

interface WarpBackgroundProps {
    active: boolean;
}

interface Star {
    x: number;   // normalized 0–1
    y: number;
    z: number;   // 0 = far/center, 1 = close/edge
    px: number;  // previous x (for streak)
    py: number;
}

// Tuning knobs
const NUM_STARS = 450;
const BASE_SPEED = 0.0028;       // very gentle drift
const Z_INCREMENT = 0.0022;      // how fast stars "approach"
const TRAIL_ALPHA = 0.10;        // lower = longer trails (slower fade)
const FADE_LERP = 0.018;         // opacity transition speed (~1.8s to fully fade)

function resetStar(star: Star) {
    // Spawn from a tight cluster at viewport center
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.04;
    star.x = 0.5 + Math.cos(angle) * r;
    star.y = 0.5 + Math.sin(angle) * r;
    star.z = 0;
    star.px = star.x;
    star.py = star.y;
}

const WarpBackground: React.FC<WarpBackgroundProps> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const rafRef = useRef<number>(0);
    const opacityRef = useRef<number>(0);
    const targetRef = useRef<number>(0);

    // Initialise stars spread across all depths so the canvas isn't empty on mount
    useEffect(() => {
        starsRef.current = Array.from({ length: NUM_STARS }, () => {
            const star: Star = { x: 0, y: 0, z: 0, px: 0, py: 0 };
            resetStar(star);
            // Pre-advance so stars are scattered, not all at centre
            const advance = Math.random();
            star.z = advance;
            const angle = Math.atan2(star.y - 0.5, star.x - 0.5);
            const dist = advance * 0.65;
            star.x = 0.5 + Math.cos(angle) * dist;
            star.y = 0.5 + Math.sin(angle) * dist;
            star.px = star.x;
            star.py = star.y;
            return star;
        });
    }, []);

    // Main animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let alive = true;

        const loop = () => {
            if (!alive) return;
            rafRef.current = requestAnimationFrame(loop);

            // Smoothly lerp canvas opacity toward target
            const diff = targetRef.current - opacityRef.current;
            if (Math.abs(diff) > 0.002) {
                opacityRef.current += diff * FADE_LERP;
            } else {
                opacityRef.current = targetRef.current;
            }

            // Nothing to draw while fully faded out
            if (opacityRef.current < 0.004) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const W = canvas.width;
            const H = canvas.height;

            // Fade previous frame — produces the motion-blur streak
            ctx.globalAlpha = 1;
            ctx.fillStyle = `rgba(8,8,8,${TRAIL_ALPHA})`;
            ctx.fillRect(0, 0, W, H);

            ctx.globalAlpha = opacityRef.current;

            for (const s of starsRef.current) {
                s.px = s.x;
                s.py = s.y;

                // Direction from centre
                const dx = s.x - 0.5;
                const dy = s.y - 0.5;
                const len = Math.sqrt(dx * dx + dy * dy) || 0.0001;

                // Speed scales with depth — near-zero when distant, faster when close
                const spd = BASE_SPEED * (0.08 + s.z * s.z * 2.2);
                s.x += (dx / len) * spd;
                s.y += (dy / len) * spd;
                s.z = Math.min(s.z + Z_INCREMENT, 1);

                // Recycle off-screen stars
                if (s.x < -0.02 || s.x > 1.02 || s.y < -0.02 || s.y > 1.02) {
                    resetStar(s);
                    continue;
                }

                // Visual properties keyed to depth
                const t = s.z;                              // 0 = far, 1 = close
                const brightness = Math.round(30 + t * 220);
                const blue = Math.min(brightness + 45, 255);
                const lw = 0.3 + t * t * 2.0;              // thin until very close

                const x1 = s.px * W;
                const y1 = s.py * H;
                const x2 = s.x * W;
                const y2 = s.y * H;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgb(${brightness},${brightness + 8},${blue})`;
                ctx.lineWidth = lw;
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
        };

        loop();
        return () => {
            alive = false;
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Keep canvas pixel-size synced with the viewport
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const sync = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        sync();
        window.addEventListener('resize', sync);
        return () => window.removeEventListener('resize', sync);
    }, []);

    // Drive the fade based on active prop
    useEffect(() => {
        targetRef.current = active ? 1 : 0;
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    );
};

export default WarpBackground;
