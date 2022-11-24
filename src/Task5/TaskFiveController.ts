import { useState } from 'react';
import { DUMMY_DATA } from './constants';

export const useCRUD = () => {
  const [people, setPeople] = useState(DUMMY_DATA);
  const [filteredSurname, setFilteredSurname] = useState('');
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<null | number>(null);

  const filterPeopleBySurnamePrefix = (people: string[], filteredSurname: string) =>
    people.filter((person) =>
      person.split(' ')[1].toLocaleLowerCase().startsWith(filteredSurname.toLocaleLowerCase())
    );

  const addPerson = (name: string, surname: string) => {
    if (!name || !surname) return alert('Enter name and surname');

    return setPeople((prev) => [...prev, `${name} ${surname}`]);
  };
  const updatePerson = (index: number | null, name: string, surname: string) => {
    if (!name || !surname) return alert('Enter name and surname');

    return setPeople((prev) =>
      prev.map((person, i) => {
        if (i === index) {
          person = `${name} ${surname}`;
        }
        return person;
      })
    );
  };
  const deletePerson = (index: number | null) =>
    setPeople((prev) => prev.filter((_, i) => i !== index));

  const filteredPeople = filterPeopleBySurnamePrefix(people, filteredSurname);

  return [
    filteredSurname,
    setFilteredSurname,
    filteredPeople,
    selectedPersonIndex,
    setSelectedPersonIndex,
    addPerson,
    updatePerson,
    deletePerson,
  ] as const;
};

export const usePersonInputs = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  return [name, setName, surname, setSurname] as const;
};
