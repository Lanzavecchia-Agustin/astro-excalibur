// src/components/actors/EntityActor.ts
import * as ex from "excalibur";
import type { Entity } from "store/GameStore";
import { useModalStore } from "store/modalState";

export class EntityActor extends ex.Actor {
  entity: Entity;

  constructor(entity: Entity, pos: ex.Vector, size: number = 100) {
    super({
      pos,
      width: size,
      height: size,
      anchor: ex.vec(0.5, 0.5),
      collisionType: ex.CollisionType.Active, // Asegurarse de que es activo
    });
    this.entity = entity;

    // Generamos un color aleatorio para el cuadrado
    const randomColor = new ex.Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      1
    );

    this.graphics.use(
      new ex.Rectangle({
        width: size,
        height: size,
        color: randomColor,
      })
    );
  }

  override onInitialize(engine: ex.Engine): void {
    // Añadimos un evento para detectar clicks en el actor
    this.on('pointerdown', () => {
      console.log('Click en el actor');
      useModalStore.getState().openModal(`Hola, soy ${this.entity.name}`);
    });
    this.on('pointerup', () => {
        console.log('Click en el actor');
        alert(`Hola, soy ${this.entity.name}`);
      });
  }
}
