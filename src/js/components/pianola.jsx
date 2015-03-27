// pianola.jsx
// created By Jesse Jurman
// react class that renders the web app pianola

var React = require('react');
var Fluxxor = require('fluxxor');

var SelectChords = require('./select-chords');
var Keyboarder = require('./keyboarder');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// The main application
var Pianola = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('ChordTruths', 'Chords')],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      chordTruths: flux.store('ChordTruths').getState(),
      chords: flux.store('Chords').getState()
    }
  },

  printClick: function() {
    window.print();
  },
  render: function() {
    return (
      <div className="container">
        <h1 className="title">Pianola</h1>
        <a href="https://github.com/JRJurman/">Created By Jesse Jurman</a>
        <i className="fa fa-print fa-lg heading-icon last-icon" onClick={this.printClick} />
        <a href="https://github.com/jrjurman/pianola/">
            <i className="fa fa-github fa-lg heading-icon" />
        </a>
        <SelectChords id="input-tags-div" chordTruths={this.state.chordTruths} />
        <Keyboarder chords={this.state.chords} />
      </div>
    );
  }
});

module.exports = Pianola;
