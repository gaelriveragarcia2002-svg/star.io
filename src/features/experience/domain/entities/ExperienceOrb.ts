
/**
 * * Entidad de dominio de la experiencia.
 * * El dominio es "puro" porque no depende de Phaser ni de infraestructura externa.
 */
import type { ExperienceTier } from "@/core/domain/value-objets/ExperienceTier";
import type { Vector2 } from "@/core/domain/value-objets/Vector2";

// * Regla de negocios: La experiencia representa un atributo del jugador que le permitira subir de nivel y desbloquear nuevas habilidades o contenido. La experiencia se gana al completar tareas, derrotar enemigos o alcanzar ciertos hitos en el juego. A medida que el jugador acumula experiencia, puede avanzar a través de niveles, lo que a su vez puede otorgarle mejoras en sus habilidades, acceso a nuevas áreas del juego o la capacidad de equipar objetos más poderosos. La experiencia es un sistema fundamental para motivar a los jugadores a seguir jugando y progresando en el juego.
export class ExperienceOrb {

    // * Atributos de la clase.
    private collected = false;
    private _position: Vector2;
    public readonly id: string;
    public readonly tier: ExperienceTier;

    // * Consutructor privado para forzar el uso del método estático de creación.
    private constructor(id: string, position: Vector2, tier: ExperienceTier) {
        this.id = id;
        this._position = position;
        this.tier = tier;
    }

    // * Metodo estático de creación.
    public static create(id: string, position: Vector2, tier: ExperienceTier): ExperienceOrb {
        return new ExperienceOrb(id, position, tier);
    }

    // * Metodos de logica de negocio.
    public collect(): void {
        if (!this.collected) {
            this.collected = true;
        }
    }

    // * Getters y setters.
    public get position(): Vector2 {
        return this._position;
    }
    public set position(position: Vector2) {
        this._position = position;
    }

    public get xpAmount(): number {
        return this.tier.xpAmount;
    }
    public get isCollected(): boolean {
        return this.collected;
    }
}
