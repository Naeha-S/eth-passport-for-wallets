import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  rows?: number;
  cols?: number;
}

// Procedurally generate a beautiful, minimalist, high-contrast OpenPeeps-like character sprite sheet
function generatePeepsSpriteSheet(rows: number, cols: number): HTMLCanvasElement {
  const spriteSheet = document.createElement("canvas");
  const cellWidth = 60;
  const cellHeight = 120;
  spriteSheet.width = cellWidth * rows;
  spriteSheet.height = cellHeight * cols;

  const ctx = spriteSheet.getContext("2d");
  if (!ctx) return spriteSheet;

  // Let's paint some lovely custom editorial illustrations for each cell
  const total = rows * cols;
  for (let i = 0; i < total; i++) {
    const col = i % rows;
    const row = Math.floor(i / rows);

    const x = col * cellWidth;
    const y = row * cellHeight;

    ctx.save();
    ctx.translate(x + cellWidth / 2, y + cellHeight - 5);

    // Random styling variables derived deterministically from index
    const seed = i + 37;
    const headSize = 10 + (seed % 3);
    const bodyHeight = 35 + (seed % 10);
    const bodyWidth = 16 + (seed % 8);
    const colorSeed = seed % 5;

    // Palette of high-end editorial and passport tones based on requested scheme
    let mainColor = "rgba(253, 253, 255, 0.9)"; // Off-White
    if (colorSeed === 1) mainColor = "rgba(98, 146, 158, 0.95)"; // Pacific Cyan
    else if (colorSeed === 2) mainColor = "rgba(84, 106, 123, 0.9)"; // Blue Slate
    else if (colorSeed === 3) mainColor = "rgba(198, 197, 185, 0.85)"; // Silver
    else if (colorSeed === 4) mainColor = "rgba(98, 146, 158, 0.45)"; // Faded accent

    // Column represents progress of walk cycle - let's make legs animate!
    const walkPhase = (col / rows) * Math.PI * 4;
    const leftLegOffset = Math.sin(walkPhase) * 12;
    const rightLegOffset = -Math.sin(walkPhase) * 12;

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // 1. Draw Legs (Walking movement based on phase)
    ctx.beginPath();
    // Left Leg
    ctx.moveTo(-5, -20);
    ctx.lineTo(-6 + leftLegOffset * 0.3, -10);
    ctx.lineTo(-8 + leftLegOffset, 0);
    // Right Leg
    ctx.moveTo(5, -20);
    ctx.lineTo(6 + rightLegOffset * 0.3, -10);
    ctx.lineTo(8 + rightLegOffset, 0);
    ctx.stroke();

    // 2. Draw Torso / Coat (Use Gunmetal dark core)
    ctx.fillStyle = "#25282a";
    ctx.beginPath();
    ctx.moveTo(-bodyWidth / 2, -20 - bodyHeight);
    ctx.lineTo(bodyWidth / 2, -20 - bodyHeight);
    ctx.lineTo(bodyWidth / 2 + 3, -20);
    ctx.lineTo(-bodyWidth / 2 - 3, -20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3. Draw Arms / Accessories (Swing back & forth based on walk)
    const armSwing = Math.cos(walkPhase) * 15;
    ctx.beginPath();
    // Left Arm
    ctx.moveTo(-bodyWidth / 2, -15 - bodyHeight);
    ctx.lineTo(-bodyWidth / 2 - 8, -10 - bodyHeight / 2 + armSwing);
    if (seed % 3 === 0) {
      // Carrying a ledger/folder!
      ctx.lineTo(-bodyWidth / 2 - 12, -12 - bodyHeight / 2 + armSwing);
      ctx.stroke();
      ctx.fillStyle = "rgba(98, 146, 158, 0.8)";
      ctx.fillRect(-bodyWidth / 2 - 15, -18 - bodyHeight / 2 + armSwing, 8, 12);
    } else {
      ctx.stroke();
    }

    // Right Arm
    ctx.beginPath();
    ctx.moveTo(bodyWidth / 2, -15 - bodyHeight);
    ctx.lineTo(bodyWidth / 2 + 8, -10 - bodyHeight / 2 - armSwing);
    ctx.stroke();

    // 4. Draw Neck & Head
    ctx.beginPath();
    ctx.moveTo(0, -20 - bodyHeight);
    ctx.lineTo(0, -25 - bodyHeight);
    ctx.stroke();

    // Head
    ctx.fillStyle = "#121214";
    ctx.beginPath();
    ctx.arc(0, -25 - bodyHeight - headSize, headSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 5. Head Accessories (Hats, spectacles, hair details)
    ctx.fillStyle = mainColor;
    if (seed % 4 === 0) {
      // Brimmed Hat / Fedora
      ctx.beginPath();
      ctx.moveTo(-headSize - 4, -25 - bodyHeight - headSize - 2);
      ctx.lineTo(headSize + 4, -25 - bodyHeight - headSize - 2);
      ctx.stroke();
      ctx.fillRect(-headSize / 2 - 2, -25 - bodyHeight - headSize * 2, headSize + 4, headSize);
    } else if (seed % 4 === 1) {
      // Cute winter Beanie
      ctx.beginPath();
      ctx.arc(0, -25 - bodyHeight - headSize - 2, headSize * 0.9, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      // Pom-pom on top
      ctx.beginPath();
      ctx.arc(0, -25 - bodyHeight - headSize * 1.9, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (seed % 4 === 2) {
      // Cool glasses
      ctx.beginPath();
      ctx.arc(-headSize / 2, -25 - bodyHeight - headSize, 3, 0, Math.PI * 2);
      ctx.arc(headSize / 2, -25 - bodyHeight - headSize, 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-headSize / 2 + 3, -25 - bodyHeight - headSize);
      ctx.lineTo(headSize / 2 - 3, -25 - bodyHeight - headSize);
      ctx.stroke();
    }

    ctx.restore();
  }

  return spriteSheet;
}

export default function CrowdCanvas({ rows = 15, cols = 7 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Build sprites dynamically offscreen
    const spriteSheet = generatePeepsSpriteSheet(rows, cols);

    const config = {
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 60 - 150 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width + peep.width;
        peep.scaleX = 0.7; // subtle scaling for depth feel
      } else {
        startX = stage.width + peep.width;
        endX = -peep.width;
        peep.scaleX = -0.7;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = randomRange(12, 22);
      const yDuration = 0.28;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.6, 1.4));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.ceil(xDuration / yDuration),
          yoyo: true,
          y: startY - 8,
          ease: "sine.inOut"
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLCanvasElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLCanvasElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          // Render centered properly
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, Math.abs(peep.scaleX));
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            -peep.width / 2,
            -peep.height,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const width = spriteSheet.width;
      const height = spriteSheet.height;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: spriteSheet,
            rect: [
              (i % rows) * rectWidth,
              Math.floor(i / rows) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const initCrowd = () => {
      const activePeepsCount = Math.min(allPeeps.length, 12); // display max 12 gorgeous characters at once for perfect pacing
      for (let i = 0; i < activePeepsCount; i++) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) {
        availablePeeps.push(...allPeeps.filter(p => !crowd.includes(p)));
      }
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      // Sort so characters in front (higher anchorY / bottom of page) overlay correctly on top of characters behind!
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.parentElement?.clientWidth || window.innerWidth;
      stage.height = canvas.parentElement?.clientHeight || 400;

      canvas.style.width = stage.width + "px";
      canvas.style.height = stage.height + "px";
      canvas.width = stage.width * (window.devicePixelRatio || 1);
      canvas.height = stage.height * (window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    createPeeps();
    resize();
    gsap.ticker.add(render);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[320px] pointer-events-none opacity-45"
    />
  );
}
