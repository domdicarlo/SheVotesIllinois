

// for working with cockpit api
var modalContent = document.getElementsByClassName("modal-content")[0];
var staffMembers;

function injectModal(person) {
  document.getElementById("modal-name").appendChild(document.createTextNode(person.Name));
  document.getElementById("modal-title").appendChild(document.createTextNode(person.Title));
  var photo = document.createElement("img");
  photo.src = person.Photo.path;
  document.getElementById("modal-photo").appendChild(photo);
  document.getElementById("modal-about").appendChild(document.createTextNode(person.About));
  document.getElementById("modal-fact-1-question").appendChild(document.createTextNode(person.Interesting_Fact_1.Question));
  document.getElementById("modal-fact-2-question").appendChild(document.createTextNode(person.Interesting_Fact_2.Question));
  document.getElementById("modal-fact-3-question").appendChild(document.createTextNode(person.Interesting_Fact_3.Question));
  document.getElementById("modal-fact-1-answer").appendChild(document.createTextNode(person.Interesting_Fact_1.Answer));
  document.getElementById("modal-fact-2-answer").appendChild(document.createTextNode(person.Interesting_Fact_2.Answer));
  document.getElementById("modal-fact-3-answer").appendChild(document.createTextNode(person.Interesting_Fact_3.Answer));
}

function getAllStaffInDept(staff, dept) {
  var output = [];
  for (person of staff) {
    if (person.Department.trim() == dept.trim()) {
      output.push(person);
    }
  } 
  return output;
}

function doStuff2() {
  var department;

  for (department of departments) {
    var hr = document.createElement('hr');
    hr.style="border: 2px solid red";
    document.getElementsByClassName("news-events")[0].appendChild(hr);

    var h1 = document.createElement('h1');
    h1.textContent = department;
    document.getElementsByClassName("news-events")[0].appendChild(h1);

    var peopleGrid = document.createElement('div');
    peopleGrid.className = "people-grid";
    var people = getAllStaffInDept(staffMembers, department);

    for (person of people) {
      var peopleGridItem = document.createElement('div');
      peopleGridItem.className = "people-grid-item";

      var personalPhoto = document.createElement("img");
      personalPhoto.src = person.Photo.path;

      var nameCaption = document.createElement('p');
      nameCaption.className = "people-grid-name";
      nameCaption.appendChild(document.createTextNode(person.Name));

      var titleCaption = document.createElement('p');
      var titleCaptionText = document.createElement('i');
      titleCaptionText.appendChild(document.createTextNode(person.Title))
      titleCaption.appendChild(titleCaptionText);
      
      peopleGridItem.appendChild(personalPhoto);
      peopleGridItem.appendChild(nameCaption);
      peopleGridItem.appendChild(titleCaption);

      peopleGrid.appendChild(peopleGridItem);
    }
    document.getElementsByClassName("news-events")[0].appendChild(peopleGrid);
  }
}

fetch('./cockpit-master/api/collections/get/staff?token=account-73c12d7cf568f00632fe287f98eed8')
    .then(collections => collections.json())
    .then(collections => staffMembers = collections.entries);

fetch('./cockpit-master/api/collections/collection/staff?token=account-73c12d7cf568f00632fe287f98eed8')
    .then(collection => collection.json())
    // .then(collection => console.log(collection.staff.Department.options.options));
    .then(collection => departments = collection.fields[1].options.options.split(","))
    .then(() => doStuff2())
    .then(() => modalStuff());


// end of working with cockpit api

// For the modal:
// Get the modal

function getName(personGridItem) {
  var children = personGridItem.childNodes;
  for (child of children) {
    if (child.className == "people-grid-name") {
      return child.textContent;
    }
  }
  return null;

}

function modalStuff() {
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btns = document.getElementsByClassName("people-grid-item");
  console.log(btns);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  for (i = 0; i < btns.length; i++)
  {
    btn = btns[i];
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
      var person;
      // find the person
      for (member of staffMembers) {
        if (getName(btn) == member.Name) {
          injectModal(member);
        }
      }

    }
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// End of For the modal

}

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
placeNavbar();

// Open the burger menu on click
document.querySelector('.open').addEventListener('click', () => {
   document.querySelector('.nav-list').classList.add('active');
});

// Close the burger menu on click
document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.nav-list').classList.remove('active');
});

// initialize owl carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});
