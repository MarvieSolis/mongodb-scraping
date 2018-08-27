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
router.get('/', function (req, res) {
    res.redirect('/articles/new');
});


// SBNation
var url = "https://www.sbnation.com/nba-news-basketball";



// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function (req, res) {
    
    var result = {};

    var checkArray = [];
    
    request("https://www.sbnation.com/nba-news-basketball", function (error, response, html) {


        var $ = cheerio.load(html);


        // Grabbing from SB Nation
        $("div.c-entry-box--compact--article").each(function (i, element) {

            var title = $(element).find("div.c-entry-box--compact__body").find("h2.c-entry-box--compact__title").find("a").text();
            var createdAt = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("time.c-byline__item").attr("datetime");
            var author = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("a").html();
            var link = $(element).children().attr("href");
            var image0 = $(element).find("a.c-entry-box--compact__image-wrapper").find("div.c-entry-box--compact__image").find("noscript").html();
            var image = $(image0).attr("src");

            // Send data to result array
            result[i] = ({
                title: title,
                author: author,
                link: link,
                image: image,
                createdAt: createdAt
            });

            // Check for duplicate
            if (checkArray.indexOf(result[i].title) === -1) {

                checkArray.push(result[i].title);

                Article.count({ title: result[i].title }, function (err, test) {
                    if (test === 0) {
                        var newArticle = new Article(result[i]);

                        newArticle.save(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            // else {
                            //     console.log(res);
                            // }
                        });
                    }
                })
            }
        });

        console.log(result);

        res.redirect("/articles/new");
    });
});




// Send articles through INDEX Newest to Oldest
router.get('/articles/new', function (req, res) {
    Article.find().sort({ _id: 1 })
        //send to handlebars
        .exec(function (err, content) {
            if (err) {
                console.log(err);
            } else {
                var sentArticle = { article: content };
                res.render('index', sentArticle);
            }
        });
});



//clear all articles for testing purposes
router.get('/clearAll', function (req, res) {
    Article.remove({}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log('removed all articles');
        }

    });
    res.redirect('/json');
});




// Send articles through INDEX Oldest to Newest
router.get('/articles/old', function (req, res) {
    Article.find().sort({ _id: -1 })
        //send to handlebars
        .exec(function (err, content) {
            if (err) {
                console.log(err);
            } else {
                var sentArticle = { article: content };
                res.render('index', sentArticle);
            }
        });
});




// Send articles through INDEX Newest to Oldest
router.get('/comment/:id', function (req, res) {
    Article.find().sort({ _id: 1 })
        //send to handlebars
        .exec(function (err, content) {
            if (err) {
                console.log(err);
            } else {
                var sentArticle = { article: content };
                res.render('index', sentArticle);
            }
        });
});




// This will get the articles we scraped from the mongoDB in JSON
router.get('/json', function (req, res) {
    Article.find({}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});



// Reading / commenting an article
router.get('/read/:id', function (req, res) {

    var articleID = req.params.id;


    var articlePrev = {
        article: [],
        summary: ""
    };

    Article.findOne({ _id: articleID })
        .populate('comment')
        .exec(function (err, results) {
            if (err) { throw err }
            else {
                articlePrev.article = results;
                var link = results.link;

                request(link, function (error, response, html) {

                    var $ = cheerio.load(html);

                    $("section.l-wrapper").each(function (i, element) {
                        articlePrev.summary = $(element).find("h2.c-entry-summary").text();

                        console.log(articlePrev);

                        res.render('article', {articlePrev});

                        return false;

                    });
                });
            }
        });

});


module.exports = router;