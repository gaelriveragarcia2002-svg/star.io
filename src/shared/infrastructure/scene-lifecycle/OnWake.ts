/**
 * Implementar en escenas que reaccionan a "despertar" tras un sleep
 * (this.scene.wake()).
 *
 * Útil para: reactivar lo que se desactivó en sleep(), refrescar estado.
 */
export interface OnWake {
  wake(): void;
}