import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const InteractiveBalls = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const ballsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.5 }
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

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

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

        // Clip to a rounded path
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.clip();

        const image = new Image();
        image.src = sprite.texture;

        // Draw the image after it is loaded
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

    const height = window.innerHeight;

    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      height + 50, // Push it further down if needed
      window.innerWidth,
      60,
      {
        isStatic: true,
        render: { visible: false }, // 👈 Hide the black bar
      }
    );

    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });

    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.World.add(engine.world, [ground, leftWall, rightWall, mouseConstraint]);

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

      const ball = Matter.Bodies.circle(Math.random() * window.innerWidth, -50, 30, {
        restitution: 0.9,
        render: {
          sprite: {
            texture: randomImage,
            xScale: 1, // slight bump to fit circle
            yScale: 1,
          },
        },
      });

      ballsRef.current.push(ball);
      Matter.World.add(engine.world, ball);
    }, 0);

    return () => {
      clearInterval(dropInterval);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [startAnimation]);

  return <div ref={sceneRef} style={{ height: '100vh', width: '100%' }} />;
};

export default InteractiveBalls;
