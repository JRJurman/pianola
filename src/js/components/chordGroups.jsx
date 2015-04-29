// chordGroups.jsx
// created By Jesse Jurman
// react class that sets chords for the selectize input

var React = require('react');

// The default chord options groups by key
var ChordGroups = React.createClass({
  render: function() {
    var groupArray = this.props.chordTruths.keys.map( (k) => {
      return (<DefaultChords generalChords={this.props.chordTruths.generalChords} key={k} tonic={k} />);
    });
    return (
      <div>
        {groupArray}
      </div>
    );
  }
})

// The chords from the general_chords in the chordTruths object
var DefaultChords = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var chordArray = this.props.generalChords.map( function(c) {
      return (<Chord key={c} tonic={tonic} chord={c} />);
    });
    return (
      <optgroup label={tonic + " Chords"}>
        {chordArray}
      </optgroup>
    );
  }
});

// A chord option which represents a possible default option
var Chord = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var chord = tonic + this.props.chord;

    return (
      <option value={chord}>{chord}</option>
    );
  }
});

module.exports = ChordGroups;
