import { ACTION_TYPES } from './constants';

export type Circle = {
  centerX: number;
  centerY: number;
  diameter: number;
  selected: boolean;
};

export type Action = {
  type: ACTION_TYPES;
  circle: Circle;
  previousDiameter?: number;
  modifiedDiameter?: number;
};
