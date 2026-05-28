import type { Vector2 } from "@/core/domain/value-objets/Vector2";

export enum MinimapEntityType {
  PLAYER  = 'player',
  ENEMY   = 'enemy',
  ITEM    = 'item',
  XP_ORB  = 'xp_orb',
}

export class MinimapEntity {

  public readonly id: string;
  public readonly type: MinimapEntityType;
  private _position: Vector2;

  private constructor(id: string, type: MinimapEntityType, position: Vector2) {
    this.id = id;
    this.type = type;
    this._position = position;
  }

  public static create(id: string, type: MinimapEntityType, position: Vector2): MinimapEntity {
    return new MinimapEntity(id, type, position);
  }

  public updatePosition(position: Vector2): void {
    this._position = position;
  }

  public get position(): Vector2 {
    return this._position;
  }
}
