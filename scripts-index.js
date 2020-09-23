
fetch('./cockpit-next/api/collections/collection/articles?token=account-9bfaf529a8b75b42cb4d23eaa0196a') // Call the fetch function passing the url of the API as a parameter
  .then(collections => collections.json())
  .then(function(data) {
      // Your code for handling the data you get from the API

      fetch('./cockpit-next/api/collections/get/articles?token=account-9bfaf529a8b75b42cb4d23eaa0196a')
        .then(articles => articles.json())
        .then(function(articles_data) {
          articles = articles_data.entries;
          console.log(articles);
          injectFeaturedArticles(articles);
    })
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log(error);
  });


function injectFeaturedArticles(articles) {

  var newsGrid = document.getElementsByClassName("news-grid")[0];

  var count = 0;

  for (article of articles) {
    if (article.featured && count < 3) {
      count += 1;

      var newsGridContainer = document.createElement("a");
      newsGridContainer.href = article.link;
      newsGridContainer.target = "_blank";
      var newsGridItem = document.createElement("div");
      newsGridItem.setAttribute("class", "news-grid-item");

      var imagePath = article.image.path;

      newsGridItem.style.backgroundImage = "url('" + imagePath.replace("\\", "/") + "')";
      newsGridItem.style.backgroundSize = "cover";
      newsGridItem.style.backgroundRepeat = "no-repeat";

      var newsGridItemContent = document.createElement("h2");
      newsGridItemContent.innerText = article.title;

      newsGridItem.onclick = function() {
        window.open(links[index], "_blank");
      };

      newsGridItem.appendChild(newsGridItemContent);
      newsGridContainer.appendChild(newsGridItem);
      newsGrid.appendChild(newsGridContainer);
    }
  }

  var newsGridContainer = document.createElement("a");
  newsGridContainer.href = "news.html";
  newsGridContainer.target = "_blank";
  var newsGridItem = document.createElement("div");
  newsGridItem.setAttribute("class", "news-grid-item");

  var newsGridItemContent = document.createElement("h2");
  newsGridItemContent.innerText = "More articles!";

  newsGridItem.appendChild(newsGridItemContent);
  newsGridContainer.appendChild(newsGridItem);
  newsGrid.appendChild(newsGridContainer);
}