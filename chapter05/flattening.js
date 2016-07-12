var arrays = [[1,2,3], [4,5], [6]]

var flat = arrays.reduce(function(current, subarr){
  return current.concat(subarr);
},[]);

console.log(flat);