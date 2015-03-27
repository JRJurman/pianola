// chord-truths.js
// created By Jesse Jurman
// this file stores the effective constants, it is an attempt to reduce
// the amount of repeated code throughout the project
var Fluxxor = require('fluxxor');

var ChordTruths = Fluxxor.createStore({

  initialize() {
    this.keys = ["C", "C#", "Db", "D", "D#", "Eb",
      "E", "F", "F#", "Gb", "G", "G#", "Ab",
      "A", "A#", "Bb", "B"];

    this.generalChords = [
      "", "m", "7", "m7", "M7", " dim", "aug", "6", "m6", "sus4", "sus2"
    ];
  },

  getState() {
    return {
      keys: this.keys,
      generalChords: this.generalChords
    }
  }
});

module.exports = ChordTruths;
