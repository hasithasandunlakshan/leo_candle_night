import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleComponents = () => {
  const options = useMemo(() => {
    return {
      particles: {
        number: {
          value: 50, // Number of particles
        },
        size: {
          value: 3, // Size of particles
        },
        move: {
          enable: true,
          speed: 2, // Speed of movement
        },
        opacity: {
          value: 0.5, // Opacity of particles
        },
        shape: {
          type: "circle", // Shape of particles
        },
        color: {
            value: ["#ff0000", "#00ff00", "#0000ff"], // Red, Green, and Blue particles
          },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Particles repel on hover
          },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles init={particlesInit} options={options}></Particles>;
};

export default ParticleComponents;
