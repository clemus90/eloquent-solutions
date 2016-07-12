var range = function(start, end, step){
  if(step == undefined){
    step = 1;
  }
  var arr = [];
  if(step > 0){
    for(var i = start; i<=end; i+= step){
      arr.push(i);
    }
  }
  else if(step < 0){
    for(var i = start; i>=end; i+= step){
      arr.push(i);
    }
  }
  return arr;
}

var sum = function(arr){
  var total = 0;
  for (var i=0; i<arr.length; i++){
    total += arr[i];
  }
  return total;
}

console.log(range(1,10));
console.log(range(5,2,-1));
console.log(sum(range(1,10)));