

function injectModal(person) {
  // first clear the code you already have
  var modalContent = document.getElementsByClassName("modal-content")[0];
  modalContent.parentNode.removeChild(modalContent);

  // Now create and populate the modal
  modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  var closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("class", "close");

  closeBtn.onclick = function() {
    document.getElementById("myModal").style.display = "none";
  }
  modalContent.appendChild(closeBtn);

  var modalName = document.createElement("h1");
  modalName.setAttribute("id", "modal-name");
  modalName.innerText = person.Name;
  modalContent.appendChild(modalName);
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  var modalPhoto = document.createElement("img");
  modalPhoto.src = person.Photo.path;
  modalContent.appendChild(modalPhoto);

  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  var modalAbout = document.createElement("p");
  modalAbout.setAttribute("id", "modal-about");
  var bioSpan = document.createElement("span");
  bioSpan.innerText = "Bio:";
  modalAbout.appendChild(bioSpan);
  modalAbout.appendChild(document.createElement("br"));
  modalAbout.appendChild(document.createElement("br"));
  modalContent.appendChild(modalAbout);


  var factOne = document.createElement("p");
  var factOneQuestion = document.createElement("span");
  factOneQuestion.setAttribute("id", "modal-fact-1-question");
  var factOneAnswer = document.createElement("p");
  factOneAnswer.setAttribute("id", "modal-fact-1-answer");
  factOne.appendChild(factOneQuestion);
  factOne.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
  modalContent.appendChild(factOne);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(factOneAnswer);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));

  var factTwo = document.createElement("p");
  var factTwoQuestion = document.createElement("span");
  factTwoQuestion.setAttribute("id", "modal-fact-2-question");
  var factTwoAnswer = document.createElement("p");
  factTwoAnswer.setAttribute("id", "modal-fact-2-answer");
  factTwo.appendChild(factTwoQuestion);
  factTwo.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
  modalContent.appendChild(factTwo);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(factTwoAnswer);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));


  document.getElementsByClassName("modal")[0].appendChild(modalContent);

  // document.getElementById("modal-name").appendChild(document.createTextNode(person.Name));

  // document.getElementById("modal-title").appendChild(document.createTextNode(person.Title));
  // var photo = document.createElement("img");
  // photo.src = person.Photo.path;
  // document.getElementById("modal-photo").appendChild(photo);
  document.getElementById("modal-about").appendChild(document.createTextNode(person.About));
  document.getElementById("modal-fact-1-question").appendChild(document.createTextNode(person.Interesting_Fact_1.Question));
  document.getElementById("modal-fact-2-question").appendChild(document.createTextNode(person.Interesting_Fact_2.Question));
  document.getElementById("modal-fact-1-answer").appendChild(document.createTextNode(person.Interesting_Fact_1.Answer));
  document.getElementById("modal-fact-2-answer").appendChild(document.createTextNode(person.Interesting_Fact_2.Answer));

  console.log(person.Interesting_Fact_3)
  if (person.Interesting_Fact_3.Question !== "") {
    var factThree = document.createElement("p");
    var factThreeQuestion = document.createElement("span");
    factThreeQuestion.setAttribute("id", "modal-fact-3-question");
    var factThreeAnswer = document.createElement("p");
    factThreeAnswer.setAttribute("id", "modal-fact-3-answer");
    factThree.appendChild(factThreeQuestion);
    factThree.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
    modalContent.appendChild(factThree);
    modalContent.appendChild(factThreeAnswer);
    // factThree.appendChild(document.createElement("br"));
    // factThree.appendChild(document.createElement("br"));

    document.getElementById("modal-fact-3-answer").appendChild(document.createTextNode(person.Interesting_Fact_3.Answer));
    document.getElementById("modal-fact-3-question").appendChild(document.createTextNode(person.Interesting_Fact_3.Question));
  }

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

function addInDepartmentSections(staff, departments) {
  for (department of departments) {
    var hr = document.createElement('hr');
    hr.style="border: 2px solid red";
    document.getElementsByClassName("news-events")[0].appendChild(hr);

    var h1 = document.createElement('h1');
    h1.textContent = department;
    document.getElementsByClassName("news-events")[0].appendChild(h1);

    var peopleGrid = document.createElement('div');
    peopleGrid.className = "people-grid";
    var people = getAllStaffInDept(staff, department);

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

// fetch('./cockpit-master/api/collections/get/staff?token=account-03fb8fa035f451e6c516e99fa45002')
//     .then(collections => collections.json())
//     .then(collections => staffMembers = collections.entries)

// function getStaffCollection() {
//     fetch('./cockpit-master/api/collections/collection/staff?token=account-03fb8fa035f451e6c516e99fa45002')
//         .then(collection => collection.json())
//         .then(collection => departments = collection.fields[1].options.options.split(","))
//         .then(collections => staffMembers = collections.entries)
//         .then(() => addInDepartmentSections())
//         .then(() => modalStuff());
// }
// fetch('./cockpit-master/api/collections/collection/staff?token=account-03fb8fa035f451e6c516e99fa45002')
//     .then(collections => collections.json())
//     .then(collections => collection_json = collections)
//     .then(() => addInDepartmentSections())
//     .then(() => modalStuff());

fetch('./cockpit-next/api/collections/collection/staff?token=account-fc24199754ba715c39fb54ca179458') // Call the fetch function passing the url of the API as a parameter
  .then(collections => collections.json())
  .then(function(data) {
      // Your code for handling the data you get from the API
      departments = data.fields[1].options.options.split(",");

      fetch('./cockpit-next/api/collections/get/staff?token=account-fc24199754ba715c39fb54ca179458')
        .then(staff_entries => staff_entries.json())
        .then(function(staff_data) {
          staffMembers = staff_data.entries;
          console.log(staffMembers);
          console.log(departments);
          console.log(data);
          addInDepartmentSections(staffMembers, departments);
          modalStuff(staffMembers);
    })
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log(error);
  });

// getStaffCollection();



// end of working with cockpit api

// For the modal:
// Get the modal

function getName(personGridItem) {
  console.log(personGridItem);
  var children = personGridItem.childNodes;
  for (child of children) {
    if (child.className == "people-grid-name") {
      // console.log(child.innerText);
      return child.innerText;
    }
  }
  return null;

}

function modalStuff(staff) {
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btns = document.getElementsByClassName("people-grid-item");

  console.log(btns);
  for (i = 0; i < btns.length; i++)
  {
    // When the user clicks on the button, open the modal
    btns[i].onclick = function() {
      modal.style.display = "block";
      // find the person
      for (member of staff) {
        if (getName(this) == member.Name) {
          injectModal(member);
        }
      }
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// End of For the modal