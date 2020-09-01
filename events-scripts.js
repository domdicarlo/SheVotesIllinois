// converts a MM/DD/YY to a Month Day
function prettifyDate(date) {
  var units = date.split("/");
  var month = parseInt(units[0]);
  var day = units[1];

  var niceMonth = "Unknown";

  switch (month) {
    case 1:
      niceMonth = "January"
      break;
    case 2:
      niceMonth = "February"
      break;
    case 3:
      niceMonth = "March"
      break;
    case 4:
      niceMonth = "April"
      break;
    case 5:
      niceMonth = "May"
      break;
    case 6:
      niceMonth = "June"
      break;
    case 7:
      niceMonth = "July"
      break;
    case 8:
      niceMonth = "August"
      break;
    case 9:
      niceMonth = "September"
      break;
    case 10:
      niceMonth = "October"
      break;
    case 11:
      niceMonth = "November"
      break;
    case 12:
      niceMonth = "December"
      break;
  }

  return niceMonth.concat(" ", day);
}

// the popup window for viewing an event's details
function injectModal(event) {

  var modal = document.getElementById("myModal");
  modal.style.display = "block";

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
  modalName.innerText = event.title;
  modalContent.appendChild(modalName);
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  // add in date and time
  var date = document.createElement("h2");
  if (event.start_time.start_time === "all day") {
    var timeString = "All day"
  }
  else {
    var timeString = event.start_time.start_time.concat(" ", event.start_time.meridiem);
    timeString.concat(" - ", event.end_time.end_time, " ", event.end_time.meridiem);
  }
  date.innerText = prettifyDate(event.date).concat(" @ ", timeString);
  modalContent.appendChild(date);
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  // add in cost
  var cost = document.createElement("p");
  var costBold = document.createElement("b");
  costBold.innerText = "Cost: ";
  cost.appendChild(costBold);
  cost.appendChild(document.createTextNode(event.cost));
  modalContent.appendChild(cost);

  // add in a photo
  // var modalPhoto = document.createElement("img");
  // modalPhoto.src = getProperURL(event.image.path);
  // modalContent.appendChild(modalPhoto);

  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  // add in about
  var aboutBold = document.createElement("b");
  aboutBold.innerText = "About: ";
  var aboutBoldHolder = document.createElement("p");
  aboutBoldHolder.appendChild(aboutBold);
  var modalAbout = document.createElement("div");
  modalAbout.innerHTML = event.info;
  modalAbout.appendChild(document.createElement("br"));
  modalAbout.appendChild(document.createElement("br"));
  modalContent.appendChild(aboutBoldHolder);
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(modalAbout);

  // Add in organizers
  var organizersBold = document.createElement("b");
  organizersBold.innerText = "Organizers: ";
  var organizersHolder = document.createElement("p");
  organizersHolder.appendChild(organizersBold);
  organizersHolder.appendChild(document.createTextNode(event.organizers));
  modalContent.appendChild(organizersHolder);
  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  // Add in Venue
  var venueBold = document.createElement("b");
  venueBold.innerText = "Venue: ";
  var venueHolder = document.createElement("p");
  venueHolder.appendChild(venueBold);
  venueHolder.appendChild( document.createTextNode(event.venue.venue_name.concat(" - ")));
  var venueAddr = document.createElement("i");
  venueHolder.appendChild(venueAddr);
  venueAddr.innerText = event.venue.venue_addr;
  modalContent.appendChild(venueHolder);

  // Add in website
  if (event.website !== "") {
    modalContent.appendChild(document.createElement("br"));
    modalContent.appendChild(document.createElement("br"));
    var websiteBold = document.createElement("b");
    websiteBold.innerText = "Website: ";
    var websiteHolder = document.createElement("p");
    var webLink = document.createElement("a");
    webLink.href = event.website;
    webLink.innerText = event.website;
    websiteHolder.appendChild(websiteBold);
    websiteHolder.appendChild(webLink);
    modalContent.appendChild(websiteHolder);
  }



  modalContent.appendChild(document.createElement("br"));
  modalContent.appendChild(document.createElement("br"));

  document.getElementsByClassName("modal")[0].appendChild(modalContent);


  // var factOne = document.createElement("p");
  // var factOneQuestion = document.createElement("span");
  // factOneQuestion.setAttribute("id", "modal-fact-1-question");
  // var factOneAnswer = document.createElement("p");
  // factOneAnswer.setAttribute("id", "modal-fact-1-answer");
  // factOne.appendChild(factOneQuestion);
  // factOne.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
  // modalContent.appendChild(factOne);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(factOneAnswer);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));

  // var factTwo = document.createElement("p");
  // var factTwoQuestion = document.createElement("span");
  // factTwoQuestion.setAttribute("id", "modal-fact-2-question");
  // var factTwoAnswer = document.createElement("p");
  // factTwoAnswer.setAttribute("id", "modal-fact-2-answer");
  // factTwo.appendChild(factTwoQuestion);
  // factTwo.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
  // modalContent.appendChild(factTwo);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(factTwoAnswer);
  // modalContent.appendChild(document.createElement("br"));
  // modalContent.appendChild(document.createElement("br"));



  // document.getElementById("modal-name").appendChild(document.createTextNode(person.Name));

  // document.getElementById("modal-title").appendChild(document.createTextNode(person.Title));
  // var photo = document.createElement("img");
  // photo.src = person.Photo.path;
  // document.getElementById("modal-photo").appendChild(photo);
  // document.getElementById("modal-fact-1-question").appendChild(document.createTextNode(info.));
  // document.getElementById("modal-fact-2-question").appendChild(document.createTextNode(info.Interesting_Fact_2.Question));
  // document.getElementById("modal-fact-1-answer").appendChild(document.createTextNode(info.Interesting_Fact_1.Answer));
  // document.getElementById("modal-fact-2-answer").appendChild(document.createTextNode(info.Interesting_Fact_2.Answer));

  // if (person.Interesting_Fact_3.Question !== "") {
  //   var factThree = document.createElement("p");
  //   var factThreeQuestion = document.createElement("span");
  //   factThreeQuestion.setAttribute("id", "modal-fact-3-question");
  //   var factThreeAnswer = document.createElement("p");
  //   factThreeAnswer.setAttribute("id", "modal-fact-3-answer");
  //   factThree.appendChild(factThreeQuestion);
  //   factThree.appendChild(document.createElement("b").appendChild(document.createTextNode(":")));
  //   modalContent.appendChild(factThree);
  //   modalContent.appendChild(factThreeAnswer);
  //   factThree.appendChild(document.createElement("br"));
  //   factThree.appendChild(document.createElement("br"));

  //   document.getElementById("modal-fact-3-answer").appendChild(document.createTextNode(person.Interesting_Fact_3.Answer));
  //   document.getElementById("modal-fact-3-question").appendChild(document.createTextNode(person.Interesting_Fact_3.Question));
  // }

}

// converts the cockpit supplied format to the format
// read by calendar app
function convertDateToISO(date) {
  var units = date.split("/");
  var month = units[0];
  var day = units[1];
  var year = "20".concat(units[2]);

  return year.concat("-", month, "-", day);
}

function getDay(date) {
  var units = date.split("/");
  var day = units[1];
  return parseInt(day);
}

function getMonth(date) {
  var units = date.split("/");
  var month = units[0];
  return parseInt(month);
}

function getYear(date) {
  var units = date.split("/");
  var year = "20".concat(units[2]);
  return parseInt(year);
}

// this may not be needed on the server
function getProperURL(url) {
  var directories = url.split("/");
  var file = directories[directories.length - 1].split("\\");
  return file[file.length - 1];
}

function injectEvent(event) {

  var eventHolder = document.getElementsByClassName("events-coming-soon")[0];

  // create the big event container
  var newEvent = document.createElement("div");
  newEvent.setAttribute("class", "event-container");
  
  // create the image div
  var newEventImgHolder = document.createElement("div");
  newEventImgHolder.setAttribute("class", "event-img");
  var newEventImg = document.createElement("img");
  newEventImg.src = event.image.path;
  newEventImgHolder.appendChild(newEventImg);

  // create the description div
  var newEventDesc = document.createElement("div");
  newEventDesc.setAttribute("class", "event-desc");
  var newEventTitle = document.createElement("h2");
  newEventTitle.innerText = event.title;

  // fancy foot work required for formatting the date
  var newEventDate = document.createElement("b");
  if (event.start_time.start_time === "all day") {
    var timeString = "All day"
  }
  else {
    var timeString = event.start_time.start_time.concat(" ", event.start_time.meridiem);
    timeString.concat(" - ", event.end_time.end_time, " ", event.end_time.meridiem);
  }
  newEventDate.innerText = prettifyDate(event.date).concat(" @ ", timeString);
  // end of fancy foot work required for formatting the date

  // event info button
  var eventBtnHolder = document.createElement("div");
  eventBtnHolder.setAttribute("class", "btn-wrapper");
  var eventBtn = document.createElement("a");
  eventBtn.setAttribute("id", "info-btn");
  eventBtn.setAttribute("class", "btn");
  eventBtn.innerText = "Info";
  eventBtnHolder.addEventListener('click', () => {
      injectModal(eventDict[event.title]);
  });
  eventBtnHolder.appendChild(eventBtn);

  // event info
  var newEventInfo = document.createElement("div");
  newEventInfo.setAttribute("class", "event-info");
  newEventInfo.innerText = event.info_plain_text;
  newEventInfo.appendChild(eventBtnHolder);

  newEventDesc.appendChild(newEventTitle);
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(newEventDate);
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(newEventInfo);
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(document.createElement("br"));

  newEvent.appendChild(newEventImgHolder);
  newEvent.appendChild(newEventDesc);

  eventHolder.appendChild(newEvent);
}

var eventDict = {};

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    eventClick: function(info) {
      // alert('Event: ' + info.event.title);
      injectModal(eventDict[info.event.title]);
    }
    , initialView: 'dayGridMonth'
    , events:[]
  });
  calendar.on('dateClick', function(info) {
    console.log('clicked on ' + info.dateStr);
  });
  calendar.render();


  fetch('./cockpit-next/api/collections/get/events?token=account-fc24199754ba715c39fb54ca179458') // Call the fetch function passing the url of the API as a parameter
    .then(collection => collection.json())
    .then(function(data) {
      var count = 0;
      var index = 0;
      // for (event of data.entries) {
      for (index = data.entries.length - 1; index > -1; index--) {
        var event = data.entries[index];
        // add to event dict
        eventDict[event.title] = event;

        var eventDate = convertDateToISO(event.date);
        var nextEvent = {title:event.title, start:eventDate, 
                          end:eventDate}
        console.log(nextEvent);
        calendar.addEvent(nextEvent);

        // add the next 5 events
        if (count < 5) {
          var currentTime = new Date();
          var currentDay = currentTime.getDate();
          var currentMonth = currentTime.getMonth();
          var currentYear = currentTime.getFullYear();

          var eventDay = getDay(event.date);
          var eventMonth = getMonth(event.date);
          var eventYear = getYear(event.date);
          console.log(currentDay);
          console.log(currentMonth);
          console.log(currentYear);

          console.log(eventDay);
          console.log(eventMonth);
          console.log(eventYear);
          if (currentYear < eventYear) {
            injectEvent(event);
          }
          else if (currentYear == eventYear) {
            if (currentMonth < eventMonth) {
              injectEvent(event);
            }
            else if (currentMonth == eventMonth) {
              if (currentDay <= eventDay) {
                injectEvent(event);
              }
            }
          }
        }
      }
    })
    .catch(function(error) {
        console.log(error);
    });


});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

var modal = document.getElementById("myModal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// owl carousel
$(document).ready(function(){
  $('.carousel').slick({
    infinite:true,
    arrows:true,
    autoplay:true,
    autplaySpeed:1000,
    dots:true
  });
});