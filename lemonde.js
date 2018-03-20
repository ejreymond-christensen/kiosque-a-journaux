// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Articles from leMonde\n" +
            "\n***********************************\n");

// Making a request for Le Monde
// request("http://www.lemonde.fr", function(error, response, html) {
//
//   var $ = cheerio.load(html);
//
//   var results = [];
//
//   $("div.limite210").children("h2").each(function(i, element) {
//     // Save the text of the element in a "title" variable
//     var title = $(element).text();
//     var preview = $(element).next("p").text();
//     var link = $(element).children("a").attr("href");
//
//     results.push({
//       title: title,
//       preview: preview,
//       link: link
//     });
//   });
//
//   console.log(results);
// });


request("http://www.lemonde.fr/politique/", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("article.enrichi").children("div").children("div").children("h3").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).children("a").text();
    var preview = $(element).next("p").text();
    var link = $(element).children("a").attr("href");

    results.push({
      title: title,
      preview: preview,
      link: link,
      source: "Le Monde"
    });
  });

  console.log(results);
});
