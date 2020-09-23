
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

// converts a MM/DD/YY to a Month Day
function prettifyDate(date) {
  var units = date.split("/");
  var month = parseInt(units[0]);
  var day = units[1];
  var year = units[2];

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

  return niceMonth.concat(" ", day, ", 20", year);
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


fetch('./cockpit-next/api/collections/get/articles?token=account-9bfaf529a8b75b42cb4d23eaa0196a') 
  .then(collection => collection.json())
  .then(function(data) {
    // articles = data.entries.sort(function(a,b){
    //   return parseInt(b.date.split("/")[2]) - parseInt(a.date.split("/")[2]);
    // });
    articles = data.entries.sort(function(a, b) {
      return compareTwoDates2(b,a);
    });
    console.log(data);
    console.log(articles);
    injectArticles(articles);
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log(error);
  });

function injectArticles(articles) {

  for (article of articles) {
    if (article.type == "News Articles") {
      var targetId = "articles";
    }
    else if (article.type == "SVI Blog Posts") {
      var targetId = "blog-posts";
    }
    else if (article.type == "Newsletters") {
      var targetId = "newsletters";
    }

    var holder = document.getElementById(targetId);
    holder.appendChild(document.createElement("br"));
    holder.appendChild(document.createElement("br"));

    var nextArticle = document.createElement("span");
    nextArticle.setAttribute("class", "article");
    nextArticle.innerText = prettifyDate(article.date).concat(" - ");
    var articleLink = document.createElement("a");
    articleLink.setAttribute("href", article.link);
    articleLink.setAttribute("target", "_blank");
    articleLink.setAttribute("style", "word-break: normal");
    articleLink.innerText = article.title;
    nextArticle.appendChild(articleLink);

    holder.appendChild(nextArticle);

  }
}