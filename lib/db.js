var mongoose = require('mongoose') 
  ; appName = 'expressstarter';

if (!appName)
  throw new Error("No appName defined in db.js");

if (appName == 'expressstarter') {
  console.log("  *************************************************************");
  console.log("  It looks like you're using the default app name in lib/db.js.");
  console.log("  You really should change that!");
  console.log("  *************************************************************");
}

var env = process.env.NODE_ENV || 'development' ;
var dbName = appName + '_' + env ;

var cnxString = process.env.MONGOLAB_URI
                || process.env.MONGOHQ_URL
                || 'mongodb://localhost/' + dbName ;


mongoose.connect(cnxString) ;

module.exports = {
  mongoose: mongoose,
  Schema: mongoose.Schema,
  database: mongoose.connection
};
