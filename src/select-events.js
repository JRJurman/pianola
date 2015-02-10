document.addEventListener('DOMContentLoaded', function(){

  var selectInput = $("#input-tags")[0].selectize;

  selectInput.on('change', keyboarderizer);
  selectInput.on('dropdown_open', popDropdown);
  selectInput.on('dropdown_close', popDropdown);
  selectInput.on('item_add', popDropdown);
  selectInput.on('item_remove', popDropdown);

});

window.onresize = function() {
  keyboarderizer();
};
