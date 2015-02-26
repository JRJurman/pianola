// pianola.jsx
// created By Jesse Jurman
// react class that renders the web app pianola

var React = require('react');
var SelectChords = require('./SelectChords');
var Keyboarder = require('./Keyboarder');

var Pianola = React.createClass({
  getInitialState: function() {
    return {chords: []};
  },
  updateChords: function(items) {
    this.setState( {chords: items})
  },
  render: function() {
    return (
      <div className="container">
        <h1 className="title">Pianola</h1>
        <small><a href="https://github.com/JRJurman/pianola">Created By Jesse Jurman</a></small>
        <SelectChords id="input-tags-div" update={this.updateChords}/>
        <div id="spacer"></div>
        <Keyboarder chords={this.state.chords}/>
      </div>
    );
  }
});

module.exports = Pianola;
