/**
 * Implementar en escenas que reaccionan a "dormir" (this.scene.sleep()).
 * Más profundo que pause: la escena no actualiza ni renderiza, pero su
 * estado se preserva.
 *
 * Útil para: liberar recursos no críticos, pausar timers grandes.
 */
export interface OnSleep {
  sleep(): void;
}