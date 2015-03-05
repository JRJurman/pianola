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

chordTruths.chordSteps = {
  /* these are from 8notes, and their hip interface here:
     http://www.8notes.com/resources/notefinders/piano_chords.asp
  */
  "" : [[0, 4, 7]],
  "m" : [[0, 3, 7]],
  "5" : [[0, 7]],
  "7" : [[0, 4, 7, 10]],
  "M7" : [[0, 4, 7, 11]],
  "m7" : [[0, 3, 7, 10]],
  "mM7" : [[0, 3, 7, 11]],
  "sus4" : [[0, 5, 7]],
  "sus2" : [[0, 2, 7]],
  "6" : [[0, 4, 7, 9]],
  "m6" : [[0, 3, 7, 9]],
  "9" : [[0, 2, 4, 7, 10]],
  "m9" : [[0, 2, 3, 7, 10]],
  "M9" : [[0, 2, 4, 7, 11]],
  "mM9" : [[0, 2, 3, 7, 11]],
  "11" : [[0, 2, 4, 5, 7, 10]],
  "m11" : [[0, 2, 3, 5, 7, 10]],
  "M11" : [[0, 2, 4, 5, 7, 11]],
  "mM11" : [[0, 2, 3, 5, 7, 11]],
  "13" : [[0, 2, 4, 7, 9, 10]],
  "m13" : [[0, 2, 3, 7, 9, 10]],
  "M13" : [[0, 2, 4, 7, 9, 11]],
  "mM13" : [[0, 2, 3, 7, 9, 11]],
  " add 9" : [[0, 2, 4, 7]],
  "m add 9" : [[0, 2, 3, 7]],
  "6 add 9" : [[0, 2, 4, 7, 9]],
  "m 6 add 9" : [[0, 2, 3, 7, 9]],
  "7 add 11" : [[0, 4, 5, 7, 10]],
  "M7 add 11" : [[0, 4, 5, 7, 11]],
  "m7 add 11" : [[0, 3, 5, 7, 10]],
  "mM7 add 11" : [[0, 3, 5, 7, 11]],
  "7 add 13" : [[0, 4, 7, 9, 10]],
  "M7 add 13" : [[0, 4, 7, 9, 11]],
  "m7 add 13" : [[0, 3, 7, 9, 10]],
  "mM7 add 13" : [[0, 3, 7, 9, 11]],
  "7b5" : [[0, 4, 6, 10]],
  "7#5" : [[0, 4, 8, 10]],
  "7b9" : [[0, 1, 4, 7, 10]],
  "7#9" : [[0, 3, 4, 7, 10]],
  "7#5b9" : [[0, 1, 4, 8, 10]],
  "m7b5" : [[0, 3, 6, 10]],
  "m7#5" : [[0, 3, 8, 10]],
  "m7b9" : [[0, 1, 3, 7, 10]],
  "9#11" : [[0, 2, 4, 6, 7, 10]],
  "9b13" : [[0, 2, 4, 7, 8, 10]],
  "6sus4" : [[0, 5, 7, 9]],
  "7sus4" : [[0, 5, 7, 10]],
  "M7sus4" : [[0, 5, 7, 11]],
  "9sus4" : [[0, 2, 5, 7, 10]],
  "M9sus4" : [[0, 2, 5, 7, 11]],

  /* these are from 8notes's significantly less hip interface:
     http://www.8notes.com/piano_chord_chart/C.asp
  */
  "b5" : [[0, 4, 6]],
  "dim" : [[0, 3, 6]],
  "half-dim" : [[0, 3, 6, 10]],
  "dim7" : [[0, 3, 6, 9]],
  "aug" : [[0, 4, 8]]
};

chordTruths.abbrv = {
  'm':'minor',
  'M':'major',
  'sus4':'sus'
}

// add the bases for the major chord with each key
chordTruths.keys.forEach( function(key) {
  chordTruths.chordSteps["/"+key] = [[key, 0, 4, 7]]
});

chordTruths.chords = Object.keys(chordTruths.chordSteps).sort();

// slicing happens a lot here to keep arrays unique
chordTruths.chords.forEach( function(chord) {
  mChord = chordTruths.chordSteps[chord][0].slice();
  chordTruths.chordSteps[chord][0].slice(1).forEach( function(notes) {
    mChord = mChord.slice();
    var base = undefined;
    if ( isNaN(mChord[0]) ) {
      base = mChord.shift();
    }
    mChord.push( (mChord.shift() + 12) % 24 );
    if (base !== undefined) {
      mChord.unshift(base);
    }
    chordTruths.chordSteps[chord].push( mChord.slice() );
  });
});

module.exports = chordTruths;
