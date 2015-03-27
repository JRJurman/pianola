var constants = require('../constants/chords');

function addChord(chord) {
  this.dispatch(constants.ADD_CHORD, {chord: chord});
}

function removeChord(chord) {
  this.dispatch(constants.REMOVE_CHORD, {chord: chord});
}


module.exports = {
  addChord: addChord,
  removeChord: removeChord
 }
