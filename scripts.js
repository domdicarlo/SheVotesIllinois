// inject the navbar in on each page
$.get("navigation.html", function(data) {
    $("#nav-placeholder").replaceWith(data);
});

// Function expression to select elements
const selectElement = (s) => document.querySelector(s);

// Open the menu on click
selectElement('.open').addEventListener('click', () => {
   selectElement('.nav-list').classList.add('active');
});

// Close the menu on click
selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active');
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
