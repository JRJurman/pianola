var chordmap = {};

var base_keyset = ["Cn", "C#", "Dn", "D#", "En", "Fn", "F#", "Gn", "G#", "An", "A#", "Bn"]
var keyset = [base_keyset, base_keyset, base_keyset].join(",").split(",");
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

var keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

keys.forEach( function(e) {
   chordmap[e+" major"] = getFingering(note, [0, 4, 7]);
   chordmap[e+" minor"] = getFingering(note, [0, 3, 7]);
   chordmap[e+" 7"] = getFingering(note, [0, 4, 7, 10]);
   chordmap[e+" m7"] = getFingering(note, [0, 3, 7, 10]);
   chordmap[e+" maj7"] = getFingering(note, [0, 4, 7, 11]);
   chordmap[e+" mM7"] = getFingering(note, [0, 3, 7, 11]);
   chordmap[e+" 7b5"] = getFingering(note, [0, 4, 6, 10]);
   chordmap[e+" 7#5"] = getFingering(note, [0, 4, 8, 10]);
   chordmap[e+" 7b9"] = getFingering(note, [0, 4, 7, 10, 13]);
   chordmap[e+" 7#9"] = getFingering(note, [0, 4, 7, 10, 15]);
   chordmap[e+" b5"] = getFingering(note, [0, 4, 6]);
   chordmap[e+" 5"] = getFingering(note, [0, 7, 12]);

   chordmap[e+" dim"] = getFingering(note, [0, 3, 6]);
});
