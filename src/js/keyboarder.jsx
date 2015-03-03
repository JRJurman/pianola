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

    // we need to pair up the keyboards, so that we can show them in rows
    var pairChords = selectChords.reduce( function(list, element, index) {
      if ( index % 2==0 ) {
        // the first element in our pair
        list.push( [element] );
      }
      else {
        // the second element in our pair
        list[list.length - 1].push(element);
      }
      return list;
    }, []);

    var keyboards = pairChords.map( function(chordPair) {

        // dispKeyboards is one or two keyboards...
        var dispKeyboards = chordPair.map( function(chord) {
            var chordItem = chordMap[chord];
            return (
                <Keyboard key={chordItem.value} chord={chord}
                          voicing={0} value={chordItem.value} />
            );
        })

        // we pack them into rows for the bootstrap grid system
        return (
          <div className="row">
              {dispKeyboards}
          </div>
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