import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import React, { useState } from "react";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import SlotNode from "three/examples/jsm/renderers/webgl/nodes/SlotNode.js";

function App1() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pollyClient = new PollyClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIAWX2IF4Y5DYS5PB7H",
      secretAccessKey: "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",
    },
  });

  const speakText = async (text) => {
    setIsSpeaking(true);
    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Matthew",
    });

    console.log(text);

    try {
      const data = await pollyClient.send(command);
      console.log(data);

      const audioChunks = [];
      for await (const chunk of data.AudioStream) {
        audioChunks.push(chunk);
      }
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);

      // Play the audio
      const audio = new Audio(url);
      audio.play();

      audio.onended = () => {
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error("Error synthesizing speech:", error);
      setIsSpeaking(false);
    }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Using with Amazon Polly text-speech API
        </h1>
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 25 }}
          style={{
            height: "300px",
            width: "350px",
            position: "relative",
            left: "200px",
            top: "100px",
          }}
        >
          <color attach="background" args={["#ececec"]} />
          <Experience isSpeaking={isSpeaking} />
        </Canvas>

        <form
          onSubmit={handleSubmit}
          style={{
            position: "relative",
            left: "200px",
            top: "100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type text to make the avatar speak..."
            style={{
              height: "20px",
              width: "200px",
              padding: "20px",
              marginTop: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              height: "30px",
              width: "100px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Speak
          </button>
        </form>
      </div>
    </>
  );
}

export default App1;
