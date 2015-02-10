var ChordPicker = React.createClass({displayName: "ChordPicker",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(ScalePicker, null), 
        React.createElement(Chords, null)
      )
    );
  }
});

var ScalePicker = React.createClass({displayName: "ScalePicker",
  getInitialState: function() {
    return {note: "C"};
  },
  handleClick: function(event) {
    console.log("C");
  },
  render: function() {
    return (
      React.createElement("div", {className: "btn-group"}, 
        React.createElement("a", {href: "#", className: "btn btn-default"}, "Default"), 
        React.createElement("a", {href: "#", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("span", {className: "caret"})), 
        React.createElement("ul", {className: "dropdown-menu"}, 
          React.createElement(Key, {handleClick: this.handleClick("C"), note: "C"}), 
          React.createElement(Key, {note: "C#"}), 
          React.createElement(Key, {note: "Db"}), 
          React.createElement(Key, {note: "D"}), 
          React.createElement(Key, {note: "D#"}), 
          React.createElement(Key, {note: "Eb"}), 
          React.createElement(Key, {note: "E"}), 
          React.createElement(Key, {note: "F"}), 
          React.createElement(Key, {note: "F#"}), 
          React.createElement(Key, {note: "Gb"}), 
          React.createElement(Key, {note: "G"}), 
          React.createElement(Key, {note: "G#"}), 
          React.createElement(Key, {note: "Ab"}), 
          React.createElement(Key, {note: "A"}), 
          React.createElement(Key, {note: "A#"}), 
          React.createElement(Key, {note: "Bb"}), 
          React.createElement(Key, {note: "B"})
        )
      )
    );
  }
});

var Key = React.createClass({displayName: "Key",
  render: function() {
    var note = this.props.note;
    return (
      React.createElement("li", null, React.createElement("a", {onClick: this.props.handleClick}, note))
    )
  }
});

var Chords = React.createClass({displayName: "Chords",
  render: function() {
    return (
      React.createElement("div", null)
    );
  }
});

React.render(
  React.createElement(ChordPicker, null),
  document.getElementById('chord-picker')
);
