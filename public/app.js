//calls for articles from the route loadhacks...which found all our articles scraped and saved into our database from "/scrapehacks"
$.getJSON("/loadHacks", function(data) {
  for (var i = 0; i < data.length; i++) {
    $(".articles").append("<div class='artDiv' id='" + data[i]._id + "'><a href='" + data[i].link + "'><h3>" + data[i].title + "</h3></a><div class='row'><div><img src='" + data[i].image + "'</div><div><p>" + data[i].excerpt + "</p></div></div>");
  }
});
