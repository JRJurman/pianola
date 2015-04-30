// octave.jsx
// created By Jesse Jurman
// represents a single portion of the keyboard

var React = require('react');
var Teoria = require('../lib/teoria');

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
    var classname = "white-key key "+this.props.note+this.props.number;
    if (this.props.selected) {
      classname += " selected";
    }
    var width=15;
    var height=50;
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
      <g>
        <rect className={classname} x={position} width={width} height={height} />
        <circle className={classname} cx={position+(width/2)} cy={height*0.80} r={width/3}/>
      </g>
    );
  }
});

// A single black key, really an svg-rectangle
var BlackKey = React.createClass({
  render: function() {
    var white_key_width = 15;
    var classname = "black-key key "+this.props.note+this.props.number;
    var style = {};
    if (this.props.selected) {
      classname += " selected";
      style.fill = "url('#')"
    }
    var width=8;
    var height=25;
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
      <g>
        <rect className={classname} x={position} width={width} height={height} />
        <circle className={classname} cx={position+(width/2)} cy={height*0.80} r={white_key_width/3}/>
      </g>
    )
  }
});

module.exports = Octave;
