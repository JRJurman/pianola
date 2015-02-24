// chordTruths.js
// created By Jesse Jurman
// this file stores the effective constants, it is an attempt to reduce
// the amount of repeated code throughout the project

var chordTruths = {};

chordTruths.base_keyset = [
  "Cn", "C#", "Dn", "D#", "En", "Fn", "F#", "Gn", "G#", "An", "A#", "Bn"
];

chordTruths.keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

// normal chords
chordTruths.chordSteps = {
  "" : [[0, 4, 7]],
  "minor" : [[0, 3, 7]],
  "7" : [[0, 4, 7, 10]],
  "m7" : [[0, 3, 7, 10]],
  "maj7" : [[0, 4, 7, 11]],
  "mM7" : [[0, 3, 7, 11]],
  "7b5" : [[0, 4, 6, 10]],
  "7#5" : [[0, 4, 8, 10]],
  "7b9" : [[0, 4, 7, 10, 13]],
  "7#9" : [[0, 4, 7, 10, 15]],
  "b5" : [[0, 4, 6]],
  "5" : [[0, 7]],
  "dim" : [[0, 3, 6]]
};

chordTruths.chords = Object.keys(chordTruths.chordSteps).sort();

// slicing happens a lot here to keep arrays unique
chordTruths.chords.forEach( function(chord) {
  mChord = chordTruths.chordSteps[chord][0].slice();
  chordTruths.chordSteps[chord][0].slice(1).forEach( function(notes) {
    mChord = mChord.slice();
    mChord.push( (mChord.shift() + 12) % 24 );
    chordTruths.chordSteps[chord].push( mChord.slice() );
  });
});

module.exports = chordTruths;
