var code = document.querySelector("#code");
var button = document.querySelector("#button");
var output = document.querySelector("#output");

button.addEventListener("click", function(){
  try{
    var codeBody = new Function(code.value);
    var returnVal = codeBody();
    output.textContent = returnVal;
  }catch(e){
    output.textContent = e;
  }
});