/**
 * Implementar en escenas que reaccionan a ser pausadas
 * (this.scene.pause()). La escena permanece en memoria pero su update()
 * deja de ejecutarse.
 *
 * Útil para: pausar música, mostrar overlay de pausa, detener animaciones.
 */
export interface OnPause {
  pause(): void;
}