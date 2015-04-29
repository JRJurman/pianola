var constants = require('../constants/keyboards');

function addChord(chord, index) {
  this.dispatch(constants.ADD_CHORD, {chord: chord, index: index});
}

function removeChord(index) {
  this.dispatch(constants.REMOVE_CHORD, {index: index});
}

function setChordInversion(chord, inversion) {
  this.dispatch(constants.SET_CHORD_INVERSION, {chord: chord, inversion: inversion});
}

function addScale(scale, index) {
  this.dispatch(constants.ADD_SCALE, {scale: scale, index: index});
}

function removeScale(index) {
  this.dispatch(constants.REMOVE_SCALE, {index: index});
}


module.exports = {
  addChord: addChord,
  removeChord: removeChord,
  setChordInversion: setChordInversion,
  addScale: addScale,
  removeScale: removeScale
}
