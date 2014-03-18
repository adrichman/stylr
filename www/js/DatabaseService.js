angular.module('app.services')

.service('dbService', ['$q', 'Cordova', function($q, Cordova) {

  var errorHandler = function() {
    console.log("DB ERROR");
  };

  this.createDB = function() {
    var d = $q.defer();
    Cordova.navigator().then(function(navigator) {
      var db = window.openDatabase("test", "1.0", "Test_DB", 10000); 
      db.transaction(function(tx) {
        //tx.executeSql('PRAGMA foreign_keys = ON');
        //tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id INTEGER, name VARCHAR, stitchFix VARCHAR, last_played INTEGER)');
        // tx.executeSql('CREATE TABLE IF NOT EXISTS PHOTOS (id INTEGER PRIMARY KEY, name VARCHAR, rank INTEGER,
        //                FOREIGN KEY (category) REFERENCES CATEGORIES (id))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORIES (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, score INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, stitchFix VARCHAR, last_played DATE)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ADAM (name VARCHAR)');
      });
    });
    return d.promise;
  };

  this.updateDB = function(info) {
    var last_played = new Date();
    console.log(last_played, info);
    var db = window.openDatabase("test", "1.0", "Test_DB", 10000);
    db.transaction(function(tx) {
      //tx.executeSql('PRAGMA foreign_keys = ON');
      tx.executeSql('INSERT INTO ADAM (name) VALUES (?)',
        ["Adam"],
      function(tx, result) {
        console.log("update success!", result);
      },
      function(tx, result) {
        console.log("update error!", result);
      });
      
    }); 
  };

}]);