function asTabs(node) {
  var buttonList = document.createElement('ul');
  var buttonListHolder = [];
  var innerDivs = node.querySelectorAll('div');
  var size = innerDivs.length;
  for(var i=0; i<size; i++){
    var listElement = document.createElement('li');
    var button = document.createElement('button');
    var text = document.createTextNode(innerDivs[i].getAttribute("data-tabname"));

    button.appendChild(text);
    listElement.appendChild(button);
    buttonList.appendChild(listElement);

    listElement.appendChild(button);
    buttonListHolder.push(button);

    if(i == 0){
      button.setAttribute("data-active", "active");
    }
    else if(i !=0){
      innerDivs[i].className = "hidden"; 
    }

    button.addEventListener("click", function(btn) {
      var isActive = btn.getAttribute("data-active"); 
      if(isActive !== "active"){

        btn.setAttribute("data-active", "active");
        for(var j=0; j<buttonListHolder.length; j++) {
          if(buttonListHolder[j] !== btn){
            buttonListHolder[j].setAttribute("data-active", "");
          }
        }

        for(var j=0; j<innerDivs.length; j++){
          if(innerDivs[j].getAttribute("data-tabname") == btn.innerText){
            innerDivs[j].className = "";
          }else{
            innerDivs[j].className = "hidden";
          }
        }
      }

    }.bind(undefined,button));
  }
  node.appendChild(buttonList);
}