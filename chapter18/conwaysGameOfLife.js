function World(width, height){
  this.width = width;
  this.height = height;

  this.simulation = [];
}

World.randomAlive = function(){
  return Math.random() >= 0.5;
}

World.prototype.randomPopulation = function(){
  for(var i=0; i<this.height; i++){
    this.simulation[i] = [];
    for(var j=0; j<this.width; j++){
      this.simulation[i][j] = World.randomAlive();
    }
  }
}

World.prototype.simulate = function(){
  var newSimulation = [];
  for(var i=0; i<this.height; i++){
    newSimulation[i] = [];
    for(var j=0; j<this.width; j++){
      var livingNeighbors = this.countNeighbors(j,i);
      if(this.simulation[i][j]){
        newSimulation[i][j] = livingNeighbors>=2 && livingNeighbors<=3;
      }else{
        newSimulation[i][j] = livingNeighbors == 3;
      }
    }
  }
  this.simulation = newSimulation;
}

World.prototype.countNeighbors = function(x,y){
  var count = 0;
  for(var i=y-1; i<=y+1; i++){
    if(i>=0 && i<this.height){
      for(var j=x-1; j<=x+1; j++){
        if(j>=0 && j<this.width){
          if(!(i == y && j == x)){
            count += this.simulation[i][j] ? 1 : 0;
          }
        }
      }
    }
  }
  return count;
}

function DomWorldRep(container){
  this.container = container;
  this.world = new World(26,26);
  this.world.randomPopulation();
}

DomWorldRep.prototype.render = function(){
  var table = document.createElement("table");

  for(var i=0; i<this.world.height; i++){
    var row = document.createElement("tr");
    for(var j=0; j<this.world.width; j++){
      var cell = document.createElement("td");
      var check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.checked = this.world.simulation[i][j];

      check.addEventListener("change", function(i,j,event){
        this.world.simulation[i][j] = event.target.checked;
      }.bind(this, i, j))

      cell.appendChild(check);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  this.container.appendChild(table);
}

DomWorldRep.prototype.update = function(){
  var table = this.container.firstElementChild;
  for(var i=0; i<this.world.height; i++){
    var currentRow = table.children[i];
    for(var j=0; j<this.world.width; j++){
      var currentCheckbox = currentRow.children[j].firstElementChild;
      currentCheckbox.checked = this.world.simulation[i][j];
    }
  }
}

DomWorldRep.prototype.nextSimulation = function(){
  this.world.simulate();
  this.update();
}

var grid = new DomWorldRep(document.querySelector("#grid"));
grid.render();
grid.update();
var next = document.querySelector("#next");

next.addEventListener("click", function(){
  grid.nextSimulation();
})