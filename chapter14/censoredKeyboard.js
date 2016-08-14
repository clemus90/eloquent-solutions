var input = document.querySelector("input");

input.addEventListener("keypress", function(event){
  var letter = String.fromCharCode(event.charCode).toLowerCase();
  var forbidden = ["q", "w", "x"];
  if(forbidden.indexOf(letter) != -1){
    event.preventDefault();
  }
});
