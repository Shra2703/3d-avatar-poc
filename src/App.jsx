import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Avatar1 } from "./components/Avatar1";
import React, { useState } from "react";
// import phoneme from 'phoneme';

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    speakText(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      speakText(text);
      setText("");
    }
  };
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 25 }}
        style={{ height: "300px", width: "350px", position: "relative", left:"200px", top: "100px"}}
      >
        <color attach="background" args={["#ececec"]} />
        <Experience isSpeaking={isSpeaking}/>
      </Canvas>

      <form onSubmit={handleSubmit} style={{ position: "relative", left:"200px", top: "100px", display:"flex", flexDirection:"column"}}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type text to make the avatar speak..."
          style={{ height: "20px", width: "200px", padding: "20px",
            marginTop:"10px"
          }}
        />
        <button type="submit" style={{ height: "30px", width: "100px", marginTop:"10px", cursor:"pointer"
          }}>Speak</button>
      </form>
    </>
  );
}

export default App;
