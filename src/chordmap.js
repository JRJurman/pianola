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

var getMajor = function(note) {
  return getFingering(note, [0, 4, 7]);
}

var getMinor = function(note) {
  return getFingering(note, [0, 3, 7]);
}

var getM7 = function(note) {
  return getFingering(note, [0, 3, 7, 10])
}

var getMaj7 = function(note) {
  return getFingering(note, [0, 4, 7, 11]);
}

var getDominant7 = function(note) {
  return getFingering(note, [0, 4, 7, 10]);
}

var getDim = function(note) {
  return getFingering(note, [0, 3, 6]);
}

var keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

keys.forEach( function(e) {
   chordmap[e+" major"] = getMajor(e);
   chordmap[e+" minor"] = getMinor(e);
   chordmap[e+" 7"] = getDominant7(e);
   chordmap[e+" maj7"] = getMaj7(e);
   chordmap[e+" m7"] = getM7(e);
   chordmap[e+" dim"] = getDim(e);
});
