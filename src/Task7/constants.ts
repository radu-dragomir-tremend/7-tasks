export const COLUMNS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const ROWS = [...Array(100).keys()];

export const SUM_FORMULA = /=SUM\([A-Za-z0-9]+:[A-Za-z0-9]+\)/;
export const SUB_FORMULA = /=SUB\([A-Za-z0-9]+:[A-Za-z0-9]+\)/;
export const MUL_FORMULA = /=MUL\([A-Za-z0-9]+:[A-Za-z0-9]+\)/;
export const DIV_FORMULA = /=DIV\([A-Za-z0-9]+:[A-Za-z0-9]+\)/;
