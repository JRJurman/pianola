var Keyboard = React.createClass({
  render: function() {
    return (
      <div>
        <Octive number="0" selected={this.props.first} />
        <Octive number="1" selected={this.props.second} />
        <Octive number="2" selected={this.props.third} />
      </div>
    );
  }
});

var Octive = React.createClass({
  render: function() {
    var white_key_width = 15;
    var number = this.props.number;
    var width = white_key_width*7;
    var selected_notes = this.props.selected;
    function selected(note) {
      return selected_notes.indexOf(note) != -1;
    }
    return (
      <svg width={width} height="50">
        <WhiteKey note="C" number={number} selected={selected("Cn")} />
        <WhiteKey note="D" number={number} selected={selected("Dn")} />
        <WhiteKey note="E" number={number} selected={selected("En")} />
        <WhiteKey note="F" number={number} selected={selected("Fn")} />
        <WhiteKey note="G" number={number} selected={selected("Gn")} />
        <WhiteKey note="A" number={number} selected={selected("An")} />
        <WhiteKey note="B" number={number} selected={selected("Bn")} />

        <BlackKey note="C" number={number} selected={selected("C#")} />
        <BlackKey note="D" number={number} selected={selected("D#")} />
        <BlackKey note="F" number={number} selected={selected("F#")} />
        <BlackKey note="G" number={number} selected={selected("G#")} />
        <BlackKey note="A" number={number} selected={selected("A#")} />
      </svg>
    );
  }
})

var WhiteKey = React.createClass({
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
      <rect className={classname} x={position} width={width} height="50" />
    );
  }
});

var BlackKey = React.createClass({
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
      <rect className={classname} x={position} width={width} height="25" />
    )
  }
});

React.render(
  <Keyboard first="" second="" third=""/>,
  document.getElementById('keyboard-div')
);
