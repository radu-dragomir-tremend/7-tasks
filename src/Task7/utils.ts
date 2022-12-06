import { DIV_FORMULA, MUL_FORMULA, SUB_FORMULA, SUM_FORMULA } from './constants';
import { Cell } from './types';

export const parseValue = (value: string) => {
  let operator = '';
  if (SUM_FORMULA.test(value)) operator = '+';
  if (SUB_FORMULA.test(value)) operator = '-';
  if (MUL_FORMULA.test(value)) operator = '*';
  if (DIV_FORMULA.test(value)) operator = '/';
  if (!operator) return [null, null, null];

  const firstCell = value.split('(')[1].split(':')[0];
  const secondCell = value.split(':')[1].split(')')[0];

  return [firstCell, secondCell, operator];
};

export const getFormulaValue = (cells: Map<string, Cell>, formula: string) => {
  const [firstCell, secondCell, operator] = parseValue(formula);

  if (!firstCell || !secondCell || !operator) return 'NaN';

  const firstCellValue = cells.get(firstCell.toUpperCase())?.value;
  const secondCellValue = cells.get(secondCell.toUpperCase())?.value;

  let value = null;

  if (!firstCellValue || !secondCellValue) return 'NaN';

  if (operator === '+') value = +firstCellValue + +secondCellValue;
  if (operator === '-') value = +firstCellValue - +secondCellValue;
  if (operator === '*') value = +firstCellValue * +secondCellValue;
  if (operator === '/') value = +firstCellValue / +secondCellValue;

  return value!.toFixed(2).toString();
};
