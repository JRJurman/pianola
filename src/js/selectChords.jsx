// selectChords.jsx
// created By Jesse Jurman
// react class that renders the selectize input

var React = require('react');
var Keyboarder = require('./Keyboarder');
var popDropdown = require('./popDropdown');
var chordTruths = require('./chordTruths');

var SelectChords = React.createClass({
  render: function() {
    var placeholder = "Click here, and type in a chord...";
    return (
      <select id="input-tags" ref="chordinput" multiple placeholder={placeholder}>
        <ChordGroups />
      </select>
    );
  },

  // when it mounts, add all the selectize attributes
  componentDidMount: function() {

    var updater = this.props.update;
    var select = $(this.refs.chordinput.getDOMNode()).selectize({
      delimiter: ',',
      maxOptions: 5,
      onChange: function() {
        updater(this.items);
        popDropdown();
      },
      onDropdownOpen: function() {
        popDropdown();
      },
      onDropdownClose: function() {
        popDropdown();
      },

    });

  }
});

var ChordGroups = React.createClass({
  render: function() {
    var groupArray = chordTruths.keys.map( function(k) {
      return (<DefaultChords key={k} tonic={k} />);
    });
    return (
      <div>
        {groupArray}
      </div>
    );
  }
})

var DefaultChords = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var chordArray = chordTruths.chords.map( function(c) {
      return (<Chord key={c} tonic={tonic} chord={c} />);
    });
    return (
      <optgroup label={tonic}>
        {chordArray}
      </optgroup>
    );
  }
});

var Chord = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var chord = tonic + "" + this.props.chord;
    var chordSp = tonic + " " + this.props.chord;
    return (
      <option value={chordSp}>{chord}</option>
    );
  }
});

module.exports = SelectChords;
