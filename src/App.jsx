import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      availableVoices.forEach((voice) => {
        console.log(`${voice.name} (${voice.lang})`);
      });
      setVoices(availableVoices);
      
      const hardcodedVoiceName = 'Google UK English Male'; 
      const voice = availableVoices.find(voice => voice.name === hardcodedVoiceName);
      setSelectedVoice(voice || availableVoices[0]); // Fallback to the first voice if hardcoded voice is not found
    };

    populateVoices();
    speechSynthesis.onvoiceschanged = populateVoices;
  }, []);

  const speakText = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
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
        <Experience isSpeaking={isSpeaking} />
      </Canvas>

      <form onSubmit={handleSubmit} style={{ position: "relative", left:"200px", top: "100px", display:"flex", flexDirection:"column" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type text to make the avatar speak..."
          style={{ height: "20px", width: "200px", padding: "20px", marginTop:"10px" }}
        />
        <button type="submit" style={{ height: "30px", width: "100px", marginTop:"10px", cursor:"pointer" }}>Speak</button>
      </form>
    </>
  );
}

export default App;
