export interface InputState {
  readonly up: boolean;
  readonly down: boolean;
  readonly left: boolean;
  readonly right: boolean;
  readonly dash: boolean;
}

export interface IInputProvider {
  getState(): InputState;
}