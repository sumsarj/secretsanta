const WebSocket = require('ws');
const mysql = require("./mysqlLib")
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var arr = message.split("|");
    if (arr[0] == "fetch" && (arr[2] == "Rasmus" || arr[2] == "David" || arr[2] == "Erik" || arr[2] == "Gunilla" || arr[2] == "Lars" || arr[2] == "Linn" || arr[2] == "Elin" || arr[2] == "Emma" )) {
     mysql.getConnection(function(err, mclient) {
      res = ''
      
      var sql3 = `SELECT * FROM users WHERE taken = '${arr[2]}'`;//Se om man redan valt någon.

      mclient.query(sql3, function(err,result) { 
        if (err) {ws.send("fetch|Rasmus fked up"); throw err;}
        if (result.length == 0) {
          var sql = `SELECT users.user_name, users.user_id FROM users JOIN lastyear ON users.user_name = lastyear.user_name WHERE users.user_name <> '${arr[2]}' AND users.taken = 'NO' AND lastyear.taken <> '${arr[2]}'`;
          console.log(sql);
          mclient.query(sql, function (err, result) {
            if (err) {ws.send("fetch|Rasmus fked up"); throw err;}
            res = result;
            console.log(res);
            var rand = getRandomInt(0,1000) % (result.length);
            var vald = result[rand];
            console.log(result.length);
            console.log(rand);
            console.log(vald);
            var sql2 = `UPDATE users SET taken = '${arr[2]}' WHERE user_id = ${vald.user_id}`;
            mclient.query(sql2, function(err, result) {
              if (err) {ws.send("fetch|rasmus fked up (code 2)"); throw err;}
              ws.send(`fetch|${vald.user_name}`);
              mclient.release();
            });
          });
        }
        else {
          ws.send(`fetch|${result[0].user_name}`);
          mclient.release();
        }
       });
     });
    }
    else if (arr[2] == "Theo"){
      ws.send("fetch|Du får allt vänta några år till<3");
    }
    else{
    ws.send("fetch|Fel namn");
    }
  });

});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

