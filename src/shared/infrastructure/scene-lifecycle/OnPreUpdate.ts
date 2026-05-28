/**
 * Implementar en escenas que necesitan lógica ANTES del update principal
 * cada frame. Raro de usar; sirve para ajustes previos al update().
 */
export interface OnPreUpdate {
  preUpdate(time: number, delta: number): void;
}