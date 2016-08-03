/*
Interface definition:
  - next() --> returns the next item in the sequence
  - has_next() --> returns if the sequence have a following item
*/

function ArraySeq(arr){
  this.arr = arr;
  this.currentIndex = 0;
}

ArraySeq.prototype.next = function() {
  if(!this.has_next()){
    return null;
  }
  var ret = this.arr[this.currentIndex];
  this.currentIndex++;
  return ret;
};

ArraySeq.prototype.has_next = function() {
  return this.currentIndex < this.arr.length;
};

function RangeSeq(beg, end){
  this.beg = beg;
  this.end = end;
  this.current = beg;
}

RangeSeq.prototype.next = function(){
  if(!this.has_next()){
    return null;
  }
  var ret = this.current;
  this.current++;
  return ret;
};

RangeSeq.prototype.has_next = function(){
  return this.current <= this.end;
};

function logFive(seq){
  for(var i=0; i<5 && seq.has_next(); i++){
    console.log(seq.next());
  }
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104