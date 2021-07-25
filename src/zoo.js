const data = require('./data');

const { species, employees, prices } = data;

const getSpeciesByIds = (...ids) => species.filter(
  (specie) => ids.includes(specie.id),
);

function getAnimalsOlderThan(animal, age) {
  const animalFound = species.find((specie) => specie.name === animal);
  return animalFound.residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((e) => [e.lastName, e.firstName].includes(employeeName));
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some((employee) => employee.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

function countAnimals(species2) {
  if (!species2) {
    const animals = {};
    species.forEach((specie) => {
      animals[specie.name] = specie.residents.length;
    });
    return animals;
  }
  const animal = species.find((specie) => specie.name === species2).residents.length;
  return animal;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: Adults, Senior: Seniors, Child: Children } = prices;
  return Adult * Adults + Senior * Seniors + Child * Children;
}

function getAnimalMap(options) {
}

function getSchedule(dayName) {

}

function getOldestFromFirstSpecies(identidade) {
  const employee = employees.find(({ id }) => id === identidade);
  const animalsId = employee.responsibleFor[0];
  const findAnimals = species.find(({ id }) => id === animalsId);
  const maisVelho = findAnimals.residents
    .reduce((acc, animal) => (animal.age > acc.age ? animal : acc));
  return Object.values(maisVelho);
}

function increasePrices(percentage) {
  const operador = (percentage / 100) + 1;
  prices.Adult = Math.round((prices.Adult * (operador)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior * (operador)) * 100) / 100;
  prices.Child = Math.round((prices.Child * (operador)) * 100) / 100;
}

// Feita para a função getEmployeeCoverage
const setObject = (employee) => {
  const object = {};
  const fullName = `${employee.firstName} ${employee.lastName}`;
  object[fullName] = [];
  employee.responsibleFor.forEach((res) => {
    const { name } = data.species.find(({ id }) => id === res);
    object[fullName].push(name);
  });
  return object;
};

// Feita para a função getEmployeeCoverage
const findById = (id) => {
  const find = data.employees.find((employee) => employee.id === id);
  return setObject(find);
};

// Feita para a função getEmployeeCoverage
const findByName = (name) => {
  const find = data.employees.find(({ firstName, lastName }) => firstName === name
    || lastName === name);
  return setObject(find);
};

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const object = {};
    data.employees.forEach((employee) => {
      Object.assign(object, setObject(employee));
    });
    return object;
  }
  if (idOrName.length > 25) return findById(idOrName);
  return findByName(idOrName);
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
