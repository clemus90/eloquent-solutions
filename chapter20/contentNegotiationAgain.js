var http = require('http');

contentTypes = ["text/plain", "text/html", "application/json"];

contentTypes.forEach(function(type){
  var request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers:{Accept: type}
  }
  , function(response){
    console.log("Type: ", type);
    response.on('data', function(chunk){
      console.log('BODY:' + chunk);
    })
  });
  request.end();
  console.log("\n");
});