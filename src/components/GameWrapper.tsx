import React, { useState } from "react";
import GameEngine from "./GameEngine";
import SceneRegistrar from "./SceneRegistrar";
import MainMenuHandler from "./MainMenuHandler";
import Modal from "./Modal";

const GamePage: React.FC = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <GameEngine initialScene="GameStart">
    <SceneRegistrar />
    {showMenu && (
      <MainMenuHandler onStart={() => setShowMenu(false)} />
    )}
    <Modal />
  </GameEngine>
  );
};

export default GamePage;
