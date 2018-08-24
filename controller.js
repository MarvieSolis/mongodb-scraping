var cheerio = require("cheerio");
var request = require("request");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from SBNation:" +
            "\n***********************************\n");

request("https://www.sbnation.com/nba-news-basketball", function(error, response, html) {


  var $ = cheerio.load(html);

  var results = [];

 // Grabbing from SB Nation
  $("div.c-entry-box--compact--article").each(function(i, element) {

    var title = $(element).find("div.c-entry-box--compact__body").find("h2.c-entry-box--compact__title").find("a").html();

    var createdAt = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("time.c-byline__item").attr("datetime");
    
    var author = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span.c-byline__item").find("a").html();
 
    var link = $(element).children().attr("href");

    var image0 = $(element).find("a.c-entry-box--compact__image-wrapper").find("div.c-entry-box--compact__image").find("noscript").html();

    var image = $(image0).attr("src");

    results.push({
      title: title,
      author: author,
      link: link,
      image: image,
      createdAt: createdAt
    });
  });

  console.log(results);
});