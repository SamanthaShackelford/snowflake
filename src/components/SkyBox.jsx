import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load(["sky-cube-map/px.png", "sky-cube-map/nx.png", "sky-cube-map/py.png", "sky-cube-map/ny.png", "sky-cube-map/pz.png", "sky-cube-map/nz.png"])
  scene.background = texture;
  
  return null
}