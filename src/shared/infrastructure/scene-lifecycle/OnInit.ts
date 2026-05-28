/**
 * Implementar en escenas que reciben datos al iniciarse.
 * Se ejecuta UNA vez antes de preload(), pero después del constructor.
 *
 * Útil para: leer parámetros pasados desde otra escena
 * (ej: this.scene.start('GameScene', { level: 3 })).
 *
 */
export interface OnInit<T = unknown> {
  init(data: T): void;
}