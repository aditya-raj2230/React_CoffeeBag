import React, { useRef, useEffect, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

export function CoffeeOBJ(props) {
  const meshRef = useRef()
  const [geometry, setGeometry] = useState(null)
  const [material, setMaterial] = useState(null)
  
  // Load OBJ and setup geometry
  useEffect(() => {
    const objLoader = new OBJLoader()
    objLoader.load('/Coffee OBJ.obj', (obj) => {
      obj.traverse((child) => {
        if (child.isMesh) {
          const geo = child.geometry.clone()
          geo.center()
          setGeometry(geo)
        }
      })
    })
  }, [])

  // Setup material and texture
  useEffect(() => {
    const texLoader = new THREE.TextureLoader()
    const texture = texLoader.load('/Pack2.png')
    
    const newMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      metalness: 0,
      roughness: 0.1,
    })
    
    setMaterial(newMaterial)
  }, [])

  // Animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Only render when both geometry and material are ready
  if (!geometry || !material) return null

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      scale={0.35}
      rotation={[0, Math.PI / 2, 0]}
      castShadow
      receiveShadow
      {...props}
    />
  )
}

export default CoffeeOBJ
