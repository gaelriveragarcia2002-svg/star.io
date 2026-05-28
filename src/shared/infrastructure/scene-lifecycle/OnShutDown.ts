/**
 * Implementar en escenas que necesitan limpiar recursos al cerrarse.
 * Se ejecuta UNA vez cuando la escena se detiene con this.scene.stop().
 *
 * IMPORTANTE: en Phaser este "método" normalmente se maneja vía evento
 * (this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)) en lugar de
 * sobreescribir un método. Esta interfaz documenta el contrato si decides
 * implementarlo como método.
 *
 * Útil para: destruir EventBus, cerrar conexiones de red, cancelar timers,
 * remover listeners externos.
 *
 */
export interface OnShutdown {
  shutdown(): void;
}