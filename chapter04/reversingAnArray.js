var reverseArray = function(arr){
  var newArr = [];
  for(var i=0; i<arr.length; i++){
    newArr.unshift(arr[i]);
  }
  return newArr;
}

var reverseArrayInPlace = function(arr){
  for(var i=0; i<arr.length / 2; i++){
    var temp = arr[i];
    arr [i] = arr[(arr.length - 1) - i];
    arr[(arr.length - 1) - i] = temp;
  }
}

//since the second case does not return a value the first is more useful in my opinion
//based in the number of operations I think both algorithms are very similar in terms of performance

console.log(reverseArray(["A", "B", "C"]));

var arrayValue = [1,2,3,4,5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);