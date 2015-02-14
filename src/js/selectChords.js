// selectChords.js
// created By Jesse Jurman
// react class that renders the selectize input

var React = require('react');
var keyboarderizer = require('./keyboarderizer');
var popDropdown = require('./popDropdown');
var chordMap = require('./chordMap');

var SelectChords = React.createClass({
  render: function() {
    var placeholder = "Click here, and type in a chord..."
    return (
      <select id="input-tags" ref="selectize" multiple placeholder={placeholder}>
      </select>
    );
  },

  // when it mounts, add all the selectize attributes
  componentDidMount: function() {
    var chords = Object.keys(chordMap);
    var keys = ["C", "C#", "Db", "D", "D#", "Eb",
     "E", "F", "F#", "Gb", "G", "G#", "Ab",
     "A", "A#", "Bb", "B"];

    // TODO: is this redundent?
    var chords = chords.map( function(e) {
      return {tonic:chordMap[e].tonic, chord:e}
    });

    var select = $(this.refs.selectize.getDOMNode()).selectize({
      delimiter: ',',
      persist: false,
      maxOptions: 5,
      onChange: function() {
        keyboarderizer();
        popDropdown();
      },
      onDropdownOpen: function() {
        popDropdown();
      },
      onDropdownClose: function() {
        popDropdown();
      },

      optgroupField: 'tonic',
      labelField: 'chord',
      valueField: 'chord',
      //sortField: ['sortId'], // C- something or other
      searchField: ['chord'],
      render: {
        option: function(data) {
          return '<option tonic=\"'+data.tonic+'\" chord=\"'+data.chord+'\">'+ data.chord + '</option>';
        }
      },

    });

    var selectize = select[0].selectize;

    keys.forEach( function(k) {
      selectize.addOptionGroup(k, {'label':k, 'value':k});
    });
    selectize.addOption(chords);

    selectize.refreshOptions(true);

    // TODO move this
    window.onresize = function() {
      keyboarderizer();
    };
  }
});

module.exports = SelectChords;
