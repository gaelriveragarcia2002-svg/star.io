/**
 * Implementar en escenas que necesitan configurar su estado inicial.
 * Se ejecuta UNA vez después de preload(), cuando todos los sistemas
 * de Phaser ya están disponibles (this.add, this.input, this.cameras, etc.).
 *
 * Útil para: crear sprites, suscribir eventos, ensamblar dependencias,
 * configurar cámaras y físicas.
 *
 */
export interface OnCreate<T = unknown> {
  create(data?: T): void;
}