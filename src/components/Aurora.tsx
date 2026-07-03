import React, { useEffect, useRef } from "react";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
}

export default function Aurora({
  colorStops = ["#4D1616", "#D4AF37", "#2D0F0F"],
  amplitude = 1,
  blend = 0.5,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width || canvas.offsetWidth;
        height = canvas.height = entry.contentRect.height || canvas.offsetHeight;
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Prepare animated waves representing Aurora bands
    interface Wave {
      y: number;
      length: number;
      amplitude: number;
      speed: number;
      phase: number;
      color: string;
    }

    const waves: Wave[] = colorStops.map((color, index) => {
      return {
        y: height * (0.3 + index * 0.15),
        length: 0.002 + index * 0.001,
        amplitude: 60 * amplitude * (1.2 - index * 0.2),
        speed: 0.008 + index * 0.005,
        phase: index * Math.PI * 0.4,
        color: color,
      };
    });

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Save context to apply blend mode
      ctx.save();
      ctx.globalAlpha = blend;
      ctx.globalCompositeOperation = "screen";

      // Draw aurora paths
      waves.forEach((wave) => {
        wave.phase += wave.speed;

        // Draw multiple horizontal strips with smooth vertical gradients to simulate a gaseous, light-emitting Aurora
        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, wave.y + wave.amplitude * 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, wave.color);
        grad.addColorStop(0.7, wave.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);

        // Plot beautiful wave path
        for (let x = 0; x <= width; x += 10) {
          const sinValue = Math.sin(x * wave.length + wave.phase);
          const cosValue = Math.cos(x * 0.0005 + wave.phase * 0.5);
          const y = wave.y + sinValue * wave.amplitude + cosValue * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();

      // Draw a subtle overlay grid or dark overlay to integrate cleanly into the theme
      const overlayGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      overlayGrad.addColorStop(0, "rgba(15, 15, 15, 0)");
      overlayGrad.addColorStop(0.8, "rgba(15, 15, 15, 0.7)");
      overlayGrad.addColorStop(1, "rgba(15, 15, 15, 0.95)");

      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [colorStops, amplitude, blend]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      style={{ filter: "blur(40px)" }}
    />
  );
}
