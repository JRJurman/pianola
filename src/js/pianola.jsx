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
        <a href="https://github.com/JRJurman/pianola">Created By Jesse Jurman</a>
        <i className="fa fa-print fa-lg heading-icon last-icon"></i>
        <SelectChords id="input-tags-div" update={this.updateChords}/>
        <Keyboarder chords={this.state.chords}/>
      </div>
    );
  }
});

module.exports = Pianola;
