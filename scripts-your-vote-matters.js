

function getAllCandidatesInOffice(candidates, office) {
  var output = [];
  for (person of candidates) {
    if (person.office.trim() == office.trim()) {
      output.push(person);
    }
  } 
  console.log(output.sort((a, b) => (parseInt(a.district_number) - parseInt(b.district_number))));
  return output.sort((a, b) => (parseInt(a.district_number) - parseInt(b.district_number)));

}

function addInOfficeSections(candidates, offices) {
  for (office of offices) {
    var hr = document.createElement('hr');
    hr.style="border: 2px solid red";
    document.getElementsByClassName("news-events")[0].appendChild(hr);

    var h1 = document.createElement('h1');
    h1.textContent = office;
    document.getElementsByClassName("news-events")[0].appendChild(h1);

    var peopleGrid = document.createElement('div');
    peopleGrid.className = "people-grid";
    var people = getAllCandidatesInOffice(candidates, office);

    for (person of people) {
      var peopleGridItem = document.createElement('div');
      peopleGridItem.className = "people-grid-item";

      var personalPhoto = document.createElement("img");
      personalPhoto.src = person.photo.path.replace("\\", "/");
      personalPhoto.alt = "Image of ".concat(person.name);

      var personalPhotoHldr = document.createElement("a");
      personalPhotoHldr.appendChild(personalPhoto);
      personalPhotoHldr.href = person.website;
      personalPhotoHldr.target = "_blank";

      var nameCaption = document.createElement('p');
      nameCaption.className = "people-grid-name";
      nameCaption.appendChild(document.createTextNode(person.name));

      var titleCaption = document.createElement('p');
      var titleCaptionText = document.createElement('p');
      if (person.interview_link !== "Coming soon") {
        var titleCaptionText2 = document.createElement('a');
        titleCaptionText2.href=person.interview_link;
        titleCaptionText2.target="_blank";
        titleCaptionText2.innerText = "Interview";
      }
      else {
        var titleCaptionText2 = document.createElement('i');
        titleCaptionText2.innerText = "Interview Coming Soon";
      }
      titleCaptionText.appendChild(document.createTextNode("District " + person.district_number));
      titleCaption.appendChild(titleCaptionText);
      titleCaption.appendChild(titleCaptionText2);
      
      // peopleGridItem.appendChild(personalPhoto);
      peopleGridItem.appendChild(personalPhotoHldr);
      peopleGridItem.appendChild(nameCaption);
      peopleGridItem.appendChild(titleCaption);

      peopleGrid.appendChild(peopleGridItem);
    }
    document.getElementsByClassName("news-events")[0].appendChild(peopleGrid);
    document.getElementsByClassName("news-events")[0].appendChild(document.createElement("br"));
    document.getElementsByClassName("news-events")[0].appendChild(document.createElement("br"));
    document.getElementsByClassName("news-events")[0].appendChild(document.createElement("br"));
    document.getElementsByClassName("news-events")[0].appendChild(document.createElement("br"));

  }
}


fetch('./cockpit-next/api/collections/collection/female_candidates?token=account-9bfaf529a8b75b42cb4d23eaa0196a') // Call the fetch function passing the url of the API as a parameter
  .then(collections => collections.json())
  .then(function(data) {
      // Your code for handling the data you get from the API
      console.log(data.fields[5]);
      offices = data.fields[5].options.options.split(",");

      fetch('./cockpit-next/api/collections/get/female_candidates?token=account-9bfaf529a8b75b42cb4d23eaa0196a')
        .then(candidate_entries => candidate_entries.json())
        .then(function(candidate_data) {
          candidateMembers = candidate_data.entries;
          addInOfficeSections(candidateMembers, offices);
          addLinks(candidateMembers);
    })
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log(error);
  });


// end of working with cockpit api


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

function addLinks(candidates) {

  // Get the button that opens the modal
  var btns = document.getElementsByClassName("people-grid-item");

  console.log(btns);
  for (i = 0; i < btns.length; i++)
  {
    // When the user clicks on the button, open the modal
    // btns[i].onclick = function() {
    //   // find the person
    //   for (member of candidates) {
    //     if (getName(this) == member.name) {
    //       window.open(member.website, "_blank");
    //     }
    //   }
    // }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// End of For the modal