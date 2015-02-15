// main.jsx
// created By Jesse Jurman
// main javascript application, which renders Pianola

var React = require('react');
var Pianola = require('./pianola');
var keyboarderizer = require('./keyboarderizer');

React.render(<Pianola />, document.getElementById("main"));

window.onresize = function() {
  keyboarderizer();
};
