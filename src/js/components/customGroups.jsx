// customGroups.jsx
// created By Jesse Jurman
// react class that sets custom chords for the selectize input

var React = require('react');
var Teoria = require('../lib/teoria');


// The default chord options groups by what chords were created last session
var CustomGroups = React.createClass({
  render: function() {
    var groupArray = this.props.customChords.filter( (k) => {
      return ((k.type == "chord") && (this.props.chordTruths.defaultChords.indexOf(k.name) == -1))
    }).map( (k, i, chords) => {
      var tchord = Teoria.chord(k.name);
      var ttonic = tchord.root.name().toUpperCase();
      return (<DefaultChords generalChords={chords} key={"custom-"+k.name} tonic={ttonic} />);
    });
    return (
      <div>
        {groupArray}
      </div>
    );
  }
});

// The chords from the general_chords in the chordTruths object
var DefaultChords = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var chordArray = this.props.generalChords.map( function(c) {
      return (<Chord key={c.name} tonic={tonic} chord={c.name} />);
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
    var chord = this.props.chord;

    return (
      <option value={chord}>{chord}</option>
    );
  }
});

module.exports = CustomGroups;
