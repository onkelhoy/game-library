"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
var Vector = /** @class */ (function () {
    function Vector() {
        var dimensions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dimensions[_i] = arguments[_i];
        }
        this.dimensions = [];
        this.dimensions = dimensions;
    }
    Object.defineProperty(Vector.prototype, "X", {
        // getters
        get: function () { return this.dimensions[0]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Y", {
        get: function () { return this.dimensions[1]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Z", {
        get: function () { return this.dimensions[2]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Normalize", {
        get: function () {
            var V = this.Copy();
            V.normalize();
            return V;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Mag", {
        get: function () {
            return Math.sqrt(this.dimensions.reduce(function (prev, curr) { return prev + Math.pow(curr, 2); }, 0));
        },
        // setters
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "Angle", {
        get: function () {
            return 0;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    // methods
    Vector.prototype.normalize = function () {
        var M = this.Mag;
        this.dimensions = this.dimensions.map(function (v) { return v / M; });
    };
    Vector.prototype.Copy = function () {
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.dimensions, false)))();
    };
    Vector.prototype.Add = function (value) {
        if (value instanceof Vector) {
            if (this.dimensions.length !== value.dimensions.length)
                throw new Error('Vector Error: Add - dimension missmatch');
            this.dimensions.map(function (v, index) { return v + value.dimensions[index]; });
        }
        else
            this.dimensions.map(function (v) { return v + value; });
    };
    Vector.prototype.Sub = function (value) {
        if (value instanceof Vector) {
            if (this.dimensions.length !== value.dimensions.length)
                throw new Error('Vector Error: Sub - dimension missmatch');
            this.dimensions.map(function (v, index) { return v - value.dimensions[index]; });
        }
        else
            this.dimensions.map(function (v) { return v - value; });
    };
    Vector.prototype.Multiply = function (value) {
        if (value instanceof Vector) {
            if (this.dimensions.length !== value.dimensions.length)
                throw new Error('Vector Error: Multiply - dimension missmatch');
            this.dimensions.map(function (v, index) { return v * value.dimensions[index]; });
        }
        else
            this.dimensions.map(function (v) { return v * value; });
    };
    // static methods
    Vector.Dot = function (a, b) {
        if (a.dimensions.length !== b.dimensions.length)
            throw new Error('Vector Error: Dot product - dimension missmatch');
        return a.dimensions.reduce(function (prev, curr, index) {
            return prev + (curr * b.dimensions[index]);
        }, 0);
    };
    return Vector;
}());
exports.Vector = Vector;
