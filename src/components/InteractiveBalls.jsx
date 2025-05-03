import { useEffect, useRef, useState } from 'react';
import Physics from 'physicsjs';

const InteractiveBalls = () => {
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  const spawnedRef = useRef(false);
  const imageLoadAttempted = useRef(false);
  const [loadingError, setLoadingError] = useState(null);

  const imageURLs = [
    '/assets/Ellipse-1.webp',
    '/assets/Ellipse-2.webp',
    '/assets/Ellipse-3.webp',
    '/assets/Ellipse-4.webp',
    '/assets/Ellipse-5.webp',
    '/assets/Ellipse-6.webp',
    '/assets/Ellipse-7.webp',
    '/assets/Ellipse-8.webp',
    '/assets/Ellipse-9.webp',
    '/assets/Ellipse-10.webp',
    '/assets/Ellipse-11.webp',
    '/assets/Ellipse-12.webp',
    '/assets/Ellipse-13.webp',
    '/assets/Ellipse-14.webp',
    '/assets/Ellipse-15.webp',
    '/assets/Ellipse-16.webp',
    '/assets/Ellipse-17.webp',
  ];

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (canvas && section) {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      console.log('Canvas resized:', { width: rect.width, height: rect.height });

      if (worldRef.current) {
        const edgeBehavior = worldRef.current.getBehaviors().find(b => b.options.aabb);
        if (edgeBehavior) {
          edgeBehavior.options.aabb = Physics.aabb(0, 0, rect.width, rect.height);
        }
        updateLabelBodies();
      }
    } else {
      console.warn('Canvas or section not found for resizing');
    }
  };

  const updateLabelBodies = () => {
    const canvas = canvasRef.current;
    if (!canvas || !worldRef.current) return;

    const existingLabelBodies = worldRef.current.getBodies().filter(body => body.isLabel);
    existingLabelBodies.forEach(body => worldRef.current.remove(body));

    const labels = document.querySelectorAll('.why_choose-us-label');
    const canvasRect = canvas.getBoundingClientRect();

    labels.forEach((label, index) => {
      const rect = label.getBoundingClientRect();
      const body = Physics.body('rectangle', {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top, // Align with top of label
        width: rect.width,
        height: rect.height,
        mass: 1,
        restitution: 0.6,
        cof: 0.8,
        treatment: 'static',
        isLabel: true,
      });
      worldRef.current.add(body);
      console.log(`Added label body ${index + 1}:`, { x: body.state.pos.x, y: body.state.pos.y, width: rect.width, height: rect.height });
    });
  };

  useEffect(() => {
    if (imageLoadAttempted.current) return;
    imageLoadAttempted.current = true;

    console.log('Starting image preload');
    const loadedImages = [];
    let imagesLoaded = 0;
    let errorCount = 0;

    imageURLs.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages[index] = img;
        imagesLoaded++;
        console.log(`Image loaded: ${url}`);
        if (imagesLoaded === imageURLs.length) {
          initPhysics(loadedImages.filter(Boolean));
        }
      };
      img.onerror = () => {
        console.error('Failed to load image:', url);
        errorCount++;
        imagesLoaded++;
        if (imagesLoaded === imageURLs.length) {
          if (errorCount === imageURLs.length) {
            setLoadingError('All images failed to load. Using fallback circles.');
            initPhysics([]);
          } else if (errorCount > 0) {
            setLoadingError('Some images failed to load. Using available images.');
            initPhysics(loadedImages.filter(Boolean));
          } else {
            initPhysics(loadedImages);
          }
        }
      };
    });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', updateLabelBodies);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateLabelBodies);
      if (worldRef.current) {
        Physics.util.ticker.stop();
        worldRef.current.destroy();
      }
    };
  }, []);

  const initPhysics = (loadedImages) => {
    console.log('Physics initialized with', loadedImages.length, 'images');
    Physics(function (world) {
      worldRef.current = world;

      const canvas = canvasRef.current;
      const renderer = Physics.renderer('canvas', {
        el: canvas,
        meta: false,
        styles: {
          'circle': {
            fillStyle: loadedImages.length ? 'transparent' : '#f28c38',
            strokeStyle: loadedImages.length ? 'none' : '#000',
            lineWidth: 1
          },
          'rectangle': {
            fillStyle: 'transparent',
            strokeStyle: 'none'
          }
        },
      });

      world.add(renderer);
      world.on('step', () => world.render());

      world.add([
        Physics.behavior('edge-collision-detection', {
          aabb: Physics.aabb(0, 0, canvas.width, canvas.height),
          restitution: 0.2,
          cof: 0.8,
        }),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('constant-acceleration', { acc: { x: 0, y: 0.001 } }),
        Physics.behavior('sweep-prune'),
      ]);

      const spawnBall = () => {
        const idx = loadedImages.length ? Math.floor(Math.random() * loadedImages.length) : 0;
        const img = loadedImages.length ? loadedImages[idx] : null;
        const radius = 68;
        const ball = Physics.body('circle', {
          x: Math.random() * canvas.width,
          y: -radius * 2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: Math.random() * 0.2,
          radius: radius,
          mass: 1,
          restitution: 0.6,
          view: img,
        });
        world.add(ball);
        console.log('Spawned ball:', { x: ball.state.pos.x, y: ball.state.pos.y });
      };

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !spawnedRef.current) {
              spawnedRef.current = true;
              console.log('Spawning balls');
              for (let i = 0; i < 17; i++) {
                setTimeout(spawnBall, i * 100);
              }
              obs.unobserve(canvas);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(canvas);
      updateLabelBodies();

      Physics.util.ticker.on(time => world.step(time));
      Physics.util.ticker.start();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let draggedBody = null;
    let offset = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };
    let mouseVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const bodies = worldRef.current?.find({ $at: pos }) || [];
      if (bodies.length) {
        draggedBody = bodies[0];
        offset.x = draggedBody.state.pos.x - pos.x;
        offset.y = draggedBody.state.pos.y - pos.y;
        draggedBody.sleep(false);
        lastMouse = { ...pos };
        console.log('Dragging ball:', pos);
      }
    };

    const handleMouseMove = (e) => {
      if (draggedBody) {
        const rect = canvas.getBoundingClientRect();
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        mouseVelocity.x = pos.x - lastMouse.x;
        mouseVelocity.y = pos.y - lastMouse.y;
        draggedBody.state.pos.x = pos.x + offset.x;
        draggedBody.state.pos.y = pos.y + offset.y;
        lastMouse = { ...pos };
      }
    };

    const handleMouseUp = () => {
      if (draggedBody) {
        draggedBody.state.vel.x = mouseVelocity.x * 0.1; // Reduced multiplier for smoother throw
        draggedBody.state.vel.y = mouseVelocity.y * 0.1; // Reduced multiplier for smoother throw
        draggedBody = null;
        console.log('Released ball');
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (loadingError) {
    return <div className="error">{loadingError}</div>;
  }

  return (
    <canvas
      ref={canvasRef}
      className="why_choose-us-canvas"
    />
  );
};

export default InteractiveBalls;