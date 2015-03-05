// selectChords.jsx
// created By Jesse Jurman
// react class that renders the selectize input

var React = require('react');
var Keyboarder = require('./Keyboarder');
var chordTruths = require('./chordTruths');

var SelectChords = React.createClass({
  getInitialState: function() {
    return {spacer: {}};
  },

  render: function() {
    var placeholder = "Click here, and type in a chord...";
    return (
      <div>
        <select id="input-tags" ref="chordinput" multiple placeholder={placeholder}>
          <ChordGroups />
        </select>
        <div id="spacer" style={this.state.spacer}></div>
      </div>
    );
  },

  popDropDown: function() {
    // grab the hieght of the dropdown
    var dropbox = document.querySelector(".selectize-dropdown-content");
    var newHeight = dropbox.getBoundingClientRect().height;

    this.setState({spacer: {marginTop:`${newHeight}px`}});
  },

  // when it mounts, add all the selectize attributes
  componentDidMount: function() {
    var self = this;
    var updater = this.props.update;
    var select = $(this.refs.chordinput.getDOMNode()).selectize({
      delimiter: ',',
      maxOptions: 5,
      onChange: function() {
        updater(this.items);
        self.popDropDown();
      },
      onDropdownOpen: function() {
        self.popDropDown();
      },
      onDropdownClose: function() {
        self.popDropDown();
      },
      render: {
				option: function(data, escape) {
          var legends = [];
          Object.keys(chordTruths.abbrv).forEach( function(abbrv) {
            if (data["value"].indexOf(abbrv) !== -1) {
              legends.push(" " + abbrv + ' <i class="fa fa-long-arrow-right"></i> ' + chordTruths.abbrv[abbrv]);
            };
          });
          return '<ul class="breadcrumb">' +
                    '<li class="active">' + escape(data["value"]) + '</li>' +
                    '<li class="abbrv">' + legends.join('</li> <li class="abbrv">') + '</li>' +
                 '</ul>';
				}
			}
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
    var chord = tonic + this.props.chord;
    var chordSp = tonic + this.props.chord;
    return (
      <option value={chordSp}>{chord}</option>
    );
  }
});

module.exports = SelectChords;
