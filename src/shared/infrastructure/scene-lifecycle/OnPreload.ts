/**
 * Implementar en escenas que necesitan cargar assets antes de empezar.
 * Se ejecuta UNA vez antes de create().
 *
 * Útil para: cargar imágenes, sonidos, spritesheets, atlas, JSON, tilemaps.
 * Phaser muestra automáticamente progreso mientras los assets cargan.
 *
 */
export interface OnPreload {
  preload(): void;
}