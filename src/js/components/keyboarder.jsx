// keyboarder.jsx
// created By Jesse Jurman
// renders a collection of keyboards in a table or div

var React = require('react');
var KeyboardChord = require('./keyboardChord');
var KeyboardScale = require('./keyboardScale');

// class to render all the keyboards
var Keyboarder = React.createClass({
  render: function() {
    var selectKeyboards = this.props.keyboards;

    // we need to pair up the keyboards, so that we can show them in rows
    var pairKeyboards = selectKeyboards.reduce( function(list, element, index) {
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

    var keyboards = pairKeyboards.map( function(keyboardPair, rowIndex) {

        // dispKeyboards is one or two keyboards...
        var dispKeyboards = keyboardPair.map( function(ko) {
            if ( ko.type == "chord" ) {
              return (
                  <KeyboardChord key={ko.name} keyboardObject={ko}/>
              );
            }
            else if ( ko.type == "scale" ) {
              return (
                  <KeyboardScale key={ko.name} keyboardObject={ko}/>
              );
            }

        })

        // we pack them into rows for the bootstrap grid system
        return (
          <div className="row" key={rowIndex}>
              {dispKeyboards}
          </div>
        );
    });
    return (
      <div className="container">
        <svg id="svg-defs">
            <defs>
                <linearGradient id="white-press" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop className="press-start" offset="0%" />
                    <stop className="press-end" offset="100%" />
                </linearGradient>
                <linearGradient id="black-press" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop className="press-start" offset="0%" />
                    <stop className="press-end" offset="100%" />
                </linearGradient>
                <linearGradient id="chord-spot" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop className="press-start" offset="0%" />
                    <stop className="press-end" offset="100%" />
                </linearGradient>
                <linearGradient id="scale-spot" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop className="press-start" offset="0%" />
                    <stop className="press-end" offset="100%" />
                </linearGradient>
            </defs>
        </svg>
        {keyboards}
      </div>
    );
  }
});

module.exports = Keyboarder;
