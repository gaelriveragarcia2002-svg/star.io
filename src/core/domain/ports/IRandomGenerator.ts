/**
 * Puerto para generación de números aleatorios.
 * Existe en el core para poder reemplazarlo en tests por uno determinístico.
 */
export interface IRandomGenerator {
  /** Número aleatorio en [0, 1). */
  next(): number;
  
  /** Número entero aleatorio en [min, max] inclusivo. */
  rangeInt(min: number, max: number): number;
  
  /** Número decimal aleatorio en [min, max). */
  rangeFloat(min: number, max: number): number;
}