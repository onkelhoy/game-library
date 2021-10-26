export class Vector {
  private dimensions: number[] = [];

  constructor(...dimensions: number[]) {
    this.dimensions = dimensions;
  }

  // getters
  public get Size() : number { return this.dimensions.length; }
  public get X() : number { return this.dimensions[0]; }
  public get Y() : number { return this.dimensions[1]; }
  public get Z() : number { return this.dimensions[2]; }
  public get Normalized(): Vector {
    const V = this.copy();
    V.normalize();
    return V;
  }
  public get Mag(): number {
    return Math.sqrt(this.dimensions.reduce((prev, curr) => prev + curr ** 2, 0));
  }
  public get Angle(): number { 
    const m = this.Mag;
    return 0;
  }

  // setters
  public set Mag(value: number) {

  }
  public set Angle(value: number) {

  }
  public set X(dim: number) { this.dimensions[0] = dim; }
  public set Y(dim: number) { this.dimensions[1] = dim; }
  public set Z(dim: number) { this.dimensions[2] = dim; }

  // methods
  copy(): Vector {
    return new Vector(...this.dimensions);
  }

  set(...dimensions: number[]) {
    this.dimensions = dimensions;
  }
  
  normalize() {
    const M = this.Mag;
    this.dimensions = this.dimensions.map(v => v / M);
  }

  dot (v: Vector): number {
    return Vector.Dot(this, v);
  }

  distanceTo (v: Vector): number {
    return Vector.Distance(this, v);
  }

  // creates a copy
  Add(value: number|Vector): Vector {
    const copy = this.copy();
    copy.add(value);
    return copy;
  }
  Sub(value: number|Vector): Vector {
    const copy = this.copy();
    copy.sub(value);
    return copy;
  }
  Mul(value: number|Vector): Vector {
    const copy = this.copy();
    copy.mul(value);
    return copy;
  }

  // modifies current
  add(value: number|Vector) {
    if (value instanceof Vector) {
      checkDimensions(this, value, 'Add');
      this.dimensions.map((v, index) => v + value.dimensions[index]);
    }
    else this.dimensions.map(v => v + value);
  }

  sub(value: number|Vector) {
    if (value instanceof Vector) {
      checkDimensions(this, value, 'Subtract');
      this.dimensions.map((v, index) => v - value.dimensions[index]);
    }
    else this.dimensions.map(v => v - value);
  }

  mul(value: number|Vector) {
    if (value instanceof Vector) {
      checkDimensions(this, value, 'Multiply');
      this.dimensions.map((v, index) => v * value.dimensions[index]);
    }
    else this.dimensions.map(v => v * value);
  }

  limit(value: number|Vector) {
    if (value instanceof Vector) {
      checkDimensions(this, value, 'Limit');
      this.dimensions.map((v, index) => (v > value.dimensions[index]) ? v = value.dimensions[index] : v);
    }
    else this.dimensions.map(v => v > value ? value : v);
  }

  // static methods
  public static Dot(a: Vector, b: Vector): number { 
      checkDimensions(a, b, 'Dot product');
    return a.dimensions.reduce((prev, curr, index) => {
      return prev + (curr * b.dimensions[index]);
    }, 0);
  }

  public static Distance(a: Vector, b: Vector): number { 
    checkDimensions(a, b, 'Distance');
    return a.Sub(b).Mag;
  }
}

// helper functions
function checkDimensions(a: Vector, b: Vector, error:string): void {
  if (a.Size !== b.Size) throw new Error(`Vector Error: ${error} - dimension missmatch`);
}