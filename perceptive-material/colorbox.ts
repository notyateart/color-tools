import Color from "https://colorjs.io/dist/color.js";

class ColorSquare {
    private _l: number;
    private _c: number;
    private _h: number;
    private col: Color;

    constructor(lightness: number, chroma: number, hue: number) {
        this._h = hue;
        this._l = lightness;
        this._c = chroma;
        this.col = new Color("oklch", [lightness, chroma, hue])
    }

    getLightness(): number {
        return this._l;
    }

    getChroma(): number {
        return this._c;
    }

    getHue(): number {
        return this._h;
    }

    setLightness(lightness: number): void {
        if (lightness >= 0 && lightness <= 100) {
            this._l = lightness;
            this.col.oklch.l = lightness;
        } else {
            throw new Error("Lightness must be between 0% and 100%.");
        }
    }

    setChroma(chroma: number): void {
        if (chroma >= 0 && chroma <= 1) {
            this._c = chroma;
            this.col.oklch.c = chroma;
        } else {
            throw new Error("Chroma must be between 0 and 1.");
        }
    }

    setHue(hue: number): void {
        if (hue >= 0 && hue <= 360) {
            this._h = hue;
            this.col.oklch.h = hue;
        } else {
            throw new Error("Color degree must be between 0 and 360 degrees.");
        }
    }

    // Method to get color in CSS format
    getColorCSS(): string {
        return `oklab(${this._l}% ${this._c} ${this._h})`;
    }
}