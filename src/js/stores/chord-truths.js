// chord-truths.js
// created By Jesse Jurman
// this file stores a few constants

var Fluxxor = require('fluxxor');

var ChordTruths = Fluxxor.createStore({

  initialize: function() {
    this.keys = ["C", "C#", "Db", "D", "D#", "Eb",
      "E", "F", "F#", "Gb", "G", "G#", "Ab",
      "A", "A#", "Bb", "B"];

    this.generalChords = [
      "", "m", "7", "m7", "M7", " dim", "aug", "6", "m6", "sus4", "sus2"
    ];

    this.defaultChords = this.keys.reduce( (chords, key, i, keys) => {
      Array.prototype.push.apply(chords, this.generalChords.map( (k) => { return key+k }));
      return chords;
    }, []);
  },

  getState: function() {
    return {
      keys: this.keys,
      generalChords: this.generalChords,
      defaultChords: this.defaultChords
    }
  }
});

module.exports = ChordTruths;
