export class Vector2 {

    // * Atributos de la clase.
    public readonly x: number
    public readonly y: number

    // * Constructor de la clase, recibe las coordenadas x e y.
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // * Metodos de la clase.
    public add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    public scale(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    public distanceTo(other: Vector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    public normalize(): Vector2 {
        const length = Math.sqrt(this.x ** 2 + this.y ** 2);
        if (length === 0) return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }
    // * Metodos estaticos de la clase.
    public static zero(): Vector2 {
        return new Vector2(0, 0);
    }
}