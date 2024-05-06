"use strict";
export const __esModule = true;
import color_js_1 from "https://colorjs.io/dist/color.js";
var ColorSquare = /** @class */ (function () {
    function ColorSquare(lightness, chroma, hue) {
        this._h = hue;
        this._l = lightness;
        this._c = chroma;
        this.col = new color_js_1["default"]("oklch", [lightness, chroma, hue]);
    }
    ColorSquare.prototype.getLightness = function () {
        return this._l;
    };
    ColorSquare.prototype.getChroma = function () {
        return this._c;
    };
    ColorSquare.prototype.getHue = function () {
        return this._h;
    };
    ColorSquare.prototype.setLightness = function (lightness) {
        if (lightness >= 0 && lightness <= 100) {
            this._l = lightness;
            this.col.oklch.l = lightness;
        }
        else {
            throw new Error("Lightness must be between 0% and 100%.");
        }
    };
    ColorSquare.prototype.setChroma = function (chroma) {
        if (chroma >= 0 && chroma <= 1) {
            this._c = chroma;
            this.col.oklch.c = chroma;
        }
        else {
            throw new Error("Chroma must be between 0 and 1.");
        }
    };
    ColorSquare.prototype.setHue = function (hue) {
        if (hue >= 0 && hue <= 360) {
            this._h = hue;
            this.col.oklch.h = hue;
        }
        else {
            throw new Error("Color degree must be between 0 and 360 degrees.");
        }
    };
    // Method to get color in CSS format
    ColorSquare.prototype.getColorCSS = function () {
        return "oklab(" + this._l + "% " + this._c + " " + this._h + ")";
    };
    return ColorSquare;
}());
