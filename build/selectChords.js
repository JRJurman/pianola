var SelectChords = React.createClass({displayName: "SelectChords",
  render: function() {
    return (
      React.createElement("select", {id: "input-tags", multiple: true, placeholder: "Type in Chord..."}, 
        React.createElement(ChordGroup, {sKey: "C"}), 
        React.createElement(ChordGroup, {sKey: "C#"}), 
        React.createElement(ChordGroup, {sKey: "Db"}), 
        React.createElement(ChordGroup, {sKey: "D"}), 
        React.createElement(ChordGroup, {sKey: "D#"}), 
        React.createElement(ChordGroup, {sKey: "Eb"}), 
        React.createElement(ChordGroup, {sKey: "E"}), 
        React.createElement(ChordGroup, {sKey: "F"}), 
        React.createElement(ChordGroup, {sKey: "F#"}), 
        React.createElement(ChordGroup, {sKey: "Gb"}), 
        React.createElement(ChordGroup, {sKey: "G"}), 
        React.createElement(ChordGroup, {sKey: "G#"}), 
        React.createElement(ChordGroup, {sKey: "Ab"}), 
        React.createElement(ChordGroup, {sKey: "A"}), 
        React.createElement(ChordGroup, {sKey: "A#"}), 
        React.createElement(ChordGroup, {sKey: "Bb"}), 
        React.createElement(ChordGroup, {sKey: "B"}), 
        React.createElement(ChordGroup, {sKey: "B#"})

      )
    );
  }
});

var ChordGroup = React.createClass({displayName: "ChordGroup",
  render: function() {
    var key = this.props.sKey;
    return (
      React.createElement("optgroup", {label: key}, 
        React.createElement(DefaultChords, {sKey: key}), 
        React.createElement(UniqueChords, {sKey: key})
      )
    );
  }
});

var DefaultChords = React.createClass({displayName: "DefaultChords",
  render: function() {
    var key = this.props.sKey;
    return (
      React.createElement("div", null, 
        React.createElement(BetterOption, {value: key+" major"}), 
        React.createElement(BetterOption, {value: key+" minor"}), 
        React.createElement(BetterOption, {value: key+" 7"}), 
        React.createElement(BetterOption, {value: key+" m7"}), 
        React.createElement(BetterOption, {value: key+" maj7"}), 
        React.createElement(BetterOption, {value: key+" mM7"}), 
        React.createElement(BetterOption, {value: key+" 7b5"}), 
        React.createElement(BetterOption, {value: key+" 7#5"}), 
        React.createElement(BetterOption, {value: key+" 7b9"}), 
        React.createElement(BetterOption, {value: key+" 7#9"}), 
        React.createElement(BetterOption, {value: key+" b5"}), 
        React.createElement(BetterOption, {value: key+" 5"}), 
        React.createElement(BetterOption, {value: key+" 6"}), 
        React.createElement(BetterOption, {value: key+" m6"}), 
        React.createElement(BetterOption, {value: key+" 69"}), 
        React.createElement(BetterOption, {value: key+" 9"}), 
        React.createElement(BetterOption, {value: key+" m9"}), 
        React.createElement(BetterOption, {value: key+" maj9"}), 
        React.createElement(BetterOption, {value: key+" add9"}), 
        React.createElement(BetterOption, {value: key+" 11"}), 
        React.createElement(BetterOption, {value: key+" m11"}), 
        React.createElement(BetterOption, {value: key+" 13"}), 
        React.createElement(BetterOption, {value: key+" sus2"}), 
        React.createElement(BetterOption, {value: key+" sus4"}), 
        React.createElement(BetterOption, {value: key+"7 sus4"}), 
        React.createElement(BetterOption, {value: key+" dim"}), 
        React.createElement(BetterOption, {value: key+" dim7"}), 
        React.createElement(BetterOption, {value: key+" half dim"}), 
        React.createElement(BetterOption, {value: key+"/C"}), 
        React.createElement(BetterOption, {value: key+"/D"}), 
        React.createElement(BetterOption, {value: key+"/E"}), 
        React.createElement(BetterOption, {value: key+"/Eb"}), 
        React.createElement(BetterOption, {value: key+"/F"}), 
        React.createElement(BetterOption, {value: key+"/G"}), 
        React.createElement(BetterOption, {value: key+"/A"}), 
        React.createElement(BetterOption, {value: key+"/B"})
      )
    );
  }
});

var UniqueChords = React.createClass({displayName: "UniqueChords",
  render: function() {
    return (
      React.createElement("div", null)
    );
  }
});

var BetterOption = React.createClass({displayName: "BetterOption",
  render: function() {
    var value = this.props.value;
    return (
      React.createElement("option", {value: value}, value)
    );
  }
});

React.render(
  React.createElement(SelectChords, null),
  document.getElementById('input-tags-div')
);
