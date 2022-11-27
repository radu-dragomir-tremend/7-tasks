import { MouseEvent } from 'react';
import { Circle } from './types';

export const getCircleStyles = (circle: Circle) => {
  return {
    height: circle.diameter,
    width: circle.diameter,
    left: circle.centerX,
    top: circle.centerY,
    backgroundColor: circle.selected ? 'lightgray' : 'white',
    zIndex: circle.selected ? 1 : 0,
  };
};

export const getDistance2Points = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.hypot(x2 - x1, y2 - y1);
};

export const getMouseCoords = (e: MouseEvent) => {
  const rect = (e.currentTarget as Element).getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;
  return [currentX, currentY];
};
