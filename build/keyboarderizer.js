var keyboarderizer = function() {
  document.getElementById("chord-error").style.display = 'none';

  var selectInput = $("#input-tags")[0].selectize;
  var selectChords = selectInput.items;

  var keyboardTable = document.getElementById("keyboard-table");
  keyboardTable.innerHTML = "";

  Array.prototype.forEach.call( selectChords, function(chord, index) {

    var new_keyboard;
    var tableRow;

    if (window.innerWidth >= 700) {
      if ( (index % 2) == 0 ) {
        tableRow = document.createElement('tr');
        keyboardTable.appendChild(tableRow);
      }
      else {
        var tableRows = document.querySelectorAll('tr');
        tableRow = tableRows[tableRows.length - 1];
      }

      new_keyboard = document.createElement('td');
    }
    else {
      tableRow = document.getElementById("keyboard-div");
      new_keyboard = document.createElement('div');
    }

    var new_key_id = 'keyboard-td-'+index;
    new_keyboard.setAttribute('id', new_key_id );
    tableRow.appendChild(new_keyboard);

    var itemChord;
    if (chordmap.hasOwnProperty(chord)) {
      itemChord = chordmap[chord];
      React.render(
        React.createElement(Keyboard, {chord: chord, first: itemChord.first, second: itemChord.second, third: itemChord.third}),
        document.getElementById(new_key_id)
      );
    }
    else {
      document.getElementById("chord-error").style.display = '';
    }

  });
}
