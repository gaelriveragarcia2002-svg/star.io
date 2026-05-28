export interface Feature {
  update?: (deltaSeconds: number) => void;
}