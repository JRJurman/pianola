var Fluxxor = require('fluxxor');
var stores = require('./stores');
var actions = require('./actions');

var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;

module.exports = flux;
