// Builds up an array with global variable names, like
// 'alert', 'document', and 'scrollTo'
var terms = [];
for (var name in window)
  terms.push(name);

// Your code here.

var inputField = document.querySelector("#field");
var suggestionList = document.querySelector("#suggestions");

var populateAuto = function(){
  var currentVal = inputField.value;
  suggestionList.innerHTML = "";
   terms.forEach(function(term){
    if(term.toLowerCase().indexOf(currentVal.toLowerCase()) != -1){
      var clickableEl = document.createElement("div");
      var text = document.createTextNode(term);
      clickableEl.appendChild(text);

      clickableEl.addEventListener("click", function(e){
        inputField.value = this.innerText;
        populateAuto();
      });

      suggestionList.appendChild(clickableEl);
    }
  });
}

inputField.addEventListener("input", populateAuto);