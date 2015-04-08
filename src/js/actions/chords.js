var constants = require('../constants/chords');

function addChord(chord, index) {
  this.dispatch(constants.ADD_CHORD, {chord: chord, index: index});
}

function removeChord(index) {
  this.dispatch(constants.REMOVE_CHORD, {index: index});
}

function setChordInversion(chord, inversion) {
  this.dispatch(constants.SET_CHORD_INVERSION, {chord: chord, inversion: inversion});
}


module.exports = {
  addChord: addChord,
  setChordInversion: setChordInversion,
  removeChord: removeChord
}
