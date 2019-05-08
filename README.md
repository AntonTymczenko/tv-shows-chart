# TV-shows chart application

Small project for learning React, Redux, Meteor.

### Demo

[tv-shows-chart.herokuapp.com](https://tv-shows-chart.herokuapp.com)

### Local installation

* Set up environment
  * Create `.env` file in root folder
  * Add here a few environment variables
    ```
  MONGO_URL="mongodb://localhost:27017/your-app-name-or-whatever"
  TRAKT_CLIENT_ID=7777777777777777777777777777777777777777777777777777777777777777
  TMDB_KEY=77777777777777777777777777777777
    ```
  * If you have a question what is the `TRAKT_CLIENT_ID` or `TMDB_KEY` you should read about next APIs: [Trakt docs](https://trakt.docs.apiary.io/#
  ), [The Movie DB docs](https://developers.themoviedb.org/3/getting-started/introduction).
  * `MONGO_URL` is optional. If you omit it — Meteor would use its own MongoDB. But it's more convenient to monitor your local database with a tool like [Robo 3T](https://robomongo.org/).
* Install dependencies
  ```sh
  $ npm install
  ```
* Run development server
  ```sh
  $ npm run dev
  ```
* By default your local server will run at [http://localhost:3000](http://localhost:3000)

### Setup Heroku server

* Provide all necessary environment variables in 'Config Vars'
  * Set `ROOT_URL` equal to your Heroku app's public URL
  * Provide path to your cloud MongoDB
  * Your Trakt client ID
  * Your TMDB app key
* To run Meteor application on Heroku you will need to add a 'buildpack' called [Meteor Buildpack Horse](https://github.com/AdmitHub/meteor-buildpack-horse).

Both locally or on production server you can change default value of a period of DB update by providing `UPDATE_PERIOD`. It is set in minutes.

