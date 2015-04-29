// keyboardScale.jsx
// created By Jesse Jurman
// describes the different react classes to render the keyboard

var React = require('react');
var Teoria = require('../lib/teoria');
var Octave = require('./octave');

// keyboard class for scales, which has 3 Octaves
// it takes in an object, with first, second, and third attributes
var KeyboardChord = React.createClass({
  render: function() {

    // use Teoria to build visual chord object
    var scale = this.props.keyboardObject;
    var teoScale = Teoria.note( scale.tonic ).scale( scale.scale.toLocaleLowerCase() );

    // determine the lowest and highest chord
    var lowOctave, highOctave, disparity, startOctave;
    teoScale.notes().forEach( function( note ) {
      lowOctave = Math.min(lowOctave || 100, note.octave());
      highOctave = Math.max(highOctave || -1, note.octave());
    });
    var disparity = highOctave - lowOctave;
    var startOctave;

    // if the disparity is >= 2, we have too many octaves,
    // just start from the lowest
    if ( disparity >= 2 ) {
      startOctave = lowOctave;
    }
    // if the disparity is < 2, we have enough that we can center the chord,
    // start from the lowest - 1
    else {
      startOctave = lowOctave - 1;
    }

    // function, when given a set of notes, returns a set within an octave
    function checkOctave(notes, octave) {
      return notes.reduce( function(o_notes, note) {
        // reduce down to a list for the notes in this octave
        if (note.octave() == octave) {
          o_notes.push(note);
        }
        return o_notes;
      }, []).map( function(n) {
        // return a mapping with just names
        return n.scientific()
      }).join(",");
      // join the whole list into one string
    };

    // get the notes for our (visually) first, second, and third octave
    var first  = checkOctave(teoScale.notes(), startOctave+0);
    var second = checkOctave(teoScale.notes(), startOctave+1);
    var third  = checkOctave(teoScale.notes(), startOctave+2);

    // some defaults for size
    var white_key_width = 15;
    var Octave_width = white_key_width*7;
    var keyboard_width = Octave_width*3;

    // the viewBox is a list of min-width, min-height, width, and height
    // we use this to properly scale our keyboards out to the correct size
    var viewBox_value = "0 0 "+keyboard_width+" 50"

    return (
      <div className="no-break col-sm-6">
        <div className="chord-header">
          <h3>
            {this.props.keyboardObject.name}
          </h3>
        </div>
        <div className="svg-divbox">
          <svg className="svg-keyboard scale-keyboard" viewBox={viewBox_value}>
            <Octave number="0" selected={first} />
            <Octave number="1" selected={second} />
            <Octave number="2" selected={third} />
          </svg>
        </div>
      </div>
    );
  }
});

module.exports = KeyboardChord;
