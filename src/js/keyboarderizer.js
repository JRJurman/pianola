// keyboarderizer.js
// created By Jesse Jurman
// renders a collection of keyboards in a table or div

var React = require('react');
var Keyboard = require('./keyboard');
var chordMap = require('./chordMap');

// function to render the keyboards
var keyboarderizer = function() {
  var selectInput = $("#input-tags")[0].selectize;
  var selectChords = selectInput.items;

  var keyboardTable = document.getElementById("keyboard-table");
  keyboardTable.innerHTML = "";

  // for every chord that has been entered
  Array.prototype.forEach.call( selectChords, function(chord, index) {

    var new_keyboard;
    var tableRow;

    // if the view is less than 700px, show only 1 column in a table
    // otherwise throw every other keyboard to the right
    if ( ((index % 2) == 0) || window.innerWidth < 700) {
      tableRow = document.createElement('tr');
      keyboardTable.appendChild(tableRow);
    }
    else {
      var tableRows = document.querySelectorAll('tr');
      tableRow = tableRows[tableRows.length - 1];
    }

    new_keyboard = document.createElement('td');

    var new_key_id = 'keyboard-td-'+index;
    new_keyboard.setAttribute('id', new_key_id );
    tableRow.appendChild(new_keyboard);
    var chordItem = chordMap[chord];

    React.render(
      <Keyboard
        chord={chord}
        voicing={0}
        value={chordItem.value}
      />,
      document.getElementById(new_key_id)
    );

  });
}

module.exports = keyboarderizer;
