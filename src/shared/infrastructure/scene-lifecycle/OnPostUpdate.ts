/**
 * Implementar en escenas que necesitan lógica DESPUÉS del update principal
 * cada frame, antes del render. Útil para cámaras que siguen a un objetivo
 * después de que este se movió.
 */
export interface OnPostUpdate {
  postUpdate(time: number, delta: number): void;
}