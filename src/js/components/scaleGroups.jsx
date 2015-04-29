// scaleGroups.jsx
// created By Jesse Jurman
// react class that sets scales for the selectize input

var React = require('react');
var Teoria = require('../lib/teoria');

// The default scale options groups by key
var ScaleGroups = React.createClass({
  render: function() {
    var groupArray = this.props.chordTruths.keys.map( (k) => {
      return (<DefaultScales generalScales={Object.keys(Teoria.scale.scales)} key={k} tonic={k} />);
    });
    return (
      <div>
        {groupArray}
      </div>
    );
  }
})

// The scales from Teoria
var DefaultScales = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var scaleArray = this.props.generalScales.map( function(c) {
      return (<Scale key={c} tonic={tonic} scale={c} />);
    });
    return (
      <optgroup label={tonic + " Scales"}>
        {scaleArray}
      </optgroup>
    );
  }
});

// A scale option which represents a possible default option
var Scale = React.createClass({
  render: function() {
    var tonic = this.props.tonic;
    var scaleName = this.props.scale[0].toUpperCase() + this.props.scale.substring(1);
    var scale = tonic + " " + scaleName + " Scale";

    return (
      <option value={scale}>{scale}</option>
    );
  }
});

module.exports = ScaleGroups;
