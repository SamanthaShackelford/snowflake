import React from "react";
import { useGLTF, useCubeTexture } from "@react-three/drei";

export function PictureFrame3(props) {
  const { nodes, materials } = useGLTF("/pictureframe3.glb");
    const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "sky-cube-map/"}
  )

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.picture_frame002.geometry}
        material={materials.frame}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.picture_glass001.geometry}
        material={materials.glass}
        position={[0, 0, 0.07]}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["matte-back"].geometry}
        material={materials["Material.001"]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[1, 1, 1.6]}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.picture_matte001.geometry}
        material={materials.matte}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.picture_photo001.geometry}
        material={materials.photo}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.picture_glass003.geometry}
        material={materials["glass.001"]}
        position={[0, 0, 0.07]}
      >
        <meshBasicMaterial envMap={texture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/pictureframe3.glb");
