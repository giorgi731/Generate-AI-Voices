export class Binode {
  data: number;
  l: Binode | null;
  r: Binode | null;

  constructor(x: number = 0) {
    this.data = x;
    this.l = null;
    this.r = null;
  }
}
