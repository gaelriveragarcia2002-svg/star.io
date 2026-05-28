/**
 * Puerto para acceder al tiempo del juego.
 * Existe en el core para que el dominio pueda razonar sobre tiempo
 * sin depender de Phaser y para poder testearlo con un FakeClock.
 */
export interface IClock {
  /** Tiempo total transcurrido desde que arrancó el juego, en milisegundos. */
  now(): number;
}