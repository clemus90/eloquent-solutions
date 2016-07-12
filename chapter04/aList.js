var arrayToList = function(arr){
  var list = null;
  for(var i=arr.length-1; i>=0; i--){
    var levelup = {
      value: arr[i],
      rest: list
    }
    list = levelup;
  }
  return list;
}

var listToArray = function(list){
  var arr = []
  while(list){
    arr.push(list.value);
    list = list.rest;
  }
  return arr;
}

var prepend = function(element, list){
  return {
    value: element,
    rest: list
  }
}

var nth = function(list, num){
  if(list == undefined){
    return undefined;
  }
  if(num == 0){
    return list.value
  }else{
    return nth(list.rest, num-1)
  }
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth(arrayToList([10, 20, 30]), 2));
console.log(nth(arrayToList([10, 20, 30]), 3));