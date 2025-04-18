"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"

export function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#ffffff",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10,
                },
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 6,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
              grab: {
                distance: 400,
                links: {
                  opacity: 1,
                  color: "#1a365d",
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
                color: {
                  value: ["#1a365d", "#2a4a7f", "#3c64a6"],
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#1a365d", "#2a4a7f", "#3c64a6", "#0f2a4a", "#4d76b9"],
            },
            links: {
              color: "#1a365d",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.1,
              },
              warp: true,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1.5,
              straight: false,
              trail: {
                enable: true,
                length: 4,
                fillColor: {
                  value: "#f8fafc",
                },
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
              warp: true,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: {
                min: 0.1,
                max: 0.5,
              },
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "triangle", "polygon", "star"],
              options: {
                polygon: {
                  sides: 6,
                },
                star: {
                  sides: 5,
                },
              },
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
                color: {
                  value: ["#1a365d", "#4d76b9", "#ffffff"],
                },
              },
              lines: {
                enable: true,
                frequency: 0.005,
                color: {
                  value: "#1a365d",
                },
              },
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
            rotate: {
              random: true,
              animation: {
                enable: true,
                speed: 5,
              },
            },
            zIndex: {
              random: {
                enable: true,
                minimumValue: 0,
              },
              value: 0,
              opacityRate: 1,
              sizeRate: 1,
              velocityRate: 1,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}
