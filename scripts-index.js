
fetch('./cockpit-next/api/collections/collection/articles?token=account-fc24199754ba715c39fb54ca179458') // Call the fetch function passing the url of the API as a parameter
  .then(collections => collections.json())
  .then(function(data) {
      // Your code for handling the data you get from the API

      fetch('./cockpit-next/api/collections/get/articles?token=account-fc24199754ba715c39fb54ca179458')
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

      var newsGridItem = document.createElement("div");
      newsGridItem.setAttribute("class", "news-grid-item");

      if (article.image.path !== "") {
        newsGridItem.style.background = 'url("'.concat(article.image.path, '") cover no-repeat');
      }

      var newsGridItemContent = document.createElement("h2");
      newsGridItemContent.innerText = article.title;

      newsGridItem.onclick = function() {
          window.open(article.link, "_blank");
      }

      newsGridItem.appendChild(newsGridItemContent);
      newsGrid.appendChild(newsGridItem);
    }
  }
}