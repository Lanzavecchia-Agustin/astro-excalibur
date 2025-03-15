// src/components/SceneRegistrar.tsx
import React, { useEffect } from "react";
import { useEngine } from "./GameEngine";
import { SimpleLevel } from "../scenes/SimpleLevel";

const SceneRegistrar: React.FC = () => {
  const engine = useEngine();

  useEffect(() => {
    if (!engine) return;
    // Crear instancias de las escenas
    const simpleLevelScene = new SimpleLevel();

    // Registrar las escenas en el engine
    engine.addScene("SimpleLevel", simpleLevelScene);
    console.log("✅ Scenes registered: GameStart and SimpleLevel");

    // Cambiar a la escena de inicio
    engine.goToScene("GameStart");
  }, [engine]);

  return null;
};

export default SceneRegistrar;
