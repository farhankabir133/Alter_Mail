import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        // Use a lower particle count for better performance, the connections create the density
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000); 

        class Particle {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 1.5 + 0.5; // Micro-particles
                this.vx = Math.random() * 0.4 + 0.1; // Consistent rightward flow
                this.vy = (Math.random() - 0.5) * 0.4; // Slight vertical drift
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap particles around screen edges for a seamless loop
                if (this.x > canvas.width + this.radius) {
                    this.x = -this.radius;
                }
                if (this.y < -this.radius) {
                    this.y = canvas.height + this.radius;
                }
                if (this.y > canvas.height + this.radius) {
                    this.y = -this.radius;
                }
            }
        }

        const connectParticles = () => {
             if (!ctx) return;
             const isDarkMode = document.documentElement.classList.contains('dark');
             const baseColor = isDarkMode ? '110, 160, 255' : '100, 120, 180';
             const connectionDistance = 120;

             for (let a = 0; a < particles.length; a++) {
                 for (let b = a; b < particles.length; b++) {
                     const dx = particles[a].x - particles[b].x;
                     const dy = particles[a].y - particles[b].y;
                     const distance = Math.sqrt(dx * dx + dy * dy);

                     if (distance < connectionDistance) {
                         const opacity = 1 - (distance / connectionDistance);
                         ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.5})`; // Subtle lines
                         ctx.lineWidth = 1;
                         ctx.beginPath();
                         ctx.moveTo(particles[a].x, particles[a].y);
                         ctx.lineTo(particles[b].x, particles[b].y);
                         ctx.stroke();
                     }
                 }
             }
        };

        const init = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            particles = [];
            
            const isDarkMode = document.documentElement.classList.contains('dark');
            const particleColor = isDarkMode ? 'rgba(200, 220, 255, 0.7)' : 'rgba(100, 120, 180, 0.7)';

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y, particleColor));
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        // Debounce resize handler for performance
        // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> to use the correct type for the timeout ID in a browser environment.
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 100);
        };

        init();
        animate();

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default ParticleBackground;