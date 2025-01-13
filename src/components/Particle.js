import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleComponents = () => {
  const options = useMemo(() => {
    return {
      particles: {
        number: {
          value: 10, // Number of particles
        },
        size: {
          value:2, // Size of particles
        },
        move: {
          enable: true,
          speed: 1, // Speed of movement
        },
        opacity: {
          value: 0.4, // Opacity of particles
        },
        shape: {
          type: "circle", // Shape of particles
        },
        color: {
            value: ["#FFD700","#FFFFFF"], // Red, Green, and Blue particles
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

  return <Particles className=" -z-40  min-h-screen " init={particlesInit} options={options}></Particles>;
};

export default ParticleComponents;
