var chordmap = {
  "C 7": {
    first:"",
    second:"Cn, En, Gn, A#",
    third:""
  },
  "C/F": {
    first:"Fn",
    second:"Cn, En, Gn",
    third:""
  },
  "F sus": {
    first:"",
    second:"Fn, A#",
    third:"Cn"
  },
  "F/A": {
    first:"An",
    second:"Fn, An",
    third:"Cn"
  }
}

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

var getScale = function(steps) {
  return steps.map( function(element, index, array) {
    return array.slice(0,index+1).reduce( function(prevValue, currValue) {
      return prevValue+currValue;
    });
  });
};

var getDegrees = function(note, steps) {
  var noteIndex = getIndex(note);
  var scale = getScale(steps)
  return {
    tonic: noteIndex,
    supertonic: noteIndex + scale[0],
    mediant: noteIndex + scale[1],
    subdominant: noteIndex + scale[2],
    dominant: noteIndex + scale[3],
    submediant: noteIndex + scale[4],
    leading: noteIndex + scale[5],
    octave: noteIndex + scale[6]
  };
}

var getFingering = function(note, steps, degrees) {
  var mDeg = getDegrees(note, steps);
  var octiveSet = {first: "", second: "", third: ""};
  var components = [];
  degrees.forEach( function(e) {
    components.push(mDeg[e]);
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
  // whole whole half whole whole whole half
  return getFingering(note, [2,2,1,2,2,2,1], ["tonic", "mediant", "dominant"]);
}

var getMinor = function(note) {
  // whole half whole whole half whole whole
  return getFingering(note, [2,1,2,2,1,2,2], ["tonic", "mediant", "dominant"]);
}

// TODO FIX THIS!
var getMajor7 = function(note) {
  // whole whole half whole whole whole half
  return getFingering(note, [2,2,1,2,2,2,1], ["tonic", "mediant", "dominant", "leading"]);
}

var keys = ["C", "C#", "Db", "D", "D#", "Eb",
 "E", "F", "F#", "Gb", "G", "G#", "Ab",
 "A", "A#", "Bb", "B"];

keys.forEach( function(e) {
   chordmap[e+" major"] = getMajor(e);
   chordmap[e+" minor"] = getMinor(e);
  //  chordmap[e+" 7"] = getMajor7(e);
});
