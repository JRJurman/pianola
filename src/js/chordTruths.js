// chordTruths.js
// created By Jesse Jurman
// this file stores the effective constants, it is an attempt to reduce
// the amount of repeated code throughout the project

var chordTruths = {};

chordTruths.keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

chordTruths.general_chords = [
  "", "m", "7", "m7", "M7", " dim", "aug", "6", "m6", "sus4", "sus2"
];

chordTruths.abbrv = {
  'm':'minor',
  'M':'major',
  'sus4':'sus'
};

module.exports = chordTruths;
