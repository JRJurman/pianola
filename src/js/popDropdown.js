// popDropdown.js
// created By Jesse Jurman
// selectize function to push keyboard rendering lower if the dropdown is open

var popDropdown = function() {

  var selectInput = $("#input-tags")[0].selectize;

  // grab the hieght of the dropdown
  var dropbox = document.querySelector(".selectize-dropdown-content");
  var newHeight = dropbox.getBoundingClientRect().height;

  // expand a pre-existing empty div to the size of the dropdown
  var spacer = document.getElementById("spacer");
  spacer.style.setProperty("margin-top", newHeight.toString() + "px");

}

module.exports = popDropdown;
