// keyboarder.jsx
// created By Jesse Jurman
// renders a collection of keyboards in a table or div

var React = require('react');
var Keyboard = require('./keyboard');
var chordMap = require('./chordMap');

// class to render all the keyboards
var Keyboarder = React.createClass({
  render: function() {
    var selectChords = this.props.chords;
    var keyboards = selectChords.map( function(chord) {
        var chordItem = chordMap[chord];
        return (
          <Keyboard key={chordItem.value} chord={chord}
                    voicing={0} value={chordItem.value} />
        );
    });
    return (
      <div>
        {keyboards}
      </div>
    );
  }
});

module.exports = Keyboarder;
