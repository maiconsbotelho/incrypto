"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const NUM_POINTS = 100;
const CONNECT_DISTANCE = 2;

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    return Array.from({ length: NUM_POINTS }, () => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    }));
  }, []);

  useFrame(() => {
    const positions: number[] = [];

    particles.forEach((particle) => {
      particle.position.add(particle.velocity);

      // Rebater nas "paredes" invisíveis
      ["x", "y", "z"].forEach((axis) => {
        const key = axis as "x" | "y" | "z";
        if (Math.abs(particle.position[key]) > 5) {
          particle.velocity[key] *= -1;
        }
      });

      positions.push(particle.position.x, particle.position.y, particle.position.z);
    });

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      posAttr.array.set(positions);
      posAttr.needsUpdate = true;
    }

    // Atualiza linhas
    const linePositions = [];

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i].position;
        const b = particles[j].position;

        const dist = a.distanceTo(b);
        if (dist < CONNECT_DISTANCE) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    if (linesRef.current) {
      linesRef.current.geometry.dispose();
      linesRef.current.geometry = lineGeometry;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(particles.flatMap((p) => [p.position.x, p.position.y, p.position.z])), 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#00ffc3" size={0.05} sizeAttenuation transparent />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00ffc3" transparent opacity={0.2} />
      </lineSegments>
    </>
  );
}

export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#821ac7] to-[#010324]">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Network />
      </Canvas>
    </div>
  );
}
