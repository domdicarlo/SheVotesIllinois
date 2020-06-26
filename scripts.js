// looks for nav-placeholders and replaces them with the html
// for the navbar
function placeNavbar() {
  let request = new XMLHttpRequest();
  request.open('GET', './navigation.html');
  request.responseType = 'text';
  request.onload = function() {
    $('#nav-placeholder').replaceWith(request.response);
    console.log("hello");
  }
  request.send();
};
placeNavbar();

// Open the menu on click
document.querySelector('.open').addEventListener('click', () => {
   document.querySelector('.nav-list').classList.add('active');
});

// Close the menu on click
document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.nav-list').classList.remove('active');
});

// initialize owl carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

// collapsibles, open and close
var coll = document.getElementsByClassName("collapsible");
var i;

// add an event listener for each collapsible. on click, show the content.
// or if shown, remove
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collapsible-active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
