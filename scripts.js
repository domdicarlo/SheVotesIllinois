
var allLinks = document.getElementsByTagName("a");
console.log(allLinks);
for (var i = 0; i < allLinks.length; i++) {
  console.log("got em");
  if (allLinks[i].className !== "") {
    if (allLinks[i].className.includes("no-new-tab")) {
      // do nothing
    }
    else {
      allLinks[i].target = "_blank";
      console.log(allLinks[i]);
    }
  }
  else {
      allLinks[i].target = "_blank";
      console.log(allLinks[i]);
  }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("nav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// collapsibles, open and close
var coll = document.getElementsByClassName("collapsible");
var i;

// add an event listener for each collapsible. on click, show the content.
// or if shown, remove
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collapsible-active");
    var h1Node = this.childNodes[1];
    console.log(h1Node);
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      h1Node.innerText = h1Node.innerText.replace("-", "+");
    } else {
      content.style.display = "block";
      h1Node.innerText = h1Node.innerText.replace("+", "-");
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