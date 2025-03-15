// src/scenes/SimpleLevel.ts
import * as ex from "excalibur";
import { vec } from "excalibur";
import { useGameStore } from "store/GameStore";
import { EntityActor } from "components/actors/EntityActor";

export class SimpleLevel extends ex.Scene {
  override onInitialize(engine: ex.Engine): void {
    console.log("SimpleLevel initialized");

    // Get player's entities from the Zustand store (using getState because hooks can't be used in classes)
    const playerEntities = useGameStore.getState().player.entities;

    // Lay out the entities in a simple grid (here we assume 2 columns)
    const cols = 2;
    const spacing = 150;
    const startX = engine.drawWidth / 2 - spacing / 2;
    const startY = engine.drawHeight / 2 - spacing / 2;

    playerEntities.forEach((entity, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const pos = vec(startX + col * spacing, startY + row * spacing);
      const actor = new EntityActor(entity, pos, 100);
      actor.on('pointerdown', () => {
        console.log('Click en el actor');
      });
      this.add(actor);
    });
  }
}
