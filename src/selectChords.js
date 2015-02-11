var SelectChords = React.createClass({
  render: function() {
    return (
      <select id="input-tags" multiple placeholder="Type in Chord...">
        <ChordGroup sKey="C" />
        <ChordGroup sKey="C#" />
        <ChordGroup sKey="Db" />
        <ChordGroup sKey="D" />
        <ChordGroup sKey="D#" />
        <ChordGroup sKey="Eb" />
        <ChordGroup sKey="E" />
        <ChordGroup sKey="F" />
        <ChordGroup sKey="F#" />
        <ChordGroup sKey="Gb" />
        <ChordGroup sKey="G" />
        <ChordGroup sKey="G#" />
        <ChordGroup sKey="Ab" />
        <ChordGroup sKey="A" />
        <ChordGroup sKey="A#" />
        <ChordGroup sKey="Bb" />
        <ChordGroup sKey="B" />
        <ChordGroup sKey="B#" />

      </select>
    );
  }
});

var ChordGroup = React.createClass({
  render: function() {
    var key = this.props.sKey;
    return (
      <optgroup label={key}>
        <DefaultChords sKey={key} />
        <UniqueChords sKey={key} />
      </optgroup>
    );
  }
});

var DefaultChords = React.createClass({
  render: function() {
    var key = this.props.sKey;
    return (
      <div>
        <BetterOption value={key+" major"} />
        <BetterOption value={key+" minor"} />
        <BetterOption value={key+" 7"} />
        <BetterOption value={key+" m7"} />
        <BetterOption value={key+" maj7"} />
        <BetterOption value={key+" mM7"} />
        <BetterOption value={key+" 7b5"} />
        <BetterOption value={key+" 7#5"} />
        <BetterOption value={key+" 7b9"} />
        <BetterOption value={key+" 7#9"} />
        <BetterOption value={key+" b5"} />
        <BetterOption value={key+" 5"} />
        <BetterOption value={key+" 6"} />
        <BetterOption value={key+" m6"} />
        <BetterOption value={key+" 69"} />
        <BetterOption value={key+" 9"} />
        <BetterOption value={key+" m9"} />
        <BetterOption value={key+" maj9"} />
        <BetterOption value={key+" add9"} />
        <BetterOption value={key+" 11"} />
        <BetterOption value={key+" m11"} />
        <BetterOption value={key+" 13"} />
        <BetterOption value={key+" sus2"} />
        <BetterOption value={key+" sus4"} />
        <BetterOption value={key+"7 sus4"} />
        <BetterOption value={key+" dim"} />
        <BetterOption value={key+" dim7"} />
        <BetterOption value={key+" half dim"} />
        <BetterOption value={key+"/C"} />
        <BetterOption value={key+"/D"} />
        <BetterOption value={key+"/E"} />
        <BetterOption value={key+"/Eb"} />
        <BetterOption value={key+"/F"} />
        <BetterOption value={key+"/G"} />
        <BetterOption value={key+"/A"} />
        <BetterOption value={key+"/B"} />
      </div>
    );
  }
});

var UniqueChords = React.createClass({
  render: function() {
    return (
      <div />
    );
  }
});

var BetterOption = React.createClass({
  render: function() {
    var value = this.props.value;
    return (
      <option value={value}>{value}</option>
    );
  }
});

React.render(
  <SelectChords />,
  document.getElementById('input-tags-div')
);
