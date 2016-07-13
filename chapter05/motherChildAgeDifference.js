var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);

console.log(typeof ancestry);

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var motherChildDifferences = ancestry.filter(function(person){
  return person.mother in byName
}).map(function(person){
  return person.born - byName[person.mother].born;
});

console.log(average(motherChildDifferences));
// → 31.2