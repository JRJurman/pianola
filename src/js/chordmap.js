// chordMap.js
// created By Jesse Jurman
// this file is made to store all the chords, and their fingerings

var chordMap = {};

// keys, as they are understood by the Keyboard class
var base_keyset = ["Cn", "C#", "Dn", "D#", "En", "Fn", "F#", "Gn", "G#", "An", "A#", "Bn"]
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

// every key, for which each of the chords can be applied
// e.g. "C" major, "C#" major, "Db" major, etc...
var keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

keys.forEach( function(e) {
  chordMap[e+" major"] = {tonic:e, value: getFingering(e, [0, 4, 7]) };
  chordMap[e+" minor"] = {tonic:e, value: getFingering(e, [0, 3, 7]) };
  chordMap[e+" 7"] = {tonic:e, value: getFingering(e, [0, 4, 7, 10]) };
  chordMap[e+" m7"] = {tonic:e, value: getFingering(e, [0, 3, 7, 10]) };
  chordMap[e+" maj7"] = {tonic:e, value: getFingering(e, [0, 4, 7, 11]) };
  chordMap[e+" mM7"] = {tonic:e, value: getFingering(e, [0, 3, 7, 11]) };
  chordMap[e+" 7b5"] = {tonic:e, value: getFingering(e, [0, 4, 6, 10]) };
  chordMap[e+" 7#5"] = {tonic:e, value: getFingering(e, [0, 4, 8, 10]) };
  chordMap[e+" 7b9"] = {tonic:e, value: getFingering(e, [0, 4, 7, 10, 13]) };
  chordMap[e+" 7#9"] = {tonic:e, value: getFingering(e, [0, 4, 7, 10, 15]) };
  chordMap[e+" b5"] = {tonic:e, value: getFingering(e, [0, 4, 6]) };
  chordMap[e+" 5"] = {tonic:e, value: getFingering(e, [0, 7, 12]) };
  chordMap[e+" dim"] = {tonic:e, value: getFingering(e, [0, 3, 6]) };
});

module.exports = chordMap;
