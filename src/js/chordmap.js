// chordMap.js
// created By Jesse Jurman
// this file is made to store all the chords, and their fingerings

var chordTruths = require('./chordTruths');

var chordMap = {};

var base_keyset = chordTruths.base_keyset;

// keys, as they are understood by the Keyboard class
var keyset = [base_keyset, base_keyset, base_keyset].join(",").split(",");

// Give us a base index (if flat "b", choose the sharp of the previous chord)
var getIndex = function(note) {
  if (note.length == 1) {
    note = note + "n";
  }
  if (note[1] == "b") {
    note = keyset[ keyset.indexOf(note[0]+"n") -1];
  }
  var noteIndex = keyset.indexOf(note) + base_keyset.length;

  return noteIndex;
}

// Get fingering for each of the octives, that will be rendered in Keyboard
var getFingering = function(note, steps) {
  var octiveSet = {first: "", second: "", third: ""};
  var components = [];
  steps.forEach( function(e) {
    components.push(getIndex(note) + e);
  });
  components.forEach( function(element) {
    if (element < base_keyset.length) {
      octiveSet.first += keyset[element] + " ";
    }
    else if (element < base_keyset.length*2) {
      octiveSet.second += keyset[element] + " ";
    }
    else {
      octiveSet.third += keyset[element] + " ";
    }
  });
  return octiveSet;
};

chordTruths.keys.forEach( function(key) {
  chordTruths.chords.forEach( function(chord) {
    chordMap[key+" "+chord] = {
      tonic:key, value: getFingering(key, chordTruths.chordSteps[chord])
    };
  });
});

module.exports = chordMap;
