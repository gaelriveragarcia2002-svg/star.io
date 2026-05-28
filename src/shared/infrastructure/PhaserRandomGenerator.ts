import type { IRandomGenerator } from "@/core/domain/ports/IRandomGenerator";


export class PhaserRandomGenerator implements IRandomGenerator {
  next(): number {
    return Math.random();
  }
  
  rangeInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  rangeFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}