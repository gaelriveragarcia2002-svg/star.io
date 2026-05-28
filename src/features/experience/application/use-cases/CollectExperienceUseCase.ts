import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { Player } from "@/features/player/domain/entities/Player";
import type { Vector2 } from "@/core/domain/value-objets/Vector2";
import type { ExperienceOrb } from "../../domain/entities/ExperienceOrb";
import { ExperienceOrbCollectedEvent } from "../../domain/events/ExperienceOrbCollectedEvent";
import type { UseCase } from "@/core/domain/events/UseCase";

export class CollectExperienceUseCase implements UseCase {

  private readonly eventBus: IEventBus;

  constructor(eventBus: IEventBus) {
    this.eventBus = eventBus;
  }

  //* Chequeo normal frame a frame.
  public execute(player: Player, orbs: ExperienceOrb[]): void {
    for (const orb of orbs) {
      if (orb.isCollected) continue;
      // * Recolectar los orbes solo si el jugador está lo suficientemente cerca del centro del orbe, considerando el radio de la hitbox del jugador y el radio del orbe según su tier.
      const collectionDistance = player.hitboxRadius + orb.tier.radius;
      if (player.position.distanceTo(orb.position) <= collectionDistance) {
        this.collect(orb, player.id);
      }
    }
  }

  //* Chequeo a lo largo del segmento del dash para evitar tunneling.
  public executeOnPath(from: Vector2, to: Vector2, orbs: ExperienceOrb[], playerId: string, hitboxRadius: number): void {
    for (const orb of orbs) {
      if (orb.isCollected) continue;
      if (this.distanceToSegment(orb.position, from, to) <= hitboxRadius + orb.tier.radius) {
        this.collect(orb, playerId);
      }
    }
  }

  private collect(orb: ExperienceOrb, playerId: string): void {
    orb.collect();
    this.eventBus.publish(new ExperienceOrbCollectedEvent(orb.id, orb.xpAmount, playerId));
  }

  //* Distancia mínima entre un punto P y el segmento AB.
  // Formula basada en proyección vectorial. Devuelve la distancia desde el centro del orbe hasta el camino del dash.
  // fuente: https://stackoverflow.com/a/1501725
  private distanceToSegment(p: Vector2, a: Vector2, b: Vector2): number {
    const abx = b.x - a.x, aby = b.y - a.y;
    const lenSq = abx ** 2 + aby ** 2;
    if (lenSq === 0) return p.distanceTo(a);
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.y - a.y) * aby) / lenSq));
    const closestX = a.x + t * abx;
    const closestY = a.y + t * aby;
    return Math.sqrt((p.x - closestX) ** 2 + (p.y - closestY) ** 2);
  }
}

