export interface Cell {
  value: string;
  formula?: {
    text: string;
    firstCell: string;
    secondCell: string;
    operator: string;
  };
}
