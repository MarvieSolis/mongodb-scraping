# The Pick and Roll: A Basketball Newsite

## Description
*The Pick and Roll* is a basketball news website that obtains its information by scraping [SBNation](https://www.sbnation.com/nba-news-basketball) via Cheerio and MongoDB. Users are able to update the website by pressing the "scrape" link at the top left of the navbar, comment on articles, and delete comments. The website also allows users to sort the articles by date either from newest to oldest or vice versa. The home screen contains information for each article such as an image, title, author name, date and time posted, a link to the article, and a link to comment. The article detail page contains the same information, but with a short summary, a section for comments, and a comment form.


## Usefulness
This program utilizes **MongoDB**, **node**, **cheerio**, **handlebars**, **jQuery** and **express** to create and access a database, run a server, send users to desired routes, and link HTML and CSS files. This enables the program to utilize it's internal database of stored articles and comments from SBNation and have it updated in realtime. The database is formed when the user "scrapes" SBNation by pressing the "scrape" link. Via `routes.js`, Cheerio sends a request to SBNation's site and grabs the data using jQuery and returns it. This information is stored in an object which is sent to the `Article` collection, which is then accessed by Handlebars to display the desired information on the page. When a user comments on an article, the user's name and comment are stored in an object, which is sent to the `Comment` collection. This information is then linked to the article via the `ref` keyword and Handlebars grabs the data it needs to present it on the page.


## Screenshots


## Getting started
People can learn more about the different tools and languages used by clicking the following links: [jQuery.com](https://www.jquery.com/) - [w3schools](https://www.w3schools.com/jquery/default.asp) - [express](https://www.npmjs.com/package/express) - [MySQL](https://www.mysql.com/).


## The Site is live!
[Click here to see the page on Heroku!](https://marvie-c-solis-eat-the-burger.herokuapp.com/)
