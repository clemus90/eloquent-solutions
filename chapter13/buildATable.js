function buildTable(data) {
  headers = Object.keys(data[0]);
  content = data.map(function(item){
    return headers.map(function(header){
      return item[header];
    });
  });

  var table = document.createElement("table");
  var top_row = document.createElement("tr")
  
  headers.forEach(function(header){
    var th = document.createElement("th");
    var cnt = document.createTextNode(header);
    th.appendChild(cnt);
    top_row.appendChild(th);
  });

  table.appendChild(top_row);

  content.forEach(function(row){
    var new_row = document.createElement("tr");
    row.forEach(function(col){
      var td = document.createElement("td");
      var cnt = document.createTextNode(col);
      td.appendChild(cnt);
      new_row.appendChild(td);
    });
    table.appendChild(new_row);
  });

  return table;
}