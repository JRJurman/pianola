// main.jsx
// created By Jesse Jurman
// main javascript application, which renders Pianola

var React = require('react');
var Pianola = require('./components/pianola');
var flux = require('./flux');

React.render(<Pianola flux={flux}/>, document.getElementById("main"));
