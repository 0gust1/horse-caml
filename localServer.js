http = require('http');

/**
* Local server, tied with livereload
*/
var launch = function launchServer(){
  var connect = require('connect');
    var serveStatic = require('serve-static');
    var app= connect();

    app.use(require('connect-livereload')({
        port: 35729
      }));
    app.use(serveStatic(__dirname+'/src'));

    http.createServer(app).listen(8080);
    console.log("\n--- Server started, listening on 8080... ---\n");
}
module.exports = launch;

launch();
