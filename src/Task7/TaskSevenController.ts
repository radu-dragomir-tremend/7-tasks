import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Cell } from './types';
import { getFormulaValue, parseValue } from './utils';

export const useCell = () => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active) inputRef.current!.focus();
  }, [active]);

  return [active, setActive, inputRef] as const;
};

export const useCells = () => {
  const [cells, setCells] = useState(new Map<string, Cell>());

  const updateValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    let newCells = new Map(
      cells.set(`${id}`, {
        value: e.target.value,
      })
    );

    setCells(newCells);
    updateDependencies(newCells);
  };

  const updateFormula = (e: KeyboardEvent, id: string) => {
    if (e.key !== 'Enter') return;

    const enteredValue = (e.target as HTMLInputElement).value;
    const [firstCell, secondCell, operator] = parseValue(enteredValue);
    if (!firstCell || !secondCell || !operator) return;

    let newCells = new Map(
      cells.set(`${id}`, {
        value: getFormulaValue(cells, enteredValue),
        formula: {
          text: enteredValue,
          firstCell,
          secondCell,
          operator,
        },
      })
    );

    setCells(newCells);
    updateDependencies(newCells);
  };

  const updateDependencies = (newCells: Map<string, Cell>) => {
    let hasChanged = 1;

    while (hasChanged) {
      hasChanged = 0;
      // eslint-disable-next-line no-loop-func
      newCells.forEach((cell, id) => {
        if (!cell.formula) return;

        const correctValue = getFormulaValue(newCells, cell.formula.text);
        if (correctValue !== cell.value) {
          hasChanged = 1;
          newCells.set(`${id}`, {
            value: correctValue,
            formula: cell.formula,
          });

          setCells(newCells);
        }
      });
    }
  };

  return [cells, updateValue, updateFormula] as const;
};
