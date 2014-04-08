#STYLR
*These instructions assume an OSX development environment and a server running Ubuntu.*

__[Stylr](http://getStylr.com)__ is a game in which the user swipes left or right on photos of various women's fashion items to register his/her preference. At the end, the game reveals the user's style profile category, which he/she can then share with friends.

__Stylr__ is wrapped with Cordova to be run natively on mobile devices. It is written in Javascript, CSS and HTML and uses the [Ionic Framework](http://ionicframework.com) and [AngularJS](http://angularjs.org/) on the client side. The API server is an [Express](http://expressjs.com/) (NodeJS) server and the data is served by a MongoDB instance on [MongoLab](http://MongoLab.com).  Facebook sharing authorization is implememted using [Firebase Simple Login](http://firebase.github.io/firebase-simple-login/).

###Running the app locally:
*Stylr was developed in the browser using [Chome Canary's mobile emulator](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation)*.

```
git clone https://github.com/stitchfix/mbl-stylr.git
cd stylr
python -m SimpleHTTPServer 
```

View the app: [http://localhost:8000/www](http://localhost:8000/www)

###Building to iOS:
Download the latest Xcode from the App Store.

Then:

```
npm install -g cordova
```

In the root directory:

```
cordova platform add ios
cordova plugin add org.apache.cordova.core.inappbrowser
cordova plugin add org.apache.cordova.core.splashscreen
cordova build ios
```
###Deploying the server:
The server is located on the ```server_master``` branch of the repo. This is where the server should clone from during deployment. __The ```stylr-server/``` directory in the master branch will not be up-to-date!__ 

On the server, we suggest installing tmux or a similar terminal multiplexer:

```
sudo apt-get install tmux
```

On the server run:

```
git clone -b server_master https://github.com/stitchfix/mbl-stylr.git
cd stylr/stylr-server
npm install
npm start
```

###Notes:

*Because we edited much of the Ionic source, it's best to package our working version with the repo instead of using the canonical version from a package manager.*

Styles are edited in a few places...

- using SASS: www/lib/scss/custom-variables.scss

and compiling to:

- www/lib/css/ionic.3.19.14.css

and also in raw CSS:

- www/lib/css/ionic.3.19.14.css
- www/css/app.css

Don't forget to configure the server's environment for database credentials:

```
export STYLR_PORT='80';
export STYLR_DB='xxx'
```
Send us a message to request credentials information. Thanks!
