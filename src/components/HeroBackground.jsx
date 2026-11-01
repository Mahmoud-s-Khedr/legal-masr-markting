import { useEffect, useRef } from "react";
import "./HeroBackground.css";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const hero = parent.parentElement;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes = [];
    let raf = 0;
    let running = false;
    let visible = true;

    let rgb = "30, 41, 59";

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    const LINK_DIST = 150;
    const POINTER_DIST = 190;

    /*
     * Read the current theme color.
     */
    const readColor = () => {
      const color =
        getComputedStyle(parent).color ||
        getComputedStyle(hero).color ||
        "rgb(30, 41, 59)";

      const match = color.match(/\d+(\.\d+)?/g);

      if (!match || match.length < 3) {
        return "30, 41, 59";
      }

      return `${match[0]}, ${match[1]}, ${match[2]}`;
    };

    const updateColor = () => {
      rgb = readColor();
    };

    /*
     * Create particles.
     */
    const makeNodes = () => {
      const count = Math.max(
        18,
        Math.min(70, Math.round((width * height) / 18000)),
      );

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.35,

        vy: (Math.random() - 0.5) * 0.35,

        r: Math.random() * 1.6 + 1,

        source: Math.random() < 0.18,

        phase: Math.random() * Math.PI * 2,
      }));
    };

    /*
     * Resize canvas.
     */
    const resize = () => {
      const rect = parent.getBoundingClientRect();

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);

      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;

      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateColor();

      makeNodes();

      draw(0);
    };

    /*
     * Get mouse position relative
     * to the hero.
     */
    const onPointerMove = (event) => {
      const rect = parent.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      /*
       * Only activate when mouse is
       * actually inside the hero.
       */
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        pointer.targetX = x;
        pointer.targetY = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    /*
     * Smooth cursor.
     */
    const updatePointer = () => {
      const targetX = pointer.active ? pointer.targetX : width / 2;

      const targetY = pointer.active ? pointer.targetY : height / 2;

      pointer.x += (targetX - pointer.x) * 0.1;

      pointer.y += (targetY - pointer.y) * 0.1;
    };

    /*
     * Move particles.
     */
    const step = () => {
      updatePointer();

      for (const n of nodes) {
        /*
         * Distance from cursor.
         */
        const dx = pointer.x - n.x;

        const dy = pointer.y - n.y;

        const distance = Math.hypot(dx, dy);

        /*
         * Cursor attraction.
         */
        if (pointer.active && distance < POINTER_DIST && distance > 1) {
          const influence = 1 - distance / POINTER_DIST;

          const force = influence * 0.035;

          n.vx += (dx / distance) * force;

          n.vy += (dy / distance) * force;
        }

        /*
         * Friction.
         */
        n.vx *= 0.995;
        n.vy *= 0.995;

        /*
         * Prevent particles from freezing.
         */
        const speed = Math.hypot(n.vx, n.vy);

        if (speed < 0.08) {
          n.vx += (Math.random() - 0.5) * 0.02;

          n.vy += (Math.random() - 0.5) * 0.02;
        }

        /*
         * Limit speed.
         */
        const maxSpeed = 0.7;

        if (speed > maxSpeed) {
          n.vx = (n.vx / speed) * maxSpeed;

          n.vy = (n.vy / speed) * maxSpeed;
        }

        n.x += n.vx;
        n.y += n.vy;

        /*
         * Wrap around.
         */
        if (n.x < -20) {
          n.x = width + 20;
        }

        if (n.x > width + 20) {
          n.x = -20;
        }

        if (n.y < -20) {
          n.y = height + 20;
        }

        if (n.y > height + 20) {
          n.y = -20;
        }
      }
    };

    /*
     * Mouse glow.
     */
    const drawMouseGlow = () => {
      if (!pointer.active) return;

      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        POINTER_DIST,
      );

      gradient.addColorStop(0, `rgba(${rgb}, 0.12)`);

      gradient.addColorStop(0.35, `rgba(${rgb}, 0.05)`);

      gradient.addColorStop(1, `rgba(${rgb}, 0)`);

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(pointer.x, pointer.y, POINTER_DIST, 0, Math.PI * 2);

      ctx.fill();
    };

    /*
     * Draw everything.
     */
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      /*
       * Global mouse parallax.
       *
       * This is deliberately noticeable.
       */
      let parallaxX = 0;
      let parallaxY = 0;

      if (pointer.active) {
        const normalizedX = pointer.x / width - 0.5;

        const normalizedY = pointer.y / height - 0.5;

        parallaxX = normalizedX * 25;

        parallaxY = normalizedY * 18;
      }

      ctx.save();

      ctx.translate(parallaxX, parallaxY);

      /*
       * Draw links.
       */
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];

          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < LINK_DIST) {
            let alpha = (1 - distance / LINK_DIST) * 0.22;

            /*
             * Brighten links close
             * to cursor.
             */
            if (pointer.active) {
              const midX = (a.x + b.x) / 2;

              const midY = (a.y + b.y) / 2;

              const mouseDistance = Math.hypot(
                pointer.x - midX,
                pointer.y - midY,
              );

              if (mouseDistance < POINTER_DIST) {
                const influence = 1 - mouseDistance / POINTER_DIST;

                alpha += influence * 0.25;
              }
            }

            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;

            ctx.lineWidth = 1;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);

            ctx.lineTo(b.x, b.y);

            ctx.stroke();
          }
        }
      }

      /*
       * Draw particles.
       */
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(time / 1400 + n.phase);

        let alpha = 0.28 + pulse * 0.3;

        let radius = n.r;

        /*
         * Cursor influence.
         */
        if (pointer.active) {
          const distance = Math.hypot(pointer.x - n.x, pointer.y - n.y);

          if (distance < POINTER_DIST) {
            const influence = 1 - distance / POINTER_DIST;

            alpha += influence * 0.45;

            radius += influence * 2.2;
          }
        }

        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;

        if (n.source) {
          const size = radius * 2.6;

          ctx.fillRect(n.x - size / 2, n.y - size / 2, size, size);
        } else {
          ctx.beginPath();

          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);

          ctx.fill();
        }
      }

      ctx.restore();

      /*
       * Glow stays attached to
       * the actual cursor.
       */
      drawMouseGlow();
    };

    const loop = (time) => {
      if (!running) return;

      step();
      draw(time);

      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) {
        return;
      }

      running = true;

      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;

      cancelAnimationFrame(raf);
    };

    /*
     * Theme observer.
     *
     * Supports:
     * class="dark"
     * data-theme="dark"
     * class="dark-theme"
     */
    const themeObserver = new MutationObserver(() => {
      updateColor();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    /*
     * Also observe the hero/background
     * in case its color changes directly.
     */
    const parentObserver = new MutationObserver(() => {
      updateColor();
    });

    parentObserver.observe(parent, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        start();
      } else {
        stop();
      }
    });

    const ro = new ResizeObserver(resize);

    /*
     * Setup.
     */
    updateColor();

    resize();

    ro.observe(parent);
    io.observe(parent);

    /*
     * IMPORTANT:
     * Listen on window because
     * hero-bg has pointer-events:none.
     */
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    window.addEventListener("pointerleave", onPointerLeave);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    start();

    return () => {
      stop();

      ro.disconnect();
      io.disconnect();

      themeObserver.disconnect();
      parentObserver.disconnect();

      window.removeEventListener("pointermove", onPointerMove);

      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__aurora hero-bg__aurora--one" />

      {/* <div className="hero-bg__aurora hero-bg__aurora--two" /> */}

      <div className="hero-bg__aurora hero-bg__aurora--three" />

      <canvas ref={canvasRef} className="hero-bg__canvas" />

      <div className="hero-bg__fade" />
    </div>
  );
}
