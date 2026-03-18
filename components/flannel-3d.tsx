'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Pearl({ position, scale = 0.08 }: { position: [number, number, number], scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // Subtle sparkle via emissive intensity variation
            const material = meshRef.current.material as THREE.MeshStandardMaterial
            material.emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 3 + position[0] * 10) * 0.2
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[scale, 16, 16]} />
            <meshStandardMaterial
                color="#f5f5f5"
                metalness={0.9}
                roughness={0.1}
                emissive="#ffffff"
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

function FlannelShirt({ mousePos }: { mousePos: React.RefObject<{ x: number; y: number }> }) {
    const groupRef = useRef<THREE.Group>(null)
    const shirtRef = useRef<THREE.Mesh>(null)

    // Generate pearl positions scattered across the shirt
    const pearlPositions = useMemo(() => {
        const positions: [number, number, number][] = []
        for (let i = 0; i < 40; i++) {
            positions.push([
                (Math.random() - 0.5) * 1.8,
                (Math.random() - 0.5) * 2.2 + 0.3,
                0.15 + Math.random() * 0.1
            ])
        }
        return positions
    }, [])

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.3

            // Tilt toward mouse on hover
            if (mousePos.current) {
                groupRef.current.rotation.x = THREE.MathUtils.lerp(
                    groupRef.current.rotation.x,
                    mousePos.current.y * 0.15,
                    0.05
                )
                groupRef.current.rotation.z = THREE.MathUtils.lerp(
                    groupRef.current.rotation.z,
                    -mousePos.current.x * 0.1,
                    0.05
                )
            }
        }
    })

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
        >
            <group ref={groupRef} scale={1.3}>
                {/* Main shirt body - torso */}
                <mesh ref={shirtRef} position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2.5, 0.3]} />
                    <MeshDistortMaterial
                        color="#2a2520"
                        metalness={0.1}
                        roughness={0.8}
                        distort={0.05}
                        speed={2}
                    />
                </mesh>

                {/* Plaid pattern overlay - horizontal stripes */}
                {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => (
                    <mesh key={`h-${i}`} position={[0, y, 0.16]}>
                        <boxGeometry args={[2.01, 0.08, 0.01]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#1a1815" : "#3d3530"}
                            metalness={0.05}
                            roughness={0.9}
                        />
                    </mesh>
                ))}

                {/* Plaid pattern - vertical stripes */}
                {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
                    <mesh key={`v-${i}`} position={[x, 0, 0.16]}>
                        <boxGeometry args={[0.1, 2.51, 0.01]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#4a4035" : "#1a1815"}
                            metalness={0.05}
                            roughness={0.9}
                        />
                    </mesh>
                ))}

                {/* Left sleeve */}
                <mesh position={[-1.3, 0.3, 0]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.8, 1.8, 0.25]} />
                    <MeshDistortMaterial
                        color="#2a2520"
                        metalness={0.1}
                        roughness={0.8}
                        distort={0.03}
                        speed={1.5}
                    />
                </mesh>

                {/* Right sleeve */}
                <mesh position={[1.3, 0.3, 0]} rotation={[0, 0, -0.3]}>
                    <boxGeometry args={[0.8, 1.8, 0.25]} />
                    <MeshDistortMaterial
                        color="#2a2520"
                        metalness={0.1}
                        roughness={0.8}
                        distort={0.03}
                        speed={1.5}
                    />
                </mesh>

                {/* Collar left */}
                <mesh position={[-0.25, 1.35, 0.1]} rotation={[0.2, 0, 0.3]}>
                    <boxGeometry args={[0.5, 0.35, 0.15]} />
                    <meshStandardMaterial color="#2a2520" metalness={0.1} roughness={0.8} />
                </mesh>

                {/* Collar right */}
                <mesh position={[0.25, 1.35, 0.1]} rotation={[0.2, 0, -0.3]}>
                    <boxGeometry args={[0.5, 0.35, 0.15]} />
                    <meshStandardMaterial color="#2a2520" metalness={0.1} roughness={0.8} />
                </mesh>

                {/* Buttons */}
                {[-0.6, -0.2, 0.2, 0.6, 1.0].map((y, i) => (
                    <mesh key={`btn-${i}`} position={[0, y, 0.17]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.5} />
                    </mesh>
                ))}

                {/* VACE label at collar */}
                <mesh position={[0, 1.15, 0.16]}>
                    <boxGeometry args={[0.4, 0.15, 0.02]} />
                    <meshStandardMaterial color="#c9a962" metalness={0.2} roughness={0.6} />
                </mesh>

                {/* Pearls scattered across the fabric */}
                {pearlPositions.map((pos, i) => (
                    <Pearl key={i} position={pos} scale={0.04 + Math.random() * 0.03} />
                ))}

                {/* Distress marks / cuts */}
                {[
                    [-0.5, -0.3, 0.16],
                    [0.4, 0.5, 0.16],
                    [-0.3, 0.8, 0.16],
                ].map((pos, i) => (
                    <mesh key={`dist-${i}`} position={pos as [number, number, number]} rotation={[0, 0, Math.random() * 0.5]}>
                        <boxGeometry args={[0.3, 0.02, 0.01]} />
                        <meshStandardMaterial color="#1a1512" metalness={0} roughness={1} />
                    </mesh>
                ))}
            </group>
        </Float>
    )
}

function Scene() {
    const mousePos = useRef({ x: 0, y: 0 })
    const { viewport } = useThree()

    return (
        <>
            <ambientLight intensity={0.3} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1.5}
                color="#ffffff"
            />
            <spotLight
                position={[-5, 3, 5]}
                angle={0.4}
                penumbra={1}
                intensity={0.8}
                color="#CC0000"
            />
            <pointLight position={[0, -3, 3]} intensity={0.5} color="#f5f0e6" />

            <FlannelShirt mousePos={mousePos} />

            <Environment preset="studio" />

            {/* Invisible plane to capture mouse movement */}
            <mesh
                position={[0, 0, 2]}
                onPointerMove={(e) => {
                    mousePos.current = {
                        x: (e.point.x / viewport.width) * 2,
                        y: (e.point.y / viewport.height) * 2,
                    }
                }}
                onPointerLeave={() => {
                    mousePos.current = { x: 0, y: 0 }
                }}
            >
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial visible={false} />
            </mesh>
        </>
    )
}

export default function Flannel3D() {
    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[600px]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
