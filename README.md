# kiosque-a-journaux
News scrapper that lets users collect and comment on articles from Nouvel Obs, Le Monde and Le Figaro using Mongo/Mongoose, Cheerio, Express and HandleBars.

### Kiosque à Journaux
This is a web app that lets users view and leave comments on the latest news from Nouvel Obs, Le Monde and Le Figaro. 

### How to use Kiosque à Journaux
The user first needs to scrape the news sites to collect the articles of that day. If on the index page, press the news paper you would like to scrape via one of the buttons on the top right corner. Articles will populate under the image of the kiosque. The user can view the article that were retrieved and save them by clicking the save button. If the user would like to pull a history of all scrapped articles then they can click the view history.

Once the user has some articles saved, they can choose the saved article button on the nav bar. this will pull up all saved articles. The delete button will remove the saved article from the list. If you would like to make a note, click the take note button. After you have written your note, it will overwrite the old note, if you click delete note, it will remove it.

### How to run the program
you can go to : https://kiosque-a-journaux.herokuapp.com/index

or clone the repo `kiosque-a-journaux`, clone the repo, `npm install` all the node dependencies and host it on our own node server. You will need to add the mongo db on your system to initialize the database.
