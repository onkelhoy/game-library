import { Vector } from './Vector';
import { Matrix } from './Matrix';

const E = new Matrix([[0,3,5],[5,5,2]]);
const D = new Matrix([[3,4],[3,-2],[4,-2]]);


const product = E.Mul(D);

E.print();
D.print();

product.print();
