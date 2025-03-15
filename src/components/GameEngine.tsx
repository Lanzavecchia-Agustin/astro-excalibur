// src/components/GameEngine.tsx
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import * as ex from "excalibur";

// Creamos un contexto para exponer el engine
const EngineContext = createContext<ex.Engine | null>(null);
export const useEngine = () => useContext(EngineContext);

interface GameEngineProps {
  initialScene?: string;
  children?: React.ReactNode;
}

const GameEngine: React.FC<GameEngineProps> = ({ initialScene, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<ex.Engine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inicializa el motor con algunas opciones
    const game = new ex.Engine({
      canvasElement: canvasRef.current,
      backgroundColor: ex.Color.fromHex("#54C0CA"),
      pixelArt: true,
      pixelRatio: 2,
      displayMode: ex.DisplayMode.FitScreen,
      // Opcional: puedes definir width/height o que se ajuste al viewport
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Inicia el motor y, cuando esté listo, cambia a la escena inicial (si se ha definido)
    game.start().then(() => {
      console.log("🚀 Engine started");
      if (initialScene) {
        game.goToScene(initialScene);
      }
    });
    setEngine(game);

    return () => {
      game.stop();
    };
  }, [initialScene]);

  return (
    <EngineContext.Provider value={engine}>
      {/* El canvas se muestra a pantalla completa */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {/* Los overlays de UI se renderizan sobre el canvas */}
      <div className=" pointer-events-none">{children}</div>
    </EngineContext.Provider>
  );
};

export default GameEngine;
