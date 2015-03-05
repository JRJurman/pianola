// keyboard.jsx
// created By Jesse Jurman
// describes the different react classes to render the keyboard

var React = require('react');

// keyboard class which has 3 octives
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
    var voices = this.props.value.split("|");

    var fingering = voices[voicing].split(";");
    var first = fingering[0];
    var second = fingering[1];
    var third = fingering[2];

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
    var octive_width = white_key_width*7;
    var keyboard_width = octive_width*3;

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
            <Octive number="0" selected={first} />
            <Octive number="1" selected={second} />
            <Octive number="2" selected={third} />
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

// a single octive, really an svg
// it contains all the white keys and black keys,
// and highlights keys from the selected props (from Keyboard).
// keys are highlighted using the keyboard.css class "selected"
var Octive = React.createClass({
  render: function() {
    var white_key_width = 15;
    var number = this.props.number;
    var width = white_key_width*7;
    var selected_notes = this.props.selected;
    function selected(note) {
      return selected_notes.indexOf(note) != -1;
    }
    return (
      <g transform={"translate("+ width*number +",0)"}>
        <WhiteKey note="C" number={number} selected={selected("Cn")} />
        <WhiteKey note="D" number={number} selected={selected("Dn")} />
        <WhiteKey note="E" number={number} selected={selected("En")} />
        <WhiteKey note="F" number={number} selected={selected("Fn")} />
        <WhiteKey note="G" number={number} selected={selected("Gn")} />
        <WhiteKey note="A" number={number} selected={selected("An")} />
        <WhiteKey note="B" number={number} selected={selected("Bn")} />

        <BlackKey note="C" number={number} selected={selected("C#")} />
        <BlackKey note="D" number={number} selected={selected("D#")} />
        <BlackKey note="F" number={number} selected={selected("F#")} />
        <BlackKey note="G" number={number} selected={selected("G#")} />
        <BlackKey note="A" number={number} selected={selected("A#")} />
      </g>
    );
  }
})

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
