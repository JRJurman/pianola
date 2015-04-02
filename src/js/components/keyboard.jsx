// keyboard.jsx
// created By Jesse Jurman
// describes the different react classes to render the keyboard

var React = require('react');
var Teoria = require('teoria');
var InversionDot = require('./inversionDot');

// keyboard class which has 3 Octaves
// it takes in an object, with first, second, and third attributes
var Keyboard = React.createClass({
  render: function() {

    // use Teoria to build visual chord object
    var chord = this.props.chord;
    var teoChord = Teoria.chord( chord.name );

    // build invChord based on inversion from teoChord
    var invChord = teoChord.notes().map( function( note, index ) {
      var inv = 12 * (index < chord.inversion)
      return Teoria.note.fromKey(teoChord.notes()[index].key() + inv);
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
    var first  = checkOctave(invChord.notes(), startOctave+0);
    var second = checkOctave(invChord.notes(), startOctave+1);
    var third  = checkOctave(invChord.notes(), startOctave+2);

    // some defaults for size
    var white_key_width = 15;
    var Octave_width = white_key_width*7;
    var keyboard_width = Octave_width*3;

    // build the inversion dots
    inversionDots = invChord.notes().map( function(note, index) {
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
            {this.props.chord.name}
            <span className="dots">
              {inversionDots}
            </span>
          </h3>
        </div>
        <div className="svg-divbox">
          <svg className="svg-keyboard" viewBox={viewBox_value}>
            <Octave number="0" selected={first} />
            <Octave number="1" selected={second} />
            <Octave number="2" selected={third} />
          </svg>
        </div>
      </div>
    );
  }
});

// a single Octave, really an svg
// it contains all the white keys and black keys,
// and highlights keys from the selected props (from Keyboard).
// keys are highlighted using the keyboard.css class "selected"
var Octave = React.createClass({
  render: function() {
    var white_key_width = 15;
    var number = this.props.number;
    var width = white_key_width*7;
    var selected_pianoKeys = this.props.selected.split(",").map( function(n) {
      if (n != "") {
        return Teoria.note(n).key() % 12;
      }
    });
    function selected(pianoKey) {
      return selected_pianoKeys.indexOf(pianoKey) != -1;
    }
    return (
      <g transform={"translate("+ width*number +",0)"}>
        <WhiteKey note="C" number={number} selected={selected(4)} />
        <WhiteKey note="D" number={number} selected={selected(6)} />
        <WhiteKey note="E" number={number} selected={selected(8)} />
        <WhiteKey note="F" number={number} selected={selected(9)} />
        <WhiteKey note="G" number={number} selected={selected(11)} />
        <WhiteKey note="A" number={number} selected={selected(1)} />
        <WhiteKey note="B" number={number} selected={selected(3)} />

        <BlackKey note="C" number={number} selected={selected(5)} />
        <BlackKey note="D" number={number} selected={selected(7)} />
        <BlackKey note="F" number={number} selected={selected(10)} />
        <BlackKey note="G" number={number} selected={selected(0)} />
        <BlackKey note="A" number={number} selected={selected(2)} />
      </g>
    );
  }
});

// A single white key, really an svg-rectangle
var WhiteKey = React.createClass({
  render: function() {
    var classname = "white-key "+this.props.note+this.props.number;
    if (this.props.selected) {
      classname += " selected";
    }
    var width=15;
    var note_position;
    if (this.props.note >= "C") {
      note_position = this.props.note.charCodeAt() - 67;
    }
    else {
      // for notes [A, C)
      note_position = this.props.note.charCodeAt()+7 - 67;
    }
    var position = width * (note_position);
    return (
      <rect className={classname} x={position} width={width} height="50" />
    );
  }
});

// A single black key, really an svg-rectangle
var BlackKey = React.createClass({
  render: function() {
    var white_key_width = 15;
    var classname = "black-key "+this.props.note+this.props.number;
    if (this.props.selected) {
      classname += " selected";
    }
    var width=8;
    var note_position;
    if (this.props.note >= "C") {
      note_position = this.props.note.charCodeAt() - 67;
    }
    else {
      // for notes [A, C)
      note_position = this.props.note.charCodeAt()+7 - 67;
    }
    var position = white_key_width * (note_position) + 11;
    return (
      <rect className={classname} x={position} width={width} height="25" />
    )
  }
});

module.exports = Keyboard;
