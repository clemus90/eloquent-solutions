function request(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.method || "GET", options.pathname, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText));
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.body || null);
}

var lastServerTime = 0;

request({pathname: "talks"}, function(error, response) {
  if (error) {
    reportError(error);
  } else {
    response = JSON.parse(response);
    displayTalks(response.talks);
    lastServerTime = response.serverTime;
    waitForChanges();
  }
});

function reportError(error) {
  if (error)
    alert(error.toString());
}

var talkDiv = document.querySelector("#talks");
var shownTalks = Object.create(null);

function displayTalks(talks) {
  talks.forEach(function(talk) {
    var shown = shownTalks[talk.title];
    if (talk.deleted) {
      if (shown) {
        talkDiv.removeChild(shown);
        delete shownTalks[talk.title];
      }
    } else {
      var node = drawTalk(talk);
      if (shown){
        var currentComment = shown.querySelector("input[name='comment'");
        var saveState = currentComment == document.activeElement;
        if (saveState){
          node.querySelector("input[name='comment'").value = currentComment.value;
        }
        talkDiv.replaceChild(node, shown);
        if(saveState){
          node.querySelector("input[name='comment'").focus();
        }
      }
      else
        talkDiv.appendChild(node);
      shownTalks[talk.title] = node;
    }
  });
}

function instantiateTemplate(name, values) {
  function instantiateText(text, context) {
    return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
      return context[name];
    });
  }
  function instantiate(node, context) {
    if (node.nodeType == document.ELEMENT_NODE) {
      var copy = node.cloneNode();
      if(copy.hasAttribute("template-repeat")){
        var repeatArr = context[node.getAttribute("template-repeat")];
        for(var i = 0; i < repeatArr.length; i++){
          for (var j = 0; j < node.childNodes.length; j++){
            copy.appendChild(instantiate(node.childNodes[j], repeatArr[i]));
          }
        }
      }else{
        for (var i = 0; i < node.childNodes.length; i++){
          copy.appendChild(instantiate(node.childNodes[i], context));
        }
      }
      return copy;
    } else if (node.nodeType == document.TEXT_NODE) {
      return document.createTextNode(
               instantiateText(node.nodeValue, context));
    } else {
      return node;
    }
  }

  var template = document.querySelector("#template ." + name);
  return instantiate(template, values);
}

function drawTalk(talk) {
  var node = instantiateTemplate("talk", talk);

  node.querySelector("button.del").addEventListener(
    "click", deleteTalk.bind(null, talk.title));

  var form = node.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addComment(talk.title, form.elements.comment.value);
    form.reset();
  });
  return node;
}

function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}

function deleteTalk(title) {
  request({pathname: talkURL(title), method: "DELETE"},
          reportError);
}

function addComment(title, comment) {
  var comment = {author: nameField.value, message: comment};
  request({pathname: talkURL(title) + "/comments",
           body: JSON.stringify(comment),
           method: "POST"},
          reportError);
}

var nameField = document.querySelector("#name");

nameField.value = localStorage.getItem("name") || "";

nameField.addEventListener("change", function() {
  localStorage.setItem("name", nameField.value);
});

var talkForm = document.querySelector("#newtalk");

talkForm.addEventListener("submit", function(event) {
  event.preventDefault();
  request({pathname: talkURL(talkForm.elements.title.value),
           method: "PUT",
           body: JSON.stringify({
             presenter: nameField.value,
             summary: talkForm.elements.summary.value
           })}, reportError);
  talkForm.reset();
});

function waitForChanges() {
  request({pathname: "talks?changesSince=" + lastServerTime},
          function(error, response) {
    if (error) {
      setTimeout(waitForChanges, 2500);
      console.error(error.stack);
    } else {
      response = JSON.parse(response);
      displayTalks(response.talks);
      lastServerTime = response.serverTime;
      waitForChanges();
    }
  });
}
