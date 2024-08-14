import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar1 } from "./Avatar1";
import "./App.css";
import { useThree } from "@react-three/fiber";

export const Experience = ({ isSpeaking }) => {
  const texture = useTexture("textures/images.jpeg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls enabled = {false}/>
      <mesh>
      {/* <mesh scale={[viewport.width, viewport.height, 1]}> */}
        <planeGeometry args={[viewport.width, viewport.height]} />
        {/* <planeGeometry args={[1, 1]} /> */}
        <meshBasicMaterial map={texture} />
      </mesh>

      

      <Avatar1 position={[0, -3, 5]} scale={2} isSpeaking={isSpeaking} />
      <Environment preset="sunset" />
    </>
  );
};
