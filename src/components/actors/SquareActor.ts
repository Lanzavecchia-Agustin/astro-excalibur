import * as ex from "excalibur";

export class SquareActor extends ex.Actor {
  constructor(pos: ex.Vector, size: number = 100) {
    super({
      pos,
      width: size,
      height: size,
      // Opcional: si deseas que el actor se centre en su posición, 
      // puedes dejar el valor por defecto (0.5, 0.5) o especificarlo:
      anchor: ex.vec(0.5, 0.5)
    });

    // Generar un color aleatorio
    const randomColor = new ex.Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      1
    );

    // Usamos un gráfico rectangular con el color generado
    this.graphics.use(new ex.Rectangle({
      width: size,
      height: size,
      color: randomColor
    }));
  }
}
