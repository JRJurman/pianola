var Keyboard = React.createClass({displayName: "Keyboard",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, this.props.chord), 
        React.createElement(Octive, {number: "0", selected: this.props.first}), 
        React.createElement(Octive, {number: "1", selected: this.props.second}), 
        React.createElement(Octive, {number: "2", selected: this.props.third})
      )
    );
  }
});

var Octive = React.createClass({displayName: "Octive",
  render: function() {
    var white_key_width = 15;
    var number = this.props.number;
    var width = white_key_width*7;
    var selected_notes = this.props.selected;
    function selected(note) {
      return selected_notes.indexOf(note) != -1;
    }
    return (
      React.createElement("svg", {width: width, height: "50"}, 
        React.createElement(WhiteKey, {note: "C", number: number, selected: selected("Cn")}), 
        React.createElement(WhiteKey, {note: "D", number: number, selected: selected("Dn")}), 
        React.createElement(WhiteKey, {note: "E", number: number, selected: selected("En")}), 
        React.createElement(WhiteKey, {note: "F", number: number, selected: selected("Fn")}), 
        React.createElement(WhiteKey, {note: "G", number: number, selected: selected("Gn")}), 
        React.createElement(WhiteKey, {note: "A", number: number, selected: selected("An")}), 
        React.createElement(WhiteKey, {note: "B", number: number, selected: selected("Bn")}), 

        React.createElement(BlackKey, {note: "C", number: number, selected: selected("C#")}), 
        React.createElement(BlackKey, {note: "D", number: number, selected: selected("D#")}), 
        React.createElement(BlackKey, {note: "F", number: number, selected: selected("F#")}), 
        React.createElement(BlackKey, {note: "G", number: number, selected: selected("G#")}), 
        React.createElement(BlackKey, {note: "A", number: number, selected: selected("A#")})
      )
    );
  }
})

var WhiteKey = React.createClass({displayName: "WhiteKey",
  render: function() {
    var classname = "white-key "+this.props.note+this.props.number;
    if (this.props.selected) {
      classname += " selected";
    }
    var width=15;
    var note_position;
    if (this.props.note >= "C") {
      note_position = this.props.note.charCodeAt() - 67;
    }
    else {
      note_position = this.props.note.charCodeAt()+7 - 67;
    }
    var position = width * (note_position);
    return (
      React.createElement("rect", {className: classname, x: position, width: width, height: "50"})
    );
  }
});

var BlackKey = React.createClass({displayName: "BlackKey",
  render: function() {
    var white_key_width = 15;
    var classname = "black-key "+this.props.note+this.props.number;
    if (this.props.selected) {
      classname += " selected";
    }
    var width=8;
    var note_position;
    if (this.props.note >= "C") {
      note_position = this.props.note.charCodeAt() - 67;
    }
    else {
      note_position = this.props.note.charCodeAt()+7 - 67;
    }
    var position = white_key_width * (note_position) + 11;
    return (
      React.createElement("rect", {className: classname, x: position, width: width, height: "25"})
    )
  }
});
