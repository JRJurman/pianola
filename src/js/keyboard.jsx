// keyboard.jsx
// created By Jesse Jurman
// describes the different react classes to render the keyboard

var React = require('react');
var Teoria = require('teoria');

// keyboard class which has 3 Octaves
// it takes in an object, with first, second, and third attributes
var Keyboard = React.createClass({
  getInitialState: function() {
    return {voice: this.props.voicing};
  },
  handleClick: function(voicing) {
    this.setState( {voice: voicing} );
  },
  render: function() {
    // figure out what voicing we're playing
    var voicing = this.state.voice;

    // use Teoria to build visual chord object
    var teoChord = Teoria.chord( this.props.chord );

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

    var first = checkOctave(teoChord.notes(), 3)
    var second = checkOctave(teoChord.notes(), 4);
    var third = checkOctave(teoChord.notes(), 5);

    var voices = [];
    // render the different voicedots possible for this chord
    var voiceDots = voices.map( (value, index) => {
      var vTrue = voicing==index ? "fa-circle selected" : "fa-circle-o";
      return ( <VoicingDot  key={index}
                            click={this.handleClick}
                            selected={vTrue}
                            voicing={index} />
      );
    });

    var white_key_width = 15;
    var Octave_width = white_key_width*7;
    var keyboard_width = Octave_width*3;

    // the viewBox is a list of min-width, min-height, width, and height
    // we use this to properly scale our keyboards out to the correct size
    var viewBox_value = "0 0 "+keyboard_width+" 50"

    return (
      <div className="no-break col-sm-6">
        <div className="chord-header">
          <h3>{this.props.chord} <span className="dots"> {voiceDots} </span> </h3>
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

// A voicing dot, which allows the user to change the voicing of the chord
var VoicingDot = React.createClass({
  onClick: function() {
    this.props.click(this.props.voicing);
  },
  render: function() {
    var words = [ "first", "second", "third", "fourth",
                  "fifth", "sixth", "seventh", "eighth",
                  "ninth", "tenth", "eleventh", "twelfth"];
    var text = words[this.props.voicing] + " voicing";
    var classText = "fa " + this.props.selected;
    return (
      <i
        className={classText}
        ref="voicinginput"
        data-toggle="tooltip"
        data-placement="top"
        onClick={this.onClick}
        title=""
        data-original-title={text} />
    );
  },
  componentDidMount: function() {
    $(this.refs.voicinginput.getDOMNode()).tooltip();
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
