import ReactDOM from "react-dom"
import React, { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Sky, OrbitControls } from "@react-three/drei";
import { Block } from "./components/blocks"
import { SnowflakeAnim } from './components/Cross'
import { PictureFrame } from './components/Pictureframe'
import { Content } from './components/Content'
import state from "./store"
import { colors } from './colors'
import './App.css'



export default function App() {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <div style={{
      top: 0,
      left: 0,
      display: "grid",
      alignItems: "center",
      justifyContent: "center",
      gridTemplateRows: "auto auto",
      // gridTemplateColumns: "auto auto",
      // height: '1200px',
      height: '100%',
      // overflow: 'scroll'
    }}>

      <Canvas 
        style={{ 
          gridRow: 1, 
          height: '100vh', 
          width: '100vw' 
        }}
        orthographic 
        camera={{ 
          zoom: state.zoom, 
          position: [0, 0, 500] 
        }}
      >
        <Sky
          distance={30} // Camera distance (default=450000)
          sunPosition={[10, 10, 20]}
        />

        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left color='transparent'>
            <Text color="black" anchorX="center" anchorY={-1.3} font='../public/fonts/campton-light.otf' fontSize={.4}>
              We want to wish you
            </Text>
            <Text color="black" anchorX="center" anchorY="middle" font='../public/fonts/christmas-squad.otf' fontSize={1.3}>
              Happy Holidays!
            </Text>
            <Text color="black" anchorX="center" anchorY={1} font='../public/fonts/campton-light.otf' fontSize={.3}>
              from Echobind
            </Text>
            <SnowflakeAnim />
          </Content> 
        </Block>

        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content />
        </Block>

        {/* Last section */}
        <Block factor={1.5} offset={2}>
          <Content left />

        </Block>
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh`,  border: '10px solid red' }} />
      </div>

      <Canvas 
        style={{
          border: '10px solid pink', 
          gridRow: 3,
          height: '100vh', 
          width: '100vw',
        }}
        camera={{ 
          position: [0, 0, 50] 
        }}
      >
        <Sky sunPosition={[10, 10, 20]} />
        <Text color="black" anchorX="center" anchorY={-1.3} font='../public/fonts/campton-light.otf' fontSize={.4}>
          HELLLOOOOO
        </Text>
        <OrbitControls enableZoom={false} />
        <PictureFrame />
      </Canvas>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
