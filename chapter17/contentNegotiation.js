var url = "http://eloquentjavascript.net/author";

var req = new XMLHttpRequest();
req.open("GET", url, false);
req.setRequestHeader("Accept", "text/plain");
req.send(null);

var p = document.createElement("p");
var text = document.createTextNode(req.responseText);
p.appendChild(text);

document.body.appendChild(p);

req = new XMLHttpRequest();
req.open("GET", url, false);
req.setRequestHeader("Accept", "text/html");
req.send(null);

p = document.createElement("p");
text = document.createTextNode(req.responseText);
p.appendChild(text);

document.body.appendChild(p);


req = new XMLHttpRequest();
req.open("GET", url, false);
req.setRequestHeader("Accept", "application/json");
req.send(null);

p = document.createElement("p");
text = document.createTextNode(req.responseText);
p.appendChild(text);

document.body.appendChild(p);