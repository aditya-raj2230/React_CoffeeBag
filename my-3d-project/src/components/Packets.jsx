import React, { useRef, useEffect, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

export function Packets(props) {
  const meshRef = useRef()
  const [model, setModel] = useState(null)
  
  // Combine geometry and material loading into a single useEffect
  useEffect(() => {
    const objLoader = new OBJLoader()
    const texLoader = new THREE.TextureLoader()
    
    // Load texture first
    const texture = texLoader.load('/E:/React_CoffeeBag/my-3d-project/src/Coffee/Textures/Kercha.png')
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      metalness: 0.2,
      roughness: 0.005,
      envMapIntensity: 1.5,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.1,
    })

    // Then load OBJ with the prepared material
    objLoader.load('E:/React_CoffeeBag/my-3d-project/src/Coffee/Packets.obj', (obj) => {
      obj.traverse((child) => {
        if (child.isMesh) {
          const geo = child.geometry.clone()
          geo.center()
          child.material = material
          setModel({ geometry: geo, material })
        }
      })
    })

    // Cleanup function
    return () => {
      texture.dispose()
      material.dispose()
    }
  }, [])

  // Animation with useFrame for better performance
  const rotationSpeed = 1.0 // Increased from 0.2 for more noticeable rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  if (!model) return null

  return (
    <mesh
      ref={meshRef}
      geometry={model.geometry}
      material={model.material}
      scale={0.35}
      rotation={[0, Math.PI / 2, 0]}
      castShadow
      receiveShadow
      {...props}
    />
  )
}

export default Packets
