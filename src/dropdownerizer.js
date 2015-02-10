var popDropdown = function() {

  var selectInput = $("#input-tags")[0].selectize;

  var dropbox = document.querySelector(".selectize-dropdown-content");
  var newHeight = dropbox.getBoundingClientRect().height;

  var spacer = document.getElementById("spacer");
  spacer.style.setProperty("margin-top", newHeight.toString() + "px");

}
