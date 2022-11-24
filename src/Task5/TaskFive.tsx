import { useCRUD, usePersonInputs } from './TaskFiveController';

const TaskFive = () => {
  const [
    filteredName,
    setFilteredName,
    filteredPeople,
    selectedPersonIndex,
    setSelectedPersonIndex,
    addPerson,
    updatePerson,
    deletePerson,
  ] = useCRUD();

  const [name, setName, surname, setSurname] = usePersonInputs();

  return (
    <div className='container'>
      <h2>Task Five: CRUD</h2>

      <div className='card card-l'>
        <div>
          <label htmlFor='prefix'>Filter prefix: </label>
          <input
            id='prefix'
            value={filteredName}
            onChange={(event) => setFilteredName(event.target.value)}
          />
        </div>

        <div className='row'>
          <select size={5} onChange={(event) => setSelectedPersonIndex(event.target.selectedIndex)}>
            {filteredPeople.map((person, index) => (
              <option key={index}>{person}</option>
            ))}
          </select>

          <div>
            <div className='row'>
              <label htmlFor='name'>Name:</label>
              <input id='name' onChange={(event) => setName(event.target.value)} />
            </div>

            <div className='row'>
              <label htmlFor='surname'>Surname:</label>
              <input id='surname' onChange={(event) => setSurname(event.target.value)} />
            </div>
          </div>
        </div>

        <div className='row'>
          <button onClick={() => addPerson(name, surname)}>Create</button>
          <button
            onClick={() => updatePerson(selectedPersonIndex, name, surname)}
            disabled={selectedPersonIndex === null}
          >
            Update
          </button>
          <button
            onClick={() => deletePerson(selectedPersonIndex)}
            disabled={selectedPersonIndex === null}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFive;
