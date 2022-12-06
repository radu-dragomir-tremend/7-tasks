import React from 'react';
import { useCell } from './TaskSevenController';

interface CellProps {
  id: string;
  value: string;
  formula: string;
  updateValue: Function;
  updateFormula: Function;
}

const Cell = (props: CellProps) => {
  const [active, setActive, inputRef] = useCell();

  return (
    <td onDoubleClick={() => setActive(true)} onBlur={() => setActive(false)}>
      {!active && props.value && <div>{props.value}</div>}
      {active && (
        <input
          ref={inputRef}
          value={props.formula || props.value}
          onChange={(e) => {
            props.updateValue(e, props.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setActive(false);
            props.updateFormula(e, props.id);
          }}
        ></input>
      )}
    </td>
  );
};

export default Cell;
