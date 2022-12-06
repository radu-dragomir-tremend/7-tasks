import Cell from './Cell';
import { COLUMNS, ROWS } from './constants';
import { useCells } from './TaskSevenController';

const TaskSeven = () => {
  const [cells, updateValue, updateFormula] = useCells();

  return (
    <div className='container'>
      <h2>Task Seven: Cells</h2>
      <div className='cells'>
        <table>
          <thead>
            <tr>
              <th className='column'></th>
              {COLUMNS.map((columnName) => (
                <th key={columnName} className='column'>
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((rowNumber) => (
              <tr key={rowNumber}>
                <td>{rowNumber}</td>
                {COLUMNS.map((columnName) => (
                  <Cell
                    key={columnName}
                    id={`${columnName}${rowNumber}`}
                    value={cells.get(`${columnName}${rowNumber}`)?.value || ''}
                    formula={cells.get(`${columnName}${rowNumber}`)?.formula?.text || ''}
                    updateValue={updateValue}
                    updateFormula={updateFormula}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskSeven;
