// src/components/WaterDroplet.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Container3D = styled.div`
  perspective: 1000px;
  perspective-origin: 50% 50%;
  margin: 40px auto;
`;

const DropletContainer = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 350px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  &:hover {
    transform: rotateY(5deg) rotateX(-5deg);
  }
`;

const DropletShape = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;

  /* Main glass effect */
  &:before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 51%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotateZ(-20deg);
    pointer-events: none;
    z-index: 3;
  }

  /* Secondary highlight for 3D effect */
  &:after {
    content: "";
    position: absolute;
    top: 40%;
    right: -20%;
    width: 40%;
    height: 40%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
    border-radius: 50%;
    transform: rotateZ(20deg);
    pointer-events: none;
    z-index: 2;
  }
`;

// Edge highlight for 3D effect
const DropletEdge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 0 0 4px rgba(52, 152, 219, 0.1), 0 5px 15px rgba(52, 152, 219, 0.2);
  pointer-events: none;
  z-index: 4;
`;

// Water fill with 3D effect
const WaterFill = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${(props) => props.fillPercentage}%;
  background: linear-gradient(
    180deg,
    rgba(116, 185, 255, 0.9) 0%,
    rgba(9, 132, 227, 0.95) 100%
  );
  border-radius: 0 0 100px 100px;
  transform-style: preserve-3d;
  transform: translateZ(2px);
  filter: drop-shadow(0 0 8px rgba(9, 132, 227, 0.3));
  transition: height 1s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
`;

// Water surface with more realistic 3D wave effect
const WaterSurface = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 15px;
  overflow: hidden;
  z-index: 5;
  transform: translateZ(5px);
`;

// Wave shapes
const WaveShape = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(116, 185, 255, 0.3) 50%,
    rgba(9, 132, 227, 0.1) 100%
  );
  border-radius: 100%;
  left: -50%;
  top: -10px;
`;

// 3D wave depth effect
const WaveDepth = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(9, 132, 227, 0.5) 0%,
    rgba(9, 132, 227, 0.2) 50%,
    rgba(9, 132, 227, 0) 100%
  );
  border-radius: 100%;
  left: -50%;
  top: 0;
  filter: blur(3px);
`;

// Bubbles
const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.8),
    0 0 5px rgba(255, 255, 255, 0.3);

  /* 3D highlight on bubbles */
  &:after {
    content: "";
    position: absolute;
    width: 30%;
    height: 30%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    top: 20%;
    left: 20%;
  }
`;

// Reflection strip on the water surface
const WaterReflection = styled(motion.div)`
  position: absolute;
  width: 60%;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  top: 30%;
  left: 20%;
  transform: rotate(-30deg);
  filter: blur(1px);
`;

const PercentageText = styled(motion.div)`
  position: relative;
  z-index: 10;
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => (props.fillPercentage > 50 ? "white" : "#3498db")};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transform: translateZ(10px); /* Pop text forward for 3D effect */
  transition: color 0.5s ease;
`;

const InfoText = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #555;
  font-weight: 500;
`;

const WaterDroplet = ({ currentIntake, dailyTarget }) => {
  const fillPercentage = (currentIntake / dailyTarget) * 100;
  const cappedPercentage = Math.min(fillPercentage, 100);
  const waterControls = useAnimation();

  // Create bubbles array (only when water is present)
  const bubbles =
    cappedPercentage > 0
      ? Array.from({ length: 7 }).map((_, i) => ({
          id: i,
          size: Math.random() * 10 + 5, // 5-15px
          left: Math.random() * 80 + 10, // 10-90%
          delay: Math.random() * 4, // 0-4s delay
          duration: Math.random() * 4 + 2, // 2-6s duration
        }))
      : [];

  useEffect(() => {
    // Animate water movement
    waterControls.start({
      y: [0, 5, 0, -5, 0],
      rotateX: [0, 1, 0, -1, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      },
    });
  }, [waterControls]);

  return (
    <div>
      <Container3D>
        <DropletContainer
          animate={{
            rotateY: [-1, 1, -1],
            rotateX: [1, -1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <DropletShape>
            <WaterFill
              fillPercentage={cappedPercentage}
              initial={{ height: 0 }}
              animate={{
                height: `${cappedPercentage}%`,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <motion.div
                animate={waterControls}
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                {/* Water surface waves */}
                <WaterSurface>
                  <WaveShape
                    animate={{
                      x: [0, -30, 0, 30, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <WaveDepth
                    animate={{
                      x: [0, 20, 0, -20, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                  />
                </WaterSurface>

                {/* 3D Water reflections */}
                <WaterReflection
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    width: ["60%", "40%", "60%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />

                {/* Bubbles */}
                {cappedPercentage > 0 &&
                  bubbles.map((bubble) => (
                    <Bubble
                      key={bubble.id}
                      style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: `${bubble.left}%`,
                        bottom: "5%",
                      }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        y: [0, -(Math.random() * cappedPercentage) - 20],
                        x: [0, Math.random() * 10 - 5],
                      }}
                      transition={{
                        delay: bubble.delay,
                        duration: bubble.duration,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 3,
                      }}
                    />
                  ))}
              </motion.div>
            </WaterFill>

            <DropletEdge />

            <PercentageText
              fillPercentage={cappedPercentage}
              animate={{
                scale: [1, 1.03, 1],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              {Math.round(cappedPercentage)}%
            </PercentageText>
          </DropletShape>
        </DropletContainer>
      </Container3D>

      <InfoText>
        {currentIntake} / {dailyTarget} ml
      </InfoText>
    </div>
  );
};

export default WaterDroplet;
