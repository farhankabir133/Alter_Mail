import React, { useRef, useEffect } from 'react';

const DataStreamBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0, radius: 100 });
    const hue = useRef(0);

    // Moved Symbol and Stream classes out of useEffect for better structure and to avoid closure issues.
    class Symbol {
        x: number;
        y: number;
        value: string;
        speed: number;
        isFirst: boolean;
        opacity: number;
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()</>|*&^%$#@!~?;:=+-_';

        constructor(x: number, y: number, speed: number, isFirst: boolean) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.isFirst = isFirst;
            this.value = this.getRandomChar();
            this.opacity = 1;
        }

        getRandomChar() {
            return this.characters[Math.floor(Math.random() * this.characters.length)];
        }
        
        draw(context: CanvasRenderingContext2D, currentHue: number) {
            const dx = this.x - mouse.current.x;
            const dy = this.y - mouse.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Mouse hover effect gets a static, bright color for contrast
            if (distance < mouse.current.radius) {
                const opacity = 1 - (distance / mouse.current.radius);
                context.fillStyle = `rgba(220, 255, 255, ${opacity})`; 
                context.shadowBlur = 10;
                context.shadowColor = `rgba(150, 255, 255, ${opacity})`;
            } 
            // The "leader" of the stream is bright white/light
            else if (this.isFirst) {
                context.fillStyle = `hsl(${currentHue}, 90%, 85%)`; // Very light version of the current color
                context.shadowBlur = 8;
                context.shadowColor = `hsl(${currentHue}, 90%, 85%)`;
            } 
            // The tail of the stream is the main color, fading out
            else {
                // Use hsla to include the fading opacity
                context.fillStyle = `hsla(${currentHue}, 100%, 65%, ${this.opacity})`;
                context.shadowBlur = 0;
            }

            context.fillText(this.value, this.x, this.y);

            // Randomly change the character for a flickering effect
            if (Math.random() > 0.98) {
                this.value = this.getRandomChar();
            }
        }
    }

    class Stream {
        symbols: Symbol[] = [];
        totalSymbols: number;
        speed: number;
        x: number;
        y: number;
        angle: number;
        
        constructor(canvasWidth: number, canvasHeight: number) {
            this.totalSymbols = Math.round(Math.random() * 20 + 5);
            this.speed = Math.random() * 2 + 1;
            this.angle = (Math.PI / 4) + (Math.random() * 0.4 - 0.2);

            this.x = Math.random() * canvasWidth * 2 - canvasWidth;
            this.y = Math.random() * canvasHeight * 2 - canvasHeight;
            this.generateSymbols();
        }

        generateSymbols() {
            let y = 0;
            for (let i = 0; i < this.totalSymbols; i++) {
                this.symbols.push(new Symbol(0, y, this.speed, i === 0));
                y -= 20; // font size
            }
        }

        updateAndDraw(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, currentHue: number) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.x > canvasWidth + 50 || this.y > canvasHeight + 50 || this.x < -50 || this.y < -50) {
                 this.x = Math.random() * canvasWidth - canvasWidth;
                 this.y = Math.random() * canvasHeight;
            }

            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);

            this.symbols.forEach((symbol, index) => {
                symbol.opacity = 1 - (index / this.totalSymbols) * 0.95;
                symbol.draw(context, currentHue);
            });
            context.restore();
        }
    }

    const streamsRef = useRef<Stream[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const streamCount = 100;

        const init = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            streamsRef.current = [];
            for (let i = 0; i < streamCount; i++) {
                streamsRef.current.push(new Stream(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 15, 31, 0.2)'; // Fading effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '16px monospace';

            hue.current = (hue.current + 0.5) % 360;

            streamsRef.current.forEach(stream => stream.updateAndDraw(ctx, canvas.width, canvas.height, hue.current));
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const handleMouseMove = (e: MouseEvent) => {
             if(canvas.parentElement){
                 mouse.current.x = e.clientX - canvas.parentElement.getBoundingClientRect().left;
                 mouse.current.y = e.clientY - canvas.parentElement.getBoundingClientRect().top;
             }
        };

        const parentElement = canvas.parentElement;
        if (!parentElement) return;

        const resizeObserver = new ResizeObserver(() => {
            init();
        });
        resizeObserver.observe(parentElement);
        
        init();
        animate();

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default DataStreamBackground;