import Phaser from 'phaser';
import type { IEventBus, EventHandler } from '@/core/domain/events/IEventBus';
import type { DomainEvent } from '@/core/domain/events/DomainEvent'; 


// * Un event bus es un objeto que sirve como intermediario entre quien emite un evento y quien lo escucha. Su API casi siempre tiene dos métodos:
// * publish(event): recibe un evento y lo emite a todos los suscriptores registrados para ese tipo de evento.
// * subscribe(eventName, handler): permite a los suscriptores registrarse para escuchar eventos de un tipo específico. El handler es una función que se ejecutará cuando se publique un evento de ese tipo.

// * Lo importante: el que publica no sabe quién está escuchando, y el que escucha no sabe quién publicó. Están desacoplados.

// * Clase que implementa el EventBus utilizando Phaser's EventEmitter.
export class PhaserEventBus implements IEventBus {
  private emitter = new Phaser.Events.EventEmitter();

  publish<T extends DomainEvent>(event: T): void {
    this.emitter.emit(event.eventName, event);
  }

  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    this.emitter.on(eventName, handler);
  }

  unsubscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    this.emitter.off(eventName, handler);
  }

  destroy(): void {
    this.emitter.removeAllListeners();
  }
}