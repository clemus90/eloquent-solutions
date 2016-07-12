var deepEqual = function(obj1, obj2){
  if (obj1 != null &&  obj2 != null && typeof obj1 == "object" && typeof obj2 == "object"){
    var equal = true;
    for(x in obj1){
      equal = deepEqual(obj1[x], obj2[x]);
      if(equal == false){
        break;
      }
    }
    return equal;
  }else{
    return obj1 === obj2;
  }
}

var obj = {here: {is: "an"}, object: 2}
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true