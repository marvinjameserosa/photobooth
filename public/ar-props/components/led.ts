import { DrawContext } from '@/lib/ar/types';
import { createRadialGlow, applyGlow, removeGlow } from '../utils/gradients';

/**
 * Draw animated LED with glow effect
 */
export function drawLED(context: DrawContext) {
    const { ctx, x, y, width, height, colors } = context;

    const time = Date.now();
    const hue = (time / 10) % 360; // Full color cycle
    const glowIntensity = (Math.sin(time / 200) + 1) / 2; // Pulsing 0-1

    ctx.save();
    ctx.translate(x, y);
    // Shift up to top of forehead
    ctx.translate(0, -height * 0.5);

    // Dynamic Color
    const mainColor = `hsla(${hue}, 100%, 50%, 0.9)`;
    const glowColor = `hsla(${hue}, 100%, 60%, ${0.4 + glowIntensity * 0.4})`;

    // LED body (dome)
    const bodyRadius = width * 0.2; // Reduced substantially to be small

    // Glow effect
    applyGlow(ctx, glowColor, 30 + glowIntensity * 20);

    // Main body gradient
    const gradient = ctx.createRadialGradient(0, -bodyRadius / 3, 0, 0, 0, bodyRadius);
    gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 1)`); // Highlight
    gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.9)`); // Main
    gradient.addColorStop(1, `hsla(${hue}, 100%, 30%, 0.8)`); // Darker edge

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, bodyRadius, 0, Math.PI * 2);
    ctx.fill();

    // Outer Halo
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(0, 0, bodyRadius * 1.4, 0, Math.PI * 2);
    ctx.fill();
    removeGlow(ctx);

    // Sharp Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(-bodyRadius / 3, -bodyRadius / 3, bodyRadius / 3, 0, Math.PI * 2);
    ctx.fill();

    // LED legs
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Left leg (anode - longer)
    ctx.beginPath();
    ctx.moveTo(-bodyRadius / 3, bodyRadius * 0.9);
    ctx.lineTo(-bodyRadius / 3, bodyRadius * 0.9 + height * 0.4);
    ctx.stroke();

    // Right leg (cathode - shorter)
    ctx.beginPath();
    ctx.moveTo(bodyRadius / 3, bodyRadius * 0.9);
    ctx.lineTo(bodyRadius / 3, bodyRadius * 0.9 + height * 0.25);
    ctx.stroke();

    ctx.restore();
}
