var keyboarderizer = function() {
  document.getElementById("chord-error").style.display = 'none';
  var selection = document.getElementById("keyboard-div");
  selection.innerHTML = "";

  var selectInput = $("#input-tags")[0].selectize;
  var selectChords = selectInput.items;

  Array.prototype.forEach.call( selectChords, function(chord, index) {
    var new_keyboard = document.createElement('div');
    var new_key_id = 'keyboard-subdiv-'+index;
    new_keyboard.setAttribute('id', new_key_id );
    selection.appendChild(new_keyboard);

    var itemChord;
    if (chordmap.hasOwnProperty(chord)) {
      itemChord = chordmap[chord];
      React.render(
        <Keyboard chord={chord} first={itemChord.first} second={itemChord.second} third={itemChord.third} />,
        document.getElementById(new_key_id)
      );
    }
    else {
      document.getElementById("chord-error").style.display = '';
    }

  });
}

document.getElementById("chord-error").style.display = 'none';
var selectInput = $("#input-tags")[0].selectize;
selectInput.on('change', keyboarderizer);
