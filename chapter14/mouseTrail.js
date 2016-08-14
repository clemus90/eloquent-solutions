document.body.addEventListener("mousemove", function(event){

  var trail = document.createElement("div");
  trail.className = "trail";
  trail.style.top = (event.pageY - 3) + "px";
  trail.style.left = (event.pageX - 3) + "px";
  document.body.appendChild(trail);
  setTimeout(function(){
    document.body.removeChild(trail);
  }, 200);
});