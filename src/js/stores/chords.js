// chords.js
// created By Kristen Mills and Jesse Jurman
// Stores the currently selected stores

var Fluxxor = require('fluxxor');

var constants = require('../constants/chords');

var Chords = Fluxxor.createStore({

  initialize: function() {
    this.chords = JSON.parse(localStorage.chords || "[]");

    this.bindActions(
      constants.ADD_CHORD, this.onAddChord,
      constants.REMOVE_CHORD, this.onRemoveChord,
      constants.SET_CHORD_INVERSION, this.onSetChordInversion
    );
  },

  onAddChord: function(payload) {
    this.chords.splice(payload.index, 0, payload.chord)
    this.emit('change');
    this.save();
  },

  onRemoveChord: function(payload) {
    this.chords.splice(payload.index, 1);
    this.emit('change');
    this.save();
  },

  onSetChordInversion: function(payload) {
    this.chords.indexOf(payload.chord).inversion = payload.inversion;
    this.emit('change');
    this.save();
  },

  getState: function() {
    return this.chords;
  },

  save: function() {
    localStorage.setItem('chords', JSON.stringify(this.chords) );
  }
});

module.exports = Chords;
