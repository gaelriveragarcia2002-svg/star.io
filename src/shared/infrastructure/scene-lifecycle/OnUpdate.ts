/**
 * Implementar en escenas con lógica de juego continua (game loop).
 * Se ejecuta CADA frame (~60 veces/segundo).
 *
 * @param time  Milisegundos totales transcurridos desde que arrancó el juego.
 * @param delta Milisegundos desde el frame anterior (usar para movimiento
 *              independiente del framerate: speed * (delta / 1000)).
 *
 * Útil para: movimiento de entidades, IA, detección manual de colisiones,
 * sincronización de vistas con dominio.
 *
 */
export interface OnUpdate {
  update(time: number, delta: number): void;
}