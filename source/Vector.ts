export class Vector {
  private dimensions: number[] = [];

  constructor(...dimensions: number[]) {
    this.dimensions = dimensions;
  }

  // getters
  public get X() : number { return this.dimensions[0]; }
  public get Y() : number { return this.dimensions[1]; }
  public get Z() : number { return this.dimensions[2]; }
  public get Normalize(): Vector {
    const V = this.Copy();
    V.normalize();
    return V;
  }
  public get Mag(): number {
    return Math.sqrt(this.dimensions.reduce((prev, curr) => prev + curr ** 2, 0));
  }
  public get Angle(): number { 
    return 0;
  }

  // setters
  public set Mag(value: number) {

  }
  public set Angle(value: number) {

  }
  public set X(dim: number) {
    this.dimensions[0] = dim;
  }
  public set Y(dim: number) {
    this.dimensions[1] = dim;
  }
  public set Z(dim: number) {
    this.dimensions[2] = dim;
  }

  // methods
  normalize() {
    const M = this.Mag;

    this.dimensions = this.dimensions.map(v => v / M);
  }

  Copy(): Vector {
    return new Vector(...this.dimensions);
  }

  Add(value: number|Vector) {
    if (value instanceof Vector) {
      if (this.dimensions.length !== value.dimensions.length) throw new Error('Vector Error: Add - dimension missmatch');
      this.dimensions.map((v, index) => v + value.dimensions[index]);
    }
    else this.dimensions.map(v => v + value);
  }

  Sub(value: number|Vector) {
    if (value instanceof Vector) {
      if (this.dimensions.length !== value.dimensions.length) throw new Error('Vector Error: Sub - dimension missmatch');
      this.dimensions.map((v, index) => v - value.dimensions[index]);
    }
    else this.dimensions.map(v => v - value);
  }

  Multiply(value: number|Vector) {
    if (value instanceof Vector) {
      if (this.dimensions.length !== value.dimensions.length) throw new Error('Vector Error: Multiply - dimension missmatch');
      this.dimensions.map((v, index) => v * value.dimensions[index]);
    }
    else this.dimensions.map(v => v * value);
  }

  // static methods
  public static Dot(a: Vector, b: Vector): number { 
    if (a.dimensions.length !== b.dimensions.length) throw new Error('Vector Error: Dot product - dimension missmatch');
    return a.dimensions.reduce((prev, curr, index) => {
      return prev + (curr * b.dimensions[index]);
    }, 0);
  }
}