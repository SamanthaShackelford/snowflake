import ReactDOM from "react-dom"
import React from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Sky, OrbitControls } from "@react-three/drei";
import { Block, useBlock } from "./blocks"
import { Plane } from './components/Cross'
import { colors } from './colors'
import { Snowflake } from "./components/Snowflake";
import { SkyBox } from './components/SkyBox'
import { PictureFrame3 } from './components/PictureFrame3'
import "./app.css"

function Content({ left, children, color = colors.blueLight }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane 
        scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} 
        color={color} 
      />
      {children}
    </group>
  )
}


export default function App() {
  // const scrollArea = useRef()
  // const onScroll = (e) => (state.top.current = e.target.scrollTop)
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas 
        // orthographic
        // camera={{ zoom: state.zoom, position: [0, 0, 500] }}

        // shadows 
        // dpr={[1, 2]} 
        camera={{ position: [0, 0, 60], fov: 12 }}
      >
        {/* <Snow count={1}/> */}
        {/* <Sky
          distance={30} // Camera distance (default=450000)
          // sunPosition={[0, 20, 0]} // Sun position normal (default=[0, 1, 0])
          // distance={450000}
          sunPosition={[10, 10, 20]}
          // inclination={0}
          // azimuth={0.25}
        /> */}

        <OrbitControls 
          enabled={true} 
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
        />
        <SkyBox />

        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left color='white'>
            <Text color="black" anchorX="center" anchorY={-1.3} font='../public/fonts/campton-light.otf' fontSize={.4} position={[0, 0, 1]}>
              We want to wish you
            </Text>
            <Text color="black" anchorX="center" anchorY="middle" font='../public/fonts/christmas-squad.otf' fontSize={1.3} position={[0, 0, 1]}>
              Happy Holidays!
            </Text>
            <Text color="black" anchorX="center" anchorY={1} font='../public/fonts/campton-light.otf' fontSize={.3} position={[0, 0, 1]}>
              from Echobind
            </Text>
            <Snowflake position={[0, 5, 3]}/>
            <PictureFrame3 scale={[.2, .2, .2]} position={[0, -5, 3]}/>
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




      {/* <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div> */}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
