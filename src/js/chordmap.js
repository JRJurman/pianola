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
  var octiveSet = ["", "", ""]
  var components = [];
  steps.forEach( function(e) {
    // if we get a note (exclusively for the base)
    if (isNaN(e)) {
      components.push(getIndex(e) - 12);
    }
    else {
      components.push(getIndex(note) + e);
    }
  });
  components.forEach( function(element) {
    if (element < base_keyset.length) {
      octiveSet[0] += keyset[element] + " ";
    }
    else if (element < base_keyset.length*2) {
      octiveSet[1] += keyset[element] + " ";
    }
    else {
      octiveSet[2] += keyset[element] + " ";
    }
  });
  return octiveSet;
};

// for every key, add all the chords to the chordMap
chordTruths.keys.forEach( function(key) {

  // the generic chords
  chordTruths.chords.forEach( function(chord) {
    var fings = [];

    // for all the step variations, add to fings the fingerings
    chordTruths.chordSteps[chord].forEach( function(stepsCombo) {
      fings.push( getFingering(key, stepsCombo ).join(";") );
    });

    chordMap[key+chord] = {
      tonic:key, value: fings.join("|")
    };
  });

});

module.exports = chordMap;
