// pianola.jsx
// created By Jesse Jurman
// react class that renders the web app pianola

var React = require('react');
var SelectChords = require('./SelectChords');

var Pianola = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="title">Pianola</h1>
        <small><a href="https://github.com/JRJurman/pianola">Created By Jesse Jurman</a></small>
        <SelectChords id="input-tags-div" />
        <div id="spacer"></div>
        <div id="keyboard-div">
          <table id="keyboard-table">
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Pianola;
