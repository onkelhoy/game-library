type numArray = number[];
type MapCallback = (value: number, row: number, col: number) => number;

export type IMatrix = numArray[];

export interface MatrixConfig {
  rows?: number;
  cols?: number;
  defaultValue?: number;
  mapCallback?: MapCallback;
}

export class Matrix {
  private rows = 0;
  private cols = 0;
  private matrix: IMatrix = [];

  constructor(config: MatrixConfig|IMatrix) {
    if (config instanceof Array) {
      this.matrix = config as IMatrix;
      this.rows = this.matrix.length;
      this.cols = this.matrix[0].length;
    }
    else {
      this.rows = config.rows || 0;
      this.cols = config.cols || 0;

      if (typeof config.defaultValue !== 'number') this.map(config.mapCallback);
      else this.map(() => config.defaultValue as number);
    }
  }

  // private functions
  private checkDimensions(a: Matrix, b: Matrix, error:string) {
    if (a.Rows !== b.Rows) throw new Error(`Matrix Error: ${error} - dimension missmatch [row]`);
    if (a.Cols !== b.Cols) throw new Error(`Matrix Error: ${error} - dimension missmatch [col]`);
  }
  private getRow(row:number): number[] {
    if (row >= 0 && row < this.rows) {
      return this.matrix[row];
    }
    else throw new Error('Matrix Error - row is out of range');
  }
  private getCol(col:number): number[] {
    if (col >= 0 && col < this.cols) {
      const arr: number[] = [];
      for (let r=0; r<this.rows; r++) {
        arr.push(this.matrix[r][col]);
      }

      return arr;
    }
    else throw new Error('Matrix Error - column is out of range');
  }

  // Getters
  public get Rows(): number { return this.rows; }
  public get Cols(): number { return this.cols; }

  // mathods
  copy () {
    const jsonstring = JSON.stringify(this.matrix);
    return new Matrix(JSON.parse(jsonstring));
  }

  map(callback?: MapCallback) {
    // making sure the rows exists
    if (this.matrix.length === 0) this.matrix = new Array<numArray>(this.rows);

    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      // making sure the columns exists
      if (!this.matrix[rowIndex]) this.matrix[rowIndex] = new Array<number>(this.cols);

      // without -> initializing the matrix
      if (callback) {
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
          this.matrix[rowIndex][colIndex] = callback(this.matrix[rowIndex][colIndex], rowIndex, colIndex);
        }
      }
    }
  }

  add(m:Matrix): void {
    this.checkDimensions(this, m, 'addition');

    this.map((my, r, c) => my + m.matrix[r][c]);
  }
  sub(m:Matrix): void {
    this.checkDimensions(this, m, 'subtraction');

    this.map((my, r, c) => my - m.matrix[r][c]);
  }

  print() {
    console.table(this.matrix);
  }

  // creates a copy
  Add(m:Matrix):Matrix {
    this.checkDimensions(this, m, 'addition'); // to avoid creating a copy if missmatch
    const c = this.copy();
    c.add(m);

    return c;
  }

  Sub(m:Matrix):Matrix {
    this.checkDimensions(this, m, 'subtraction'); // to avoid creating a copy if missmatch
    const c = this.copy();
    c.sub(m);

    return c;
  }

  Transpose():Matrix {
    const matrix: IMatrix = [];
    for (let c=0; c<this.cols; c++) {
      const cols = this.getCol(c);

      matrix.push(cols);
    }

    return new Matrix(matrix);
  }

  Mul(b: Matrix): Matrix {
    if (this.cols !== b.rows) throw new Error('Matrix Error - multiplication a.cols does not match b.rows');
    const newMatrix = new Matrix({
      rows: b.cols,
      cols: this.rows,
      mapCallback: (_value, r, c) => {
        const arow = this.getRow(r);
        const bcol = b.getCol(c);

        // dot product
        return DotProduct(arow, bcol);
      }
    });

    return newMatrix;
  }
}

function DotProduct(a: number[], b: number[]): number { 
  if (a.length !== b.length) throw new Error('Dot Product must be the same length');

  return a.reduce((prev, curr, index) => {
    return prev + (curr * b[index]);
  }, 0);
}