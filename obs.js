// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Articles from l'obs\n" +
            "\n***********************************\n");

// Making a request for Le Monde
request("http://www.nouvelobs.com/politique/", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("article.obs-article").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).children("a").attr("title");
    var preview = $(element).children("p").text();
    var link = $(element).children("a").attr("href");

    results.push({
      title: title,
      preview: preview,
      link: link,
      source: "L'Obs"
    });
  });

  console.log(results);
});
