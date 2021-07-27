const data = require('./data');

const { species, employees, hours, prices } = data;

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
  const cronograma = {};
  const keyHours = Object.keys(hours);
  const valueHours = Object.values(hours);
  const openHour = valueHours.map((hour) => hour.open);
  const closeHour = valueHours.map((hour) => hour.close);
  keyHours.forEach((element, i) => {
    if (openHour[i] === 0) {
      cronograma[element] = 'CLOSED';
    } else {
      cronograma[element] = `Open from ${openHour[i]}am until ${closeHour[i] - 12}pm`;
    } return cronograma;
  });
  if (!dayName) {
    return cronograma;
  }
  const dias = Object.entries(cronograma).find((day) => day.includes(dayName));
  return dias.reduce((acc, v) => ({ [acc]: v }));
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

const animaisControlados = (empregado) =>
  empregado.responsibleFor
    .map((idDoAnimal) => species
      .find((especie) => especie.id === idDoAnimal).name);

const animaisPorEmpregado = (funcionarios) => funcionarios.reduce((acc, empregado) => {
  acc[`${empregado.firstName} ${empregado.lastName}`] = animaisControlados(empregado);
  return acc;
}, {});

const pegaEmpregado = (infoEmpregado) => {
  const empregadoFiltrado = employees.find((empregado) =>
    infoEmpregado === empregado.id
    || infoEmpregado === empregado.firstName
    || infoEmpregado === empregado.lastName);
  return animaisPorEmpregado([empregadoFiltrado]);
};

function getEmployeeCoverage(idFirstLastName) {
  if (!idFirstLastName) return animaisPorEmpregado(employees);
  if (idFirstLastName) return pegaEmpregado(idFirstLastName);
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
