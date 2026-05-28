/**
 * Tiers de experiencia con sus propiedades.
 * Define la "loot table" del juego.
 */
export class ExperienceTier {
    public readonly name: 'small' | 'medium' | 'large' | 'huge'; // nombre del tier
    public readonly xpAmount: number;   // cantidad de experiencia otorgada
    public readonly color: number;      // color hex para la vista
    public readonly radius: number;     // tamaño visual
    public readonly weight: number;    // peso relativo para la generación aleatoria (más alto = más común)

  private constructor(
    name: 'small' | 'medium' | 'large' | 'huge',
    xpAmount: number,
    color: number,
    radius: number,
    weight: number
  ) {
    this.name = name;
    this.xpAmount = xpAmount;
    this.color = color;
    this.radius = radius;
    this.weight = weight;
  }

  static readonly SMALL  = new ExperienceTier('small',  5,  0x4fc3f7, 6,  70);
  static readonly MEDIUM = new ExperienceTier('medium', 15, 0x66bb6a, 9,  20);
  static readonly LARGE  = new ExperienceTier('large',  40, 0xffca28, 12, 8);
  static readonly HUGE   = new ExperienceTier('huge',   100, 0xff5252, 16, 2);

  static readonly ALL: readonly ExperienceTier[] = [
    ExperienceTier.SMALL,
    ExperienceTier.MEDIUM,
    ExperienceTier.LARGE,
    ExperienceTier.HUGE
  ];
}