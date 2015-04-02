var constants = require('../constants/chords');

function addChord(chord) {
  this.dispatch(constants.ADD_CHORD, {chord: chord});
}

function removeChord(chord) {
  this.dispatch(constants.REMOVE_CHORD, {chord: chord});
}

function setChordInversion(chord, inversion) {
  this.dispatch(constants.SET_CHORD_INVERSION, {chord: chord, inversion: inversion});
}


module.exports = {
  addChord: addChord,
  setChordInversion: setChordInversion,
  removeChord: removeChord
}
