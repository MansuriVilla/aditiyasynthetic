import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const InteractiveBalls = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(null);
  const renderRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const ballsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    const engine = engineRef.current;
    const container = sceneRef.current;

    // Initial dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });
    renderRef.current = render;

    // Style canvas properly
    render.canvas.style.position = 'absolute';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.width = '100%';
    render.canvas.style.height = '100%';

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Add mouse control for interactivity
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

    const context = render.context;
    const originalDrawBody = Matter.Render.body;

    Matter.Render.body = (render, body) => {
      if (body.render.sprite && body.render.sprite.texture) {
        const { sprite } = body.render;
        const { x, y } = body.position;
        const radius = body.circleRadius;

        context.save();
        context.translate(x, y);
        context.rotate(body.angle);

        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.clip();

        const image = new Image();
        image.src = sprite.texture;

        image.onload = () => {
          context.drawImage(
            image,
            -radius * sprite.xScale,
            -radius * sprite.yScale,
            2 * radius * sprite.xScale,
            2 * radius * sprite.yScale
          );
        };

        context.restore();
      } else {
        originalDrawBody(render, body);
      }
    };

    // Walls (side + bottom)
    const ground = Matter.Bodies.rectangle(width / 2, height, width, 60, {
      isStatic: true,
      render: { visible: false },
    });
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // Convert DOM labels to Matter.js bodies
    const updateStaticBodies = () => {
      const bodiesToRemove = engine.world.bodies.filter(
        (body) => body.isStatic && body !== ground && body !== leftWall && body !== rightWall
      );
      bodiesToRemove.forEach((body) => Matter.World.remove(engine.world, body));

      const labelElements = document.querySelectorAll('.why_choose-us-inner');

      labelElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
      
        const buffer = 50; // Add a buffer to avoid clipping
      
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top + rect.height / 2 - containerRect.top;
      
        const width = rect.width + buffer;
        const height = rect.height + buffer;
      
        const body = Matter.Bodies.rectangle(x, y, width, height, {
          isStatic: true,
          render: {
            visible: false,
          },
        });
      
        Matter.World.add(engine.world, body);
      });
      
    };

    updateStaticBodies();

    // Ball dropping
    const imageUrls = [
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

    const dropInterval = setInterval(() => {
      if (ballsRef.current.length >= 17) return;

      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      const ball = Matter.Bodies.circle(Math.random() * width, -40, 30, {
        restitution: 0.8,
        friction: 0.001,
        render: {
          sprite: {
            texture: randomImage,
            xScale: 0.8,
            yScale: 0.8,
          },
        },
      });

      ballsRef.current.push(ball);
      Matter.World.add(engine.world, ball);
    }, 120);

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;

      Matter.Body.setPosition(ground, { x: width / 2, y: height });
      Matter.Body.setPosition(leftWall, { x: -30, y: height / 2 });
      Matter.Body.setPosition(rightWall, { x: width + 30, y: height / 2 });

      updateStaticBodies();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(dropInterval);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, [startAnimation]);

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        // pointerEvents: 'none',
      }}
    />
  );
};

export default InteractiveBalls;
