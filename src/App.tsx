import { useRef, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper} from "@react-three/drei";
import { PointLight, PointLightHelper } from "three"
import { Snowflake } from './Snowflake'
import { SkyBox } from './SkyBox'
import state from './store'
import "./App.css";


function ThreeScene() {
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef, PointLightHelper, 1, "red");
  return (
    <>
    {/* <ambientLight/> */}
      {/* <pointLight ref={lightRef} position={[5, 5, 5]} intensity={4} /> */}
      <OrbitControls />
      <Snowflake />
      <SkyBox />
    </>
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e:any) =>{
    console.log(e)
    return (state.top.current = e.target.scrollTop)
  }

  // useEffect(() => void onScroll({target: scrollArea.current}), [])

  return (
    <div className="App h-screen">
      <Canvas 
      // orthographic 
        camera={{ position: [0, 0, 5] }}
        // camera={{ fov: 35, zoom: 1.3, near: 1, far: 1000 }}
      >
        <ThreeScene />
      </Canvas>
      {/* <div ref={scrollArea} onScroll={onScroll}>
          <div style={{ height: `${state.pages * 100}vh`}}></div>
      </div> */}
    </div>
  );
}

export default App;

