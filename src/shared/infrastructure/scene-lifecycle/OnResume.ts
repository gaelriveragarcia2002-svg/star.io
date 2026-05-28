/**
 * Implementar en escenas que reaccionan a ser reanudadas tras una pausa
 * (this.scene.resume()).
 *
 * Útil para: reanudar música, ocultar overlay, sincronizar tiempo perdido.
 */
export interface OnResume {
  resume(): void;
}