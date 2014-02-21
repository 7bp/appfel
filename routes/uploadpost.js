
/*
 * POST upload form.
 */

exports.upload = function(req, res) {
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
};
