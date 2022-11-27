import { useState } from 'react';
import { ACTION_TYPES, DEFAULT_DIAMETER } from './constants';
import { Action, Circle } from './types';
import { MouseEvent } from 'react';
import { getDistance2Points, getMouseCoords } from './utils';

export const useCircleDrawer = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(-1);

  const undo = () => {
    if (currentActionIndex < 0) return;

    const currentAction = actions[currentActionIndex];

    switch (currentAction.type) {
      case ACTION_TYPES.CREATE:
        setCircles((prev) => prev.filter((circle) => circle !== currentAction.circle));
        break;
      case ACTION_TYPES.MODIFY:
        setCircles((prev) =>
          prev.map((circle) => {
            if (circle === currentAction.circle)
              circle.diameter = currentAction.previousDiameter as number;
            return circle;
          })
        );
        break;
      default:
        break;
    }

    setCurrentActionIndex((prev) => prev - 1);
  };

  const redo = () => {
    if (currentActionIndex >= actions.length - 1) return;

    const nextAction = actions[currentActionIndex + 1];

    switch (nextAction.type) {
      case ACTION_TYPES.CREATE:
        setCircles((prev) => [...prev, nextAction.circle]);
        break;
      case ACTION_TYPES.MODIFY:
        setCircles((prev) =>
          prev.map((circle) => {
            if (circle === nextAction.circle)
              circle.diameter = nextAction.modifiedDiameter as number;
            return circle;
          })
        );
        break;
      default:
        break;
    }

    setCurrentActionIndex((prev) => prev + 1);
  };

  const onMouseMoveHandler = (e: MouseEvent) => {
    if (!circles.length) return;
    const [currentX, currentY] = getMouseCoords(e as MouseEvent);
    let nearestCircleIndex: number | null = null;
    let nearestDistance: number;
    circles.forEach((circle, index) => {
      const distance = getDistance2Points(circle.centerX, circle.centerY, currentX, currentY);
      if (distance <= circle.diameter / 2 && (!nearestDistance || distance <= nearestDistance)) {
        nearestCircleIndex = index;
        nearestDistance = distance;
      }
    });
    setCircles((prev) =>
      prev.map((circle, index) => {
        if (index !== nearestCircleIndex) circle.selected = false;
        if (index === nearestCircleIndex) circle.selected = true;
        return circle;
      })
    );
  };

  const createCircle = (e: MouseEvent) => {
    if ((e.target as HTMLElement).className === 'circle') return;
    if (menuClicked) return;

    const [currentX, currentY] = getMouseCoords(e as MouseEvent);
    const newCircle: Circle = {
      centerX: currentX,
      centerY: currentY,
      diameter: DEFAULT_DIAMETER,
      selected: true,
    };
    const newAction = {
      type: ACTION_TYPES.CREATE,
      circle: newCircle,
    };

    setActions((prev) => [...prev.slice(0, currentActionIndex + 1), newAction]);
    setCurrentActionIndex((prev) => prev + 1);
    setCircles((prev) => [...prev, newCircle]);
  };

  const onChangeDiameter = (circle: Circle, diameter: number) => {
    setCircles((prev) =>
      prev.map((c) => {
        if (c === circle) c.diameter = diameter;
        return c;
      })
    );
  };

  const [circleClicked, setCircleClicked] = useState<Circle | null>(null);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const [previousDiameter, setPreviousDiameter] = useState<number | undefined>(undefined);

  const onCircleClick = (e: MouseEvent, circle: Circle) => {
    e.preventDefault();
    setMenuClicked(false);
    setCircleClicked(circle);
  };

  const onMenuClick = (e: MouseEvent, circle: Circle) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).className === 'range') return;

    setPreviousDiameter(circle.diameter);
    setMenuClicked(true);
  };

  const onClickOutside = () => {
    if (circleClicked) {
      const newAction: Action = {
        type: ACTION_TYPES.MODIFY,
        circle: circleClicked,
        previousDiameter: previousDiameter,
        modifiedDiameter: circleClicked.diameter,
      };

      setActions((prev) => [...prev.slice(0, currentActionIndex + 1), newAction]);
      setCurrentActionIndex((prev) => prev + 1);
      setPreviousDiameter(undefined);
      setCircleClicked(null);
      setMenuClicked(false);
    }
  };

  return [
    circles,
    createCircle,
    onChangeDiameter,
    onMouseMoveHandler,
    undo,
    redo,
    circleClicked,
    onCircleClick,
    menuClicked,
    onMenuClick,
    onClickOutside,
  ] as const;
};
