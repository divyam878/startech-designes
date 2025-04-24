'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

const Moon = () => {
  const moonRef = useRef(null)
  const { viewport } = useThree()
  const moonTexture = useTexture('/moon-texture.jpg')
  const normalMap = useTexture('/moon-normal.jpg')
  const roughnessMap = useTexture('/moon-texture.jpg')
  const gradientTexture = useTexture('/radial-gradient.png')

  // Calculate responsive scale based on viewport
  const scale = Math.min(viewport.width, viewport.height) * 0.2

  useFrame((state) => {
    if (!moonRef.current) return
    const mouseX = (state.mouse.x * Math.PI) / 8
    const mouseY = (state.mouse.y * Math.PI) / 8
    
    moonRef.current.rotation.x += (mouseY - moonRef.current.rotation.x) * 0.05
    moonRef.current.rotation.y += (mouseX - moonRef.current.rotation.y) * 0.05
  })

  return (
    <group scale={scale}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      
      {/* Add rim light for crater definition */}
      <pointLight position={[-5, 5, 3]} intensity={0.3} />

      {/* Enhanced shadow layers */}
      <group position={[0, 0, -2]}>
        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial 
            map={gradientTexture}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[16, 16]} />
          <meshBasicMaterial 
            map={gradientTexture}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0.4, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial 
            map={gradientTexture}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial 
            map={gradientTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={moonRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.8, 256, 256]} />  {/* Reduced radius from 2 to 1.5 */}
        <meshPhysicalMaterial 
          map={moonTexture}
          normalMap={normalMap}
          normalScale={[3.5, 3.5]}
          roughnessMap={roughnessMap}
          roughness={0.98}
          metalness={0.01}
          clearcoat={0.05}
          clearcoatRoughness={0.8}
          reflectivity={0.1}
          displacementMap={normalMap}
          displacementScale={0.15}
          bumpMap={normalMap}
          bumpScale={0.15}
        />
      </mesh>
    </group>
  )
}

export default Moon