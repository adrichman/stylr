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
        tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORIES (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, score INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, stitchFix VARCHAR, last_played DATE)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS PHOTOS (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, rank INTEGER, url VARCHAR, category VARCHAR, style VARCHAR)');
      });
      d.resolve(db);
    });
    return d.promise;
  };

  this.updateDB = function(table, columns, values) {
    console.log(table, columns, values);
    var db = window.openDatabase("test", "1.0", "Test_DB", 10000);
    db.transaction(function(tx) {
      // tx.executeSql('INSERT INTO' + table + '(' + columns + ') VALUES (?)',
      //   [""+values],
      tx.executeSql('INSERT INTO ' + table + ' (' + columns + ') VALUES (?)',
        [values],
      function(tx, result) {
        console.log("update success!", result);
      },
      function(tx, result) {
        console.log("update error!", result);
      });
      
    }); 
  };

}]);