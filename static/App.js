'use strict';

var contentNode = document.getElementById('contents');
var component = React.createElement(
  'h2',
  null,
  'hello world'
);
ReactDOM.render(component, contentNode);