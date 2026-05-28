import { Vector2 } from "@/core/domain/value-objets/Vector2";
import { DashAbility } from "../abilities/DashAbility";
import { Health } from "../stats/Health";

/** 
 * * Entidad de dominio del jugador.
 * * El dominio es "puro" porque no depende de Phaser ni de infraestructura externa.
 */
export class Player {
    // * Atributos de la clase.
    public readonly id: string;
    private _position: Vector2;
    private  _speed: number;
    
    // Radio de la hitbox — cualquier entidad que interactúe con el jugador consulta este valor.
    public readonly hitboxRadius: number = 30;

    // * Atributos de habilidades.
    public readonly dash = new DashAbility();
    // * Atributos de estados.
    public readonly health: Health;

    // * Constructor privado para forzar el uso del método estático de creación.
    private constructor(id: string, initialPosition: Vector2, speed: number, maxHealth: number) {
        this.id = id;
        this._position = initialPosition;
        this._speed = speed;
        this.health = new Health(maxHealth);
    }

    public static create(id: string, position: Vector2, speed: number, maxHealth: number): Player {
        return new Player(id, position, speed, maxHealth);
    }

    // * Metodos de la clase.
    // ! Metodo de reglas de negocios.
    // * move: El jugador se mueve en función de una dirección y un delta de tiempo. La dirección es un vector que indica hacia dónde se quiere mover el jugador (por ejemplo, {x: 1, y: 0} para moverse a la derecha). El delta de tiempo es el tiempo transcurrido desde la última actualización, lo que permite calcular cuánto debe desplazarse el jugador en función de su velocidad.
    public move(direction: Vector2, deltaSeconds: number): void {
        if (direction.x === 0 && direction.y === 0) return;

        // Cancela el boost si el jugador cambia de dirección durante el dash.
        this.dash.checkDirectionCancel(direction);

        const length = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const normalized = new Vector2(direction.x / length, direction.y / length);
        const boost = this._speed * this.dash.boostAmountPercent * this.dash.currentProgress;
        const effectiveSpeed = this._speed + boost;
        const displacement = normalized.scale(effectiveSpeed * deltaSeconds);
        this._position = this.position.add(displacement);
    }

    public increaseSpeed(amount: number): void {
        this._speed += amount;
    }
    // Impide que el jugador salga de los límites del área jugable.
    public constrainTo(minX: number, minY: number, maxX: number, maxY: number): void {
        this._position = new Vector2(
            Math.max(minX, Math.min(maxX, this._position.x)),
            Math.max(minY, Math.min(maxY, this._position.y))
        );
    }

    // * Getters y setters.
    public get position(): Vector2 {
        return this._position;
    }
    public set position(position: Vector2) {
        this._position = position;
    }
    public get speed(): number {
        return this._speed;
    } 
    public set speed(speed: number) {
        this._speed = speed;
    }
}