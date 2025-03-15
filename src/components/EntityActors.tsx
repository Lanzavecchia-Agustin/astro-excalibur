// src/components/EntityActors.tsx
import React, { useEffect } from "react";
import { useGameStore } from "store/GameStore";
import { useEngine } from "./GameEngine";
import { EntityActor } from "./actors/EntityActor";
import * as ex from "excalibur";

const EntityActors: React.FC = () => {
  const engine = useEngine();
  const entities = useGameStore((state) => state.player.entities);

  useEffect(() => {
    if (!engine) return;
    const actors: ex.Actor[] = [];
    // Posicionar los actores en una fila en la parte inferior
    const spacing = 120;
    entities.forEach((entity, index) => {
      const pos = ex.vec(100 + index * spacing, engine.drawHeight - 150);
      const actor = new EntityActor(entity, pos);
      engine.add(actor);
      actors.push(actor);
    });
    return () => {
      actors.forEach((actor) => engine.remove(actor));
    };
  }, [engine, entities]);

  return null;
};

export default EntityActors;
