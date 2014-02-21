var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    bplist = require('./bplistparser.js')
    Q = require('q');

var bplist_parseFile = function(file, callback) {
  var deferred = Q.defer();
  bplist.parseFile(file, function(err, obj) {
    if (err) deferred.reject(err);
    else deferred.resolve(obj);
  });
  return deferred.promise.nodeify(callback);
};

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      bplist_parseFile(files.upload.path, function(err, obj) {
        if (err) throw err;
        res.end(util.inspect(obj));
      });
      //res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);
