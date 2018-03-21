var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var router = express.Router();
var moment = require('moment');

var db = require("../models/");

module.exports = function(app) {
  app.get("/scrapeObs", function(req, res) {
    request("http://www.nouvelobs.com/politique/", function(error, response, html) {

      var $ = cheerio.load(html);
      var resList = [];
      $("article.obs-article").each(function(i, element) {
        var results = {};

        results.title = $(element).children("a").attr("title");
        results.preview = $(element).children("p").text();
        results.link = $(element).children("a").attr("href");
        results.source= "L'Obs";
        results.date= moment().format('MMDDYYYY');

        resList.push(results);

        db.Articles.create(results)
        .then(function(dbArticle){
          // res.send(dbArticle);
        })
        .catch(function(err){
          return res.json(err);
        });
      });
      res.send(resList);
    });
  });

  app.get("/scrapeLeMonde", function(req, res) {
    request("http://www.lemonde.fr/politique/", function(error, response, html) {

      var $ = cheerio.load(html);
      var resList = [];
      $("article.enrichi").children("div").children("div").children("h3").each(function(i, element) {

        var results = {};

        results.title = $(element).children("a").text();
        results.preview = $(element).next("p").text();
        results.link = "http://www.lemonde.fr"+ $(element).children("a").attr("href");
        results.source= "Le Monde";
        results.date= moment().format('MMDDYYYY');

        resList.push(results);

        db.Articles.create(results)
        .then(function(dbArticle){

        })
        .catch(function(err){
          return res.json(err);
        });
      });
      res.send(resList);
    });
  });

  app.get("/scrapeLeFigaro", function(req, res) {
    request("http://www.lefigaro.fr/", function(error, response, html) {

      var $ = cheerio.load(html);
      var resList = [];
      $("div.fig-profile--mtsp").children("div.fig-profile__container").children("h2").each(function(i, element) {
        var results = {};

        results.title = $(element).children("a").attr("title");
        results.preview = $(element).next("p").text();
        results.link = $(element).children("a").attr("href");
        results.source= "Le Figaro";
        results.date= moment().format('MMDDYYYY');

        resList.push(results);

        db.Articles.create(results)
        .then(function(dbArticle){

        })
        .catch(function(err){
          return res.json(err);
        });
      });
      res.send(resList);
    });
  });

  app.get("/articles", function(req, res) {
    db.Articles.find({})
      .then(function(dbArticle) {

        res.json(dbArticle);
      })
      .catch(function(err) {

        res.json(err);
      });
  });

  app.get("/articlesToday", function(req, res) {
    var date= moment().format('MMDDYYYY');

    db.Articles.find({date: date})
      .then(function(dbArticle) {

        res.json(dbArticle);
      })
      .catch(function(err) {

        res.json(err);
      });
  });

  app.get("/savedArticles", function(req, res) {

    db.Articles.find({saved: true})
      .then(function(dbArticle) {

        res.json(dbArticle);
      })
      .catch(function(err) {

        res.json(err);
      });
  });

  app.post("/articles/:id", function(req, res){
    db.Articles.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: req.body.saved }})
    .then(function(dbArticle) {
      res.send(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
  });
};
