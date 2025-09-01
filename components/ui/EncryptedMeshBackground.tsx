import React, { useRef, useEffect } from 'react';

const EncryptedMeshBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const hexSize = 30;
        const hexWidth = hexSize * Math.sqrt(3);
        const hexHeight = hexSize * 2;
        
        const nodes: { x: number, y: number, energy: number }[] = [];

        const init = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            nodes.length = 0; // Clear nodes array

            const cols = Math.ceil(canvas.width / hexWidth);
            const rows = Math.ceil(canvas.height / (hexHeight * 3/4));

            for (let row = 0; row <= rows; row++) {
                for (let col = 0; col <= cols; col++) {
                    const x = col * hexWidth + (row % 2) * (hexWidth / 2);
                    const y = row * (hexHeight * 3/4);
                    nodes.push({ x, y, energy: Math.random() });
                }
            }
        };

        const drawHexagon = (x: number, y: number, size: number, color: string) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            nodes.forEach(node => {
                drawHexagon(node.x, node.y, hexSize, 'rgba(56, 189, 248, 0.1)'); // Light blue grid
            });
            
            // Draw and update glowing nodes
            nodes.forEach(node => {
                // Animate energy
                node.energy += (Math.random() - 0.5) * 0.02;
                if (node.energy < 0) node.energy = 0;
                if (node.energy > 1) node.energy = 1;

                if (node.energy > 0.95) { // Only draw glow for high-energy nodes
                    const glowRadius = node.energy * 5;
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
                    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
                    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });
        };

        const animate = () => {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 100);
        };

        init();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default EncryptedMeshBackground;
