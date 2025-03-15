// src/components/UI/MainMenuUI.tsx
import React from "react";

interface MainMenuUIProps {
  onStart: () => void;
}

const MainMenuUI: React.FC<MainMenuUIProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 pointer-events-auto">
      <div className="bg-gray-800 p-8 rounded shadow text-center text-white">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido al Juego!</h1>
        <button
          onClick={onStart}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded"
        >
          Comenzar Juego
        </button>
      </div>
    </div>
  );
};

export default MainMenuUI;
