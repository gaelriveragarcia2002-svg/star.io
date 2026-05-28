import type { DomainEvent } from "./DomainEvent";

export type EventHandler<T extends DomainEvent> = (event: T) => void;

export interface IEventBus {
  publish<T extends DomainEvent>(event: T): void;
  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
  unsubscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
}