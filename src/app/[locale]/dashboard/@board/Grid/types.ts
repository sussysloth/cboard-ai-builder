export type Item = {
  id: string;
};

export type Grid = {
  rows: number;
  columns: number;
  order: GridOrder;
};

export type GridOrder = (string | null)[][];
