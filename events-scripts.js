// converts fullcalendar date to our date format
function getBasicDate(date) {
  date = date.toString();
  var tokens = date.split(" ");
  var month = tokens[1];
  var day = tokens[2];
  var year = tokens[3].slice(-2);

  if (month.includes("Jan")) { month = "01" }
  if (month.includes("Feb")) { month = "02" }
  if (month.includes("Mar")) { month = "03" }
  if (month.includes("Apr")) { month = "04" }
  if (month.includes("May")) { month = "05" }
  if (month.includes("Jun")) { month = "06" }
  if (month.includes("Jul")) { month = "07" }
  if (month.includes("Aug")) { month = "08" }
  if (month.includes("Sep")) { month = "09" }
  if (month.includes("Oct")) { month = "10" }
  if (month.includes("Nov")) { month = "11" }
  if (month.includes("Dec")) { month = "12" }

  return month.concat("/", day, "/", year); 
}

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
    console.log(event.start_time.start_time);
    if (event.start_time.start_time.charAt(0) == "0") {
      event.start_time.start_time = event.start_time.start_time.slice(1);
    }
    if (event.end_time.end_time.charAt(0) == "0") {
      event.end_time.end_time = event.end_time.end_time.slice(1);
    }
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
  newEventImg.alt = event.title.concat(" image");
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
    if (event.start_time.start_time.charAt(0) == "0") {
      event.start_time.start_time = event.start_time.start_time.slice(1);
    }
    if (event.end_time.end_time.charAt(0) == "0") {
      event.end_time.end_time = event.end_time.end_time.slice(1);
    }
    var timeString = event.start_time.start_time.concat(" ", event.start_time.meridiem);
    timeString.concat(" - ", event.end_time.end_time, " ", event.end_time.meridiem);
  }
  newEventDate.innerText = prettifyDate(event.date).concat(" @ ", timeString);
  // end of fancy foot work required for formatting the date

  // event info button
  var eventBtnHolder = document.createElement("div");
  eventBtnHolder.setAttribute("class", "btn-wrapper");
  eventBtnHolder.setAttribute("id", "info-btn");
  var eventBtn = document.createElement("a");
  eventBtn.setAttribute("id", "info-btn");
  eventBtn.setAttribute("class", "btn");
  eventBtn.innerText = "RSVP";
  eventBtnHolder.addEventListener('click', () => {
      // injectModal(eventDict[event.title.concat(event.date)]);
      window.open(eventDict[event.title.concat(event.date)].website, '_blank');
  });
  eventBtnHolder.appendChild(eventBtn);

  // event info
  var newEventInfo = document.createElement("div");
  newEventInfo.setAttribute("class", "event-info");
  newEventInfo.innerText = event.info_plain_text;

  newEventDesc.appendChild(newEventTitle);
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(newEventDate);
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(document.createElement("br"));
  newEventDesc.appendChild(newEventInfo);
  newEventDesc.appendChild(eventBtnHolder);

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
      // console.log(eventDict);
      // console.log(getBasicDate(info.event.start));
      // injectModal(eventDict[info.event.title.concat(getBasicDate(info.event.start))]);
      console.log(eventDict[info.event.title.concat(getBasicDate(info.event.start))].website);
      window.open(eventDict[info.event.title.concat(getBasicDate(info.event.start))].website, '_blank');
    }
    , height: 620
    , initialView: 'dayGridMonth'
    , events:[]
  });
  calendar.on('dateClick', function(info) {
    console.log('clicked on ' + info.dateStr);
  });
  calendar.render();

  function compareTwoDates(a, b) {
    var eventADay = a.day;
    var eventAMonth = a.month;
    var eventAYear = a.year;

    var eventBDay = b.day;
    var eventBMonth = b.month;
    var eventBYear = b.year;

    if (eventAYear == eventBYear) {
      if (eventAMonth == eventBMonth) {
        console.log("enter");
        return eventADay - eventBDay; 
      }
      else { 
        return eventAMonth - eventBMonth; 
      }
    }
    else { 
      return eventAYear - eventBYear;
    }
  }

  function compareTwoDates2(a2, b2) {
    var eventADay = getDay(a2.date);
    var eventAMonth = getMonth(a2.date);
    var eventAYear = getYear(a2.date);
    var eventATime = {year:eventAYear, month:eventAMonth, day:eventADay};

    var eventBDay = getDay(b2.date);
    var eventBMonth = getMonth(b2.date);
    var eventBYear = getYear(b2.date);
    var eventBTime = {year:eventBYear, month:eventBMonth, day:eventBDay};

    if (eventAYear == eventBYear) {
      if (eventAMonth == eventBMonth) {
        return eventADay - eventBDay; 
      }
      else { 
        return eventAMonth - eventBMonth; 
      }
    }
    else { 
      return eventAYear - eventBYear;
    }
  }


  fetch('./cockpit-next/api/collections/get/events?token=account-9bfaf529a8b75b42cb4d23eaa0196a') // Call the fetch function passing the url of the API as a parameter
    .then(collection => collection.json())
    .then(function(data) {
      var count = 0;
      var index = 0;
      // for (event of data.entries) {
      var events = data.entries.sort(function(date1,date2) {
        return compareTwoDates2(date1,date2);
      });
      // var events = data.entries;
      // var events = data.entries;
      // for (index = data.entries.length - 1; index > -1; index--) {
      console.log(events);
      for (event of events) {
        // var event = data.entries[index];
        // add to event dict
        eventDict[event.title.concat(event.date)] = event;

        var eventDate = convertDateToISO(event.date);
        var nextEvent = {title:event.title, start:eventDate, 
                          end:eventDate}
        calendar.addEvent(nextEvent);

        // add the next 5 events
        if (count < 5) {
          var currentTime = new Date();
          var currentDay = currentTime.getDate();
          var currentMonth = currentTime.getMonth() + 1;
          var currentYear = currentTime.getFullYear();

          var currentTime = {year:currentYear, month:currentMonth, day:currentDay};

          var eventDay = getDay(event.date);
          var eventMonth = getMonth(event.date);
          var eventYear = getYear(event.date);
          var eventTime = {year:eventYear, month:eventMonth, day:eventDay};
          // if (compareTwoDates(currentTime, eventTime) <= 0)
          // {
          //   console.log(currentTime.day);
          //   console.log(eventTime.day);
          //   console.log(compareTwoDates(currentTime, eventTime));
          //   injectEvent(event);
          // }
          console.log(currentDay)
          console.log(currentMonth)
          console.log(currentYear)
          console.log(eventDay)
          console.log(eventMonth)
          console.log(eventYear)
          if (currentYear == eventYear) {
            if (currentMonth == eventMonth) {
              if (currentDay <= eventDay) {
                injectEvent(event);
                count += 1;
              }
            }
            else { 
              if (currentMonth < eventMonth) {
                injectEvent(event);
                count += 1;
              }
            }
          }
          else { 
            if (currentYear < eventYear) {
              injectEvent(event);
              count += 1;
            }
          }
          // if (compareTwoDates(eventTime, eventTime) { injectEvent(event); }
          // if (currentYear < eventYear) {
          //   injectEvent(event);
          // }
          // else if (currentYear == eventYear) {
          //   if (currentMonth < eventMonth) {
          //     injectEvent(event);
          //   }
          //   else if (currentMonth == eventMonth) {
          //     if (currentDay <= eventDay) {
          //       console.log(eventDay);
          //       console.log(currentDay);
          //       injectEvent(event);
          //     }
          //   }
          // }
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
    autoplaySpeed:5000,
    dots:true
  });
});