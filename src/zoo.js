const data = require('./data');

const { species, employees, prices } = data;

const getSpeciesByIds = (...ids) => species.filter(
  (specie) => ids.includes(specie.id)
)

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

function getOldestFromFirstSpecies(id) {
}

function increasePrices(percentage) {
}

function getEmployeeCoverage(idOrName) {
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
