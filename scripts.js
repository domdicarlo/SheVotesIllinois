

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

// TODO: Need to do some stuff with promises here
// looks for nav-placeholders and replaces them with the html
// for the navbar
function placeNavbar() {
  let request = new XMLHttpRequest();
  request.open('GET', './navigation.html');
  request.responseType = 'text';
  request.onload = function() {
    $('#nav-placeholder').replaceWith(request.response);
  }
  request.send();
};


// const readyNavbar = async () => {
//   await placeNavbar();
  // Open the burger menu on click
  document.querySelector('.open').addEventListener('click', () => {
      document.querySelector('.nav-list').classList.add('active');
  });

  // Close the burger menu on click
 document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('.nav-list').classList.remove('active');
  });
// }


// for resizing image maps
imageMapResize();

function drawCanvas() {
  // for moving canvas element around
  // var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");

  // get box coords. 
  var partnerBtns = document.getElementsByClassName("image-map");
  for (partnerBtn of partnerBtns) {
    var c = document.createElement("div");

    var coords = partnerBtn.coords.split(",");
    console.log(coords);
    var x = coords[0];
    var y = coords[1];

    // c.width = parent.width;
    // c.height = parent.height;

    var width = parseInt(coords[2], 10) - parseInt(coords[0], 10);
    var height = parseInt(coords[3], 10) - parseInt(coords[1], 10);

    // Red rectangle
    // ctx.beginPath();
    // ctx.lineWidth = "1";
    // ctx.strokeStyle = "green";
    // ctx.rect(x, y, width, height);
    // ctx.stroke();
    c.setAttribute("x", x);
    c.setAttribute("y", y);
    c.setAttribute("width", width);
    c.setAttribute("height", height);
    c.setAttribute("position", "absolute");

    document.getElementsByClassName("partnership")[0].appendChild(c);
  }

}

drawCanvas();


// initialize owl carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});
