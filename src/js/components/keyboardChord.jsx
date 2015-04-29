// keyboardChord.jsx
// created By Jesse Jurman
// describes the different react classes to render the keyboard

var React = require('react');
var Teoria = require('../lib/teoria');
var InversionDot = require('./inversionDot');
var Octave = require('./octave');

// keyboard class for chords, which has 3 Octaves
// it takes in an object, with first, second, and third attributes
var KeyboardChord = React.createClass({
  render: function() {

    // use Teoria to build visual chord object
    var chord = this.props.keyboardObject;
    var teoChord = Teoria.chord( chord.name );

    // build invChord based on inversion from teoChord
    // only use those notes that are 0 or greater semitones (not in the bass)
    var invChord = teoChord.notes().filter( function( note, index ) {
      return teoChord.voicing()[index].semitones() >= 0;
    }).map( function( note, index, notes ) {
      // nd - note disparity
      var nd = teoChord.notes().length - notes.length;
      var inv = 12 * (index < chord.inversion)
      return Teoria.note.fromKey(teoChord.notes()[index + nd].key() + inv);
    });

    // if we removed the bass, we need to add it again here
    // also, record the fact that we did have a bass
    var hasBass = false;
    teoChord.notes().forEach( function( note, index ) {
      if (teoChord.voicing()[index].semitones() < 0) {
        hasBass = true;
        invChord.unshift( note );
      }
    });


    // replicate the notes() functionality from teoChord
    invChord.notes = function() {return this;}

    // determine the lowest and highest chord
    var lowOctave, highOctave, disparity, startOctave;
    invChord.notes().forEach( function( note ) {
      lowOctave = Math.min(lowOctave || 100, note.octave());
      highOctave = Math.max(highOctave || -1, note.octave());
    });
    var disparity = highOctave - lowOctave;
    var startOctave;

    // if we have a bass, use that as our start octave
    if ( hasBass ) {
      startOctave = invChord.notes()[0].octave();
    }
    // if the disparity is >= 2, we have too many octaves,
    // just start from the lowest
    else if ( disparity >= 2 ) {
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
    var first  = checkOctave(invChord.notes(), startOctave+0);
    var second = checkOctave(invChord.notes(), startOctave+1);
    var third  = checkOctave(invChord.notes(), startOctave+2);

    // some defaults for size
    var white_key_width = 15;
    var Octave_width = white_key_width*7;
    var keyboard_width = Octave_width*3;

    // build the inversion dots
    // only use those notes that are 0 or greater semitones (not in the bass)
    inversionDots = teoChord.notes().filter( function( note, index ) {
      return teoChord.voicing()[index].semitones() >= 0;
    })
    .map( function(note, index) {
      return ( <InversionDot  key={index}
                              chord={chord}
                              inversion={index} />
      );
    });

    // the viewBox is a list of min-width, min-height, width, and height
    // we use this to properly scale our keyboards out to the correct size
    var viewBox_value = "0 0 "+keyboard_width+" 50"

    return (
      <div className="no-break col-sm-6">
        <div className="chord-header">
          <h3>
            {this.props.keyboardObject.name}
            <span className="dots">
              {inversionDots}
            </span>
          </h3>
        </div>
        <div className="svg-divbox">
          <svg className="svg-keyboard chord-keyboard" viewBox={viewBox_value}>
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
