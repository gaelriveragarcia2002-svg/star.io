export class Level {
    private _currentLevel: number;
    private _currentXp: number;
    private _xpToNextLevel: number;

    private static readonly baseXpToNextLevel: number = 100;
    private static readonly xpGrowthRate: number = 1.10;

    constructor(currentLevel = 1, currentXp = 0, xpToNextLevel = 100) {
        this._currentLevel = currentLevel;
        this._currentXp = currentXp;
        this._xpToNextLevel = xpToNextLevel;
    }

    public static createAtLevel(level: number): Level {
        const xpToNextLevel = Math.floor(this.baseXpToNextLevel * this.xpGrowthRate ** (level - 1));
        return new Level(level, 0, xpToNextLevel);
    }

    public addXp(amount: number): void {
        this._currentXp += amount;
    }

    public levelUp(): void {
        while (this._currentXp >= this._xpToNextLevel) {
            this._currentXp -= this._xpToNextLevel;
            this._currentLevel++;
            this._xpToNextLevel = Math.floor(this._xpToNextLevel * Level.xpGrowthRate);
        }
    }

    public get currentLevel(): number { return this._currentLevel; }
    public get currentXp(): number { return this._currentXp; }
    public get xpToNextLevel(): number { return this._xpToNextLevel; }
}
