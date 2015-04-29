// keyboards.js
// created By Kristen Mills and Jesse Jurman
// Stores the currently selected stores

var Fluxxor = require('fluxxor');

var constants = require('../constants/keyboards');

var Keyboards = Fluxxor.createStore({

  initialize: function() {
    var defaultKeyboards = JSON.stringify([
      {"type":"chord","name":"C","inversion":0},
      {"type":"scale","name":"C Major Scale","tonic":"C","scale":"Major"},
      {"type":"chord","name":"Cm","inversion":0},
      {"type":"scale","name":"C Minor Scale","tonic":"C","scale":"Minor"}
    ]);
    this.keyboards = JSON.parse(localStorage.keyboards || defaultKeyboards);

    this.bindActions(
      constants.ADD_CHORD, this.onAddChord,
      constants.REMOVE_CHORD, this.onRemoveChord,
      constants.SET_CHORD_INVERSION, this.onSetChordInversion,
      constants.ADD_SCALE, this.onAddScale,
      constants.REMOVE_SCALE, this.onRemoveScale
    );
  },

  onAddChord: function(payload) {
    this.keyboards.splice(payload.index, 0, payload.chord)
    this.emit('change');
    this.save();
  },

  onRemoveChord: function(payload) {
    this.keyboards.splice(payload.index, 1);
    this.emit('change');
    this.save();
  },

  onSetChordInversion: function(payload) {
    this.keyboards.indexOf(payload.chord).inversion = payload.inversion;
    this.emit('change');
    this.save();
  },

  onAddScale: function(payload) {
    this.keyboards.splice(payload.index, 0, payload.scale)
    this.emit('change');
    this.save();
  },

  onRemoveScale: function(payload) {
    this.keyboards.splice(payload.index, 1);
    this.emit('change');
    this.save();
  },

  getState: function() {
    return this.keyboards;
  },

  save: function() {
    localStorage.setItem('keyboards', JSON.stringify(this.keyboards) );
  }
});

module.exports = Keyboards;
