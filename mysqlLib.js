var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "secretsanta",
  password: "secretsanta",
  database: "secretsantadb"
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
