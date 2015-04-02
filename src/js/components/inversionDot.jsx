// inversionDot.jsx
// created By Jesse Jurman
// describes the UI for choosing the different possible positions of the chord

var React = require('react');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);


// A inversion dot, which allows the user to change the inversion of the chord
var InversionDot = React.createClass({
  mixins: [FluxMixin],

  onClick: function() {
    var flux = this.getFlux();
    var chord = this.props.chord;

    chord.inversion = this.props.inversion;
    flux.actions.chords.setChordInversion(chord);
  },

  render: function() {

    // possible text for the tooltips of the inversionDots
    var positions = [
        "root position", "first inversion", "second inversion",
        "third inversion", "fourth inversion", "fifth inversion",
        "sixth inversion", "seventh inversion", "eigth inversion",
        "ninth inversion", "tenth inversion", "elevent inversion",
        "twelfth inversion"
    ];
    var tooltip = positions[this.props.inversion];

    var classText = "fa";

    // if this is the selected inversion, use a filled circle
    if ( this.props.chord.inversion == this.props.inversion ) {
      classText += " fa-circle";
    }
    else {
      classText += " fa-circle-o";
    }

    return (
      <i
        className={classText}
        ref="inversioninput"
        data-toggle="tooltip"
        data-placement="top"
        onClick={this.onClick}
        title=""
        data-original-title={tooltip} />
    );
  },
  componentDidMount: function() {
    $(this.refs.inversioninput.getDOMNode()).tooltip();
  }
});

module.exports = InversionDot;
