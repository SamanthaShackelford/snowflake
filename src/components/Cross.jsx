import * as THREE from "three"
import { useRef } from 'react'
import { useBlock } from "../blocks"
import { useFrame } from '@react-three/fiber'
import state from '../store'
import { Snowflake } from "./Snowflake"

export function Stripe() {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane 
      scale={[100, contentMaxWidth, 1]} 
      rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} 
      color="#0087A9" 
      // color="#9B2F47" 
    />
  )
}

export function Plane({ color = "white", ...props }) {
  return (
    <mesh {...props}>
      {/* <pointLight position={[5, 5, 5]} />
      <RoundedBox args={[3, 3, 0.25]} radius={0.1}> 
        <meshLambertMaterial attach="material" color={color} />
      </RoundedBox> */}
      <planeGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export function SnowflakeAnim() {
  const ref = useRef()
  const { viewportHeight } = useBlock()
  useFrame(() => {
    const curTop = state.top.current
    // console.log('snowflake curTop state.top.current:', curTop)
    const curY = ref.current.rotation.z
    // console.log('snowflake curY:', curY)
    const nextY = (curTop / ((state.pages - 1) * viewportHeight * state.zoom)) * Math.PI
    // console.log('snowflake nextY:', nextY)
    
    // This animated the snowflake (original)
    // ref.current.rotation.z = THREE.MathUtils.lerp(curY, nextY, 0.1)
    
    
    
    ref.current.position.y = -curTop / 45
    // ref.current.position.y = -50
    
    
    ref.current.rotation.z = THREE.MathUtils.lerp(curY, nextY, 0.1)
    
    // My additions
    // ref.current.rotation.x = THREE.MathUtils.lerp(curY, nextY, 1)
    ref.current.rotation.y = THREE.MathUtils.lerp(curY, nextY, 1)

    // console.log('ref.current.rotation.y', ref.current.rotation.y)

    // ref.current.position.y = 

    // if(curTop === 0) {
    //   ref.current.position.y = 0
    //   // ref.current.position.y = -curTop / 40
    // } else if (curTop >= 1000) {
    //   ref.current.position.y = -curTop / 40
    // }
  })
  return (
    <group ref={ref} scale={[1.5, 1.5, 1.5]} position={[0.5, 0, 0.1]}>
      <Snowflake/>
      {/* <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
      <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" /> */}
    </group>
  )
}

