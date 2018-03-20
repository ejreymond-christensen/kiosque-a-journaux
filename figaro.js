// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Articles from figaro\n" +
            "\n***********************************\n");

// Making a request for Le Monde
request("http://www.lefigaro.fr/", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("div.fig-profile--mtsp").children("div.fig-profile__container").children("h2").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).children("a").attr("title");
    var preview = $(element).next("p").text();
    var link = $(element).children("a").attr("href");

    results.push({
      title: title,
      preview: preview,
      link: link,
      source: "Le Figaro"
    });
  });

  console.log(results);
});
