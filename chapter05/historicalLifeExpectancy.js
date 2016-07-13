var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var groupBy = function(array, groupFilter){
  result = {};
  array.forEach(function(item){
    var classification = groupFilter(item);
    if (!(classification in result)){
      result[classification] = [item];
    }else{
      result[classification].push(item);
    }
  });
  return result;
}

byCentury = groupBy(ancestry, function(person){
  return Math.ceil(person.died / 100);
});

for (var i in byCentury){
  console.log(i + ": " + average(byCentury[i].map(function(person){
    return person.died - person.born;
  })));
}

