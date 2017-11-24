const WebSocket = require('ws');
const mysql = require("./mysqlLib")
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var arr = message.split("|");
    if (arr[0] == "fetch") {
     mysql.getConnection(function(err, mclient) {
      res = ''
      //var sql = "SELECT * FROM users";
      var sql = `SELECT * FROM users WHERE user_name <> '${arr[2]}' AND taken = 'NO'`;
      console.log(sql);
      mclient.query(sql, function (err, result) {
        if (err) {ws.send("fetch|Rasmus fked up"); throw err;}
        res = result;
        var rand = getRandomInt(0,1000) % (result.length-1);
        var vald = result[rand];
        var sql2 = `UPDATE users SET taken = '${arr[2]}' WHERE user_id = ${vald.user_id}`;
        mclient.query(sql2, function(err, result) {
          if (err) {ws.send("fetch|rasmus fked up (code 2)"); throw err;}
          ws.send(`fetch|${vald.user_name}`);
          mclient.release();
        });
      });
     });
    }
  });

});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

