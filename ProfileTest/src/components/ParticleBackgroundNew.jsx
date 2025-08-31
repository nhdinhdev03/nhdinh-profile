import React, { useCallback, useMemo } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = ({ 
  isDark = false, 
  theme = 'cyber',
  density = 80,
  interactive = true 
}) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Particle system loaded
  }, []);

  // Dynamic particle configurations based on theme
  const getParticleConfig = useMemo(() => {
    const baseConfig = {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      detectRetina: true,
      particles: {
        number: {
          value: density,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce',
          },
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
    };

    // Theme-specific configurations
    const themeConfigs = {
      cyber: {
        particles: {
          ...baseConfig.particles,
          color: {
            value: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'],
          },
          shape: {
            type: ['circle', 'triangle', 'polygon'],
            polygon: {
              nb_sides: 6,
            },
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.5,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#00ffff',
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              color: '#00ffff',
              opacity: 0.1,
            },
          },
          move: {
            ...baseConfig.particles.move,
            speed: 1.5,
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: interactive,
              mode: ['grab', 'bubble'],
            },
            onclick: {
              enable: interactive,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.8,
              },
            },
            bubble: {
              distance: 250,
              size: 8,
              duration: 2,
              opacity: 0.8,
              speed: 3,
            },
            push: {
              particles_nb: 3,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
      },
      neural: {
        particles: {
          ...baseConfig.particles,
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: '#3b82f6',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.8,
            random: false,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 200,
            color: '#3b82f6',
            opacity: 0.6,
            width: 2,
          },
          move: {
            ...baseConfig.particles.move,
            speed: 0.8,
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: interactive,
              mode: 'connect',
            },
            onclick: {
              enable: interactive,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            connect: {
              distance: 120,
              line_linked: {
                opacity: 1,
              },
              radius: 60,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
      },
      matrix: {
        particles: {
          ...baseConfig.particles,
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 600,
            },
          },
          color: {
            value: '#00ff00',
          },
          shape: {
            type: 'char',
            character: {
              value: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
              font: 'Courier New',
              style: '',
              weight: '400',
            },
          },
          opacity: {
            value: 0.7,
            random: true,
            anim: {
              enable: true,
              speed: 3,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 16,
            random: true,
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'bottom',
            random: false,
            straight: true,
            outModes: {
              default: 'out',
            },
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: interactive,
              mode: 'bubble',
            },
            onclick: {
              enable: interactive,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 100,
              size: 20,
              duration: 2,
              opacity: 1,
              speed: 3,
            },
            push: {
              particles_nb: 4,
            },
          },
        },
      },
      space: {
        particles: {
          ...baseConfig.particles,
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          color: {
            value: ['#ffffff', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 6 },
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: interactive,
              mode: 'grab',
            },
            onclick: {
              enable: interactive,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 300,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 2,
            },
          },
        },
      },
      minimal: {
        particles: {
          ...baseConfig.particles,
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 2000,
            },
          },
          color: {
            value: isDark ? '#ffffff' : '#000000',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: isDark ? '#ffffff' : '#000000',
            opacity: 0.2,
            width: 1,
          },
          move: {
            ...baseConfig.particles.move,
            speed: 0.5,
          },
        },
        interactivity: {
          detect_on: 'window',
          events: {
            onhover: {
              enable: interactive,
              mode: 'grab',
            },
            onclick: {
              enable: interactive,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 2,
            },
          },
        },
      },
    };

    return {
      ...baseConfig,
      ...themeConfigs[theme],
    };
  }, [theme, density, interactive, isDark]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Particles
        id={`tsparticles-${theme}`}
        init={particlesInit}
        loaded={particlesLoaded}
        options={getParticleConfig}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;
