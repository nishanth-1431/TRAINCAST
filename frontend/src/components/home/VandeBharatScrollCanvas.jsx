import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOTAL_FRAMES = 161;

const getFramePath = (index) => {
  const pad = String(index).padStart(3, '0');
  return `/vandebharat_frames/frame_${pad}.png`;
};

export const VandeBharatScrollCanvas = ({ scrollTriggerRef }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // High quality scaling & 1280x720 native aspect buffer
    canvas.width = 1280;
    canvas.height = 720;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastRenderedFloat = -1;
    const images = new Array(TOTAL_FRAMES + 1);
    imagesRef.current = images;

    // Fast image loader with off-thread PNG decompression
    const requestFrame = (idx) => {
      const target = Math.min(TOTAL_FRAMES, Math.max(1, idx));
      if (images[target]) return images[target];

      const img = new Image();
      img.src = getFramePath(target);
      images[target] = img;

      if (img.decode) {
        img.decode().catch(() => {});
      }

      img.onload = () => {
        // If this is frame 1 and at the top, render immediately
        if (target === 1 && (playhead.frame <= 1.05 || window.scrollY <= 10)) {
          drawBlendedFrames(1, true);
        }
      };

      return img;
    };

    // Preload all 161 frames immediately upon mount
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      requestFrame(i);
    }

    // Safely find the closest loaded image without EVER jumping into the distant future
    const getLoadedImage = (idx) => {
      const target = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(idx)));
      const direct = images[target];
      if (direct && direct.complete && direct.naturalWidth > 0) {
        return direct;
      }
      // ONLY search backward for earlier loaded frames to avoid future-frame flashing
      for (let prev = target - 1; prev >= 1; prev--) {
        const p = images[prev];
        if (p && p.complete && p.naturalWidth > 0) return p;
      }
      // Only check immediate next 2 frames
      for (let next = target + 1; next <= Math.min(TOTAL_FRAMES, target + 2); next++) {
        const n = images[next];
        if (n && n.complete && n.naturalWidth > 0) return n;
      }
      return images[1] || null;
    };

    // Sub-frame optical cross-blend renderer
    const drawBlendedFrames = (frameFloat, force = false) => {
      if (!ctx || !canvas) return;

      const clamped = Math.min(TOTAL_FRAMES, Math.max(1, frameFloat));

      // Skip negligible changes (< 0.004) to avoid unnecessary work
      if (!force && Math.abs(clamped - lastRenderedFloat) < 0.004) {
        return;
      }

      // Pure top of page boundary: Frame 1
      if (clamped <= 1.01) {
        const f1 = getLoadedImage(1);
        if (f1) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(f1, 0, 0, canvas.width, canvas.height);
          lastRenderedFloat = 1.0;
        }
        return;
      }

      // Pure end of scroll boundary: Final Frame
      if (clamped >= TOTAL_FRAMES - 0.01) {
        const fEnd = getLoadedImage(TOTAL_FRAMES);
        if (fEnd) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(fEnd, 0, 0, canvas.width, canvas.height);
          lastRenderedFloat = TOTAL_FRAMES;
        }
        return;
      }

      const floorIdx = Math.floor(clamped);
      const ceilIdx = floorIdx + 1;
      const fraction = clamped - floorIdx;

      const imgFloor = getLoadedImage(floorIdx);
      if (!imgFloor) return;

      // Only cross-blend if the next consecutive frame is actually loaded
      const imgCeil = images[ceilIdx];
      const hasCeil = imgCeil && imgCeil.complete && imgCeil.naturalWidth > 0;

      if (fraction < 0.02 || !hasCeil) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgFloor, 0, 0, canvas.width, canvas.height);
      } else if (fraction > 0.98) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgCeil, 0, 0, canvas.width, canvas.height);
      } else {
        // Continuous optical blend between consecutive frames
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgFloor, 0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = fraction;
        ctx.drawImage(imgCeil, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
      }

      lastRenderedFloat = clamped;
    };

    // Pin, Scrub Timeline, and synchronized Hero Content fade-out
    const triggerTarget = scrollTriggerRef?.current || canvas.closest('.hero-banner') || canvas;
    const headerEl = document.querySelector('.public-header');
    const headerH = headerEl ? headerEl.offsetHeight : 122;

    const playhead = { frame: 1 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerTarget,
        start: 'top top+=' + headerH,
        end: '+=1800',
        pin: true,
        pinSpacing: true,
        scrub: 0.2, // Responsive 200ms inertia - stays tightly locked to scroll runway
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress <= 0.001) {
            playhead.frame = 1;
            drawBlendedFrames(1, true);
          } else if (self.progress >= 0.999) {
            playhead.frame = TOTAL_FRAMES;
            drawBlendedFrames(TOTAL_FRAMES, true);
          } else {
            drawBlendedFrames(playhead.frame);
          }
        },
        onLeaveBack: () => {
          playhead.frame = 1;
          drawBlendedFrames(1, true);
        },
        onEnter: () => {
          if (window.scrollY <= 10) {
            playhead.frame = 1;
            drawBlendedFrames(1, true);
          }
        },
        onLeave: () => {
          playhead.frame = TOTAL_FRAMES;
          drawBlendedFrames(TOTAL_FRAMES, true);
        },
        onEnterBack: () => {
          drawBlendedFrames(playhead.frame, true);
        }
      }
    });

    // 1. Scrub frames from 1 to 161 across the full scroll distance
    tl.to(playhead, {
      frame: TOTAL_FRAMES,
      ease: 'none',
      duration: 1
    }, 0);

    // 2. Elegantly dissolve hero content during the last 35% of the scroll (0.65 to 1.0)
    // so when the Problem Statement card enters, hero text is smoothly out of the way
    tl.to('.hero-content', {
      opacity: 0,
      y: -25,
      ease: 'power2.in',
      duration: 0.35
    }, 0.65);

    // Recalculate ScrollTrigger start/end and pin-spacer padding
    ScrollTrigger.refresh();

    // Initial check on mount
    if (window.scrollY <= 10) {
      playhead.frame = 1;
      drawBlendedFrames(1, true);
    }
  }, { scope: scrollTriggerRef || canvasRef });

  return (
    <div className="vandebharat-canvas-wrapper">
      <canvas ref={canvasRef} className="vandebharat-canvas" />
    </div>
  );
};
