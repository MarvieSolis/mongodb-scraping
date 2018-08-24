// Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

// Link to Models
var Article = require("../models/article.js");
var Comment = require('../models/comment.js');



//index
router.get('/', function(req, res) {
    res.redirect('/articles');
});


// SBNation
var url = "https://www.sbnation.com/nba-news-basketball";



// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function (req, res) {
  request("https://www.sbnation.com/nba-news-basketball", function (error, response, html) {


    var $ = cheerio.load(html);

    var result = {};

    var checkArray = [];

    // Grabbing from SB Nation
    $("div.c-entry-box--compact--article").each(function (i, element) {

      var title = $(element).find("div.c-entry-box--compact__body").find("h2.c-entry-box--compact__title").find("a").html();
      var createdAt = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("time.c-byline__item").attr("datetime");
      var author = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("a").html();
      var link = $(element).children().attr("href");
      var image0 = $(element).find("a.c-entry-box--compact__image-wrapper").find("div.c-entry-box--compact__image").find("noscript").html();
      var image = $(image0).attr("src");

      // Send data to result array
      result = ({
        title: title,
        author: author,
        link: link,
        image: image,
        createdAt: createdAt
      });

      // Check for duplicate
      if(checkArray.indexOf(result.title) === -1){

          checkArray.push(result.title);
          
          var newArticle = new Article (result);
          
          newArticle.save(function(err, res) {
            if (err) {
              throw err;
            }
            else {
              console.log(res);
            }
          });
      }
    });

    res.json(checkArray);
  });
});

// Send articles through INDEX
router.get('/articles', function(req, res) {
  Article.find().sort({_id: -1})
      //send to handlebars
      .exec(function(err, content) {
          if(err){
              console.log(err);
          } else{
              var sentArticle = {article: content};
              res.render('index', sentArticle);
          }
  });
});

// This will get the articles we scraped from the mongoDB in JSON
router.get('/articles-json', function(req, res) {
  Article.find({}, function(err, doc) {
      if (err) {
          console.log(err);
      } else {
          res.json(doc);
      }
  });
});

module.exports = router;