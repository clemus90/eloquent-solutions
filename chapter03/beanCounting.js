var countBs = function(word){
   return countChar(word, "B");
};

var countChar = function(word, char){
   var count = 0;
   for(var i=0; i<word.length; i++){
      if(word.charAt(i) == char){
         count ++;
      }
   }
   return count;
}

console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));