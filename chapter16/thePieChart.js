var results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

var cx = document.querySelector("canvas").getContext("2d");
var total = results.reduce(function(sum, choice) {
  return sum + choice.count;
}, 0);

var currentAngle = -0.5 * Math.PI;
var centerX = 300, centerY = 150;
// Add code to draw the slice labels in this loop.
results.forEach(function(result) {
  var sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(centerX, centerY, 100,
         currentAngle, currentAngle + sliceAngle);
  var textAngle = currentAngle + (sliceAngle /  2.0);
  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
  cx.fillStyle = "black";
  cx.fillText(result.name,
    Math.cos(textAngle) * 75 + centerX,
    Math.sin(textAngle) * 75 + centerY
    );
});