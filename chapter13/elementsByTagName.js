function byTagName(node, tagName) {
  var result = [];
  var children = node.childNodes;
  for(var i=0; i<children.length; i++){
    var current = children[i];
    if(current.tagName == tagName.toUpperCase()){
      result.push(current);
    }
    var grandChildren = byTagName(current, tagName);
    if(grandChildren.length > 0){
      Array.prototype.push.apply(result, grandChildren);
    }
  }
  return result;
}