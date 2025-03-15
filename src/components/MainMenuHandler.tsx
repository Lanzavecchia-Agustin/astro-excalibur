import React from "react";
import { useEngine } from "./GameEngine";
import MainMenuUI from "./MainMenuUI";

interface MainMenuHandlerProps {
  onStart: () => void;
}

const MainMenuHandler: React.FC<MainMenuHandlerProps> = ({ onStart }) => {
  const engine = useEngine();

  const handleStart = () => {
    if (engine) {
      engine.goToScene("SimpleLevel");
    }
    onStart();
  };

  return <MainMenuUI onStart={handleStart} />;
};

export default MainMenuHandler;
