import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
// import Random from 'canvas-sketch-util/random';

// W O R K   I N   P R O G R E S S

const addSnowflakes = (numSnowflakes, positions, velocities, maxRange, minRange, minHeight) => {
  for(let i = 0; i < numSnowflakes; i++) {
    positions.push(
      Math.floor(Math.random() * maxRange - minRange), // x -500 to 500
      Math.floor(Math.random() * minRange + minHeight), // y 250 to 750
      Math.floor(Math.random() * maxRange - minRange) // z -500 to 500
    )
    velocities.push(
      Math.floor(Math.random() * 6 - 3) * 0.1, // x -0.3 to 0.3
      Math.floor(Math.random() * 5 + 0.12) * 0.18, // y 0.02 to 0.92
      Math.floor(Math.random() * 6 - 3) * 0.1 // z -0.3 to 0.3
    )
  }
 }


export function Snow({ count }) {
  // THREE.JS EXAMPLE
  let particles1; //snowflakes
  let positions = [] // snowflake positions (x, y, z)
  let velocities = [] // snowflake velocities (x, y, z)

  // const numSnowflakes = 15000;

  const maxRange = 1000;
  const minRange = maxRange / 2; // snowflakes placed from -500 to 500 x and z axis
  const minHeight = 150 // snowflakes places from 150 to 500 on the y axis

  // BufferGeometry stores data as array with individual attributes (position, color, size, faces, etc)
  const geometry = new THREE.BufferGeometry();
  // console.log('geometry', geometry)
  const textureLoader = new THREE.TextureLoader();

  // addSnowflakes(numSnowflakes, positions, velocities, maxRange, minRange, minHeight);

  // each attribute has an array pf values
  //                    name                                         object    itemSize (x, y, z) vector
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3))


  // Create snowflake material
  const flakeMaterial = new THREE.PointsMaterial({
    size: 4,
    map: textureLoader.load("/snowflakeSprites/snowflake1.png"),
    blending: THREE.AdditiveBlending, // add RGB values when combining two colors
    depthTest: false, // determines if one object is in front of another
    transparent: true, // enable opacity changes to work
    opacity: 0.7
  })

  particles1 = new THREE.Points(geometry, flakeMaterial)
  // scene.add(particles1)
  // How do i translate all of this???

  // animate();
  
  function animate() {
    requestAnimationFrame( animate )
    // orbitControls.update();
    updateParticles();  // update position of snowflakes
    renderer.render(scene, camera);
  }

  // END OF THREE.JS EXAMPLE












  // REACT THREE FIBER PARTICLE EXAMPLE BELOW (TRANSLATING 3.JS SNOW EXAMPLE INTO IT)
  const mesh = useRef();
  const light = useRef();

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const maxRange = 2;
      const minRange = maxRange / 2; // snowflakes placed from -500 to 500 x and z axis
      const minHeight = 5 // snowflakes places from 150 to 500 on the y axis
      // Position Vector
      const px = Math.floor(Math.random() * maxRange - minRange); // x -500 to 500
      const py = Math.floor(Math.random() * minRange + minHeight); // y 250 to 750
      const pz = Math.floor(Math.random() * maxRange - minRange); // z -500 to 500
      
      console.log('i', i)
      console.log('px', px)
      console.log('py', py)
      console.log('pz', pz)

      // Velocity Vecotr
      const vx = Math.floor(Math.random() * 6 - 3) * 0.1; // x -0.3 to 0.3
      const vy = Math.floor(Math.random() * 5 + 0.12) * 0.18; // y 0.02 to 0.92
      const vz = Math.floor(Math.random() * 6 - 3) * 0.1; // z -0.3 to 0.3
      
      // time, factor, speed = temporary?
      const time = Math.random(0, 100);
      const factor = Math.random(20, 120);
      const speed = Math.random((0.01, 0.015) / 2);

      // const time = Math.random(0, 100);
      // const factor = Math.random(20, 120);
      // const speed = Math.random((0.01, 0.015) / 2);
      // const x = Math.random(-50, 50);
      // const y = Math.random(-50, 50);
      // const z = Math.random(-50, 50);
      temp.push({ time, factor, speed, px, py, pz });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, px, py, pz } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        // px + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        // py + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        // pz + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        px -= 2,
        py -= 3,
        pz -= 1
        // px,
        // py,
        // pz
      );

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      // const s = Math.cos(t);
      // dummy.scale.set(s, s, s);
      // dummy.rotation.set(s * 5, s * 5, s * 5);
      // dummy.position.set(px - 1, py - 1, pz - 1);
      dummy.updateMatrix();

      console.log('index', index)
      console.log('dummy', dummy)

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);

      mesh.current.position.y = (py - 0.1 * delta)
      // mesh.current.position.y = (px - 1)

        // py - 1, pz - 1)
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });





  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" position={[0, 0, 100]} />
      <instancedMesh 
        ref={mesh} 
        args={[null, null, count]} // args = geometry, material, count
        position={[0, 0, 100]}
      >
        <dodecahedronBufferGeometry args={[0.2, 0]} /> // args = radius, detail
        <meshPhongMaterial color="white" />
      </instancedMesh>
    </>
  );
}
