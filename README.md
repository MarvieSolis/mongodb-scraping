# The Pick and Roll: A Basketball Newsite

## Description
*The Pick and Roll* is a basketball news website that obtains its information by scraping [SBNation](https://www.sbnation.com/nba-news-basketball) via Cheerio and MongoDB. Users are able to update the website by pressing the "scrape" link at the top left of the navbar, comment on articles, and delete comments. The website also allows users to sort the articles by date either from newest to oldest or vice versa. The home screen contains information for each article such as an image, title, author name, date and time posted, a link to the article, and a link to comment. The article detail page contains the same information, but with a short summary, a section for comments, and a comment form.


## Usefulness
This program utilizes **MongoDB**, **node**, **cheerio**, **handlebars**, **jQuery** and **express** to create and access a database, run a server, send users to desired routes, and link HTML and CSS files. This enables the program to utilize it's internal database of stored articles and comments from SBNation and have it updated in realtime. The database is formed when the user "scrapes" SBNation by pressing the "scrape" link. Via `routes.js`, Cheerio sends a request to SBNation's site and grabs the data using jQuery and returns it. This information is stored in an object which is sent to the `Article` collection, which is then accessed by Handlebars to display the desired information on the page. When a user comments on an article, the user's name and comment are stored in an object, which is sent to the `Comment` collection. This information is then linked to the article via the `ref` keyword and Handlebars grabs the data it needs to present it on the page.


## Screenshots
**Home screen:** Shows all the articles.
![homescreenshot](https://user-images.githubusercontent.com/36168517/44650566-cf6f4100-a99b-11e8-94f0-523c5b82899c.PNG)

**Article Detail:** Shows information from the article with the addition of a short summary.
![detailscreenshot](https://user-images.githubusercontent.com/36168517/44650613-e7df5b80-a99b-11e8-8459-283dc2280fc2.PNG)

**Comments:** Part of the Article Detail page, here is a form to post a comment.
![commentscreenshot](https://user-images.githubusercontent.com/36168517/44650612-e7df5b80-a99b-11e8-801f-809f69ac3141.PNG)


## Technologies Used
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Express-Handlbars](https://github.com/ericf/express-handlebars)
- [Mongoose](https://mongoosejs.com/)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Request](https://github.com/request/request)
- [jQuery](https://jquery.com/)


## JSON
The JSON of the articles and comments can be seen by going to these links:
- [Articles](https://marvie-c-solis-news-scraper.herokuapp.com/json-article)
- [Comments](https://marvie-c-solis-news-scraper.herokuapp.com/json-comment)


## The Site is live!
[Click here to see the page on Heroku!](https://marvie-c-solis-news-scraper.herokuapp.com/)
