var bplist = require('bplist-parser');

// index page
exports.index = function(req, res){
  res.render('index', { title: 'Apps' })
};

// upload form
exports.upload_get = function(req, res) {
  res.render('upload', { title: 'Upload' })
};

// upload data handling
exports.upload_post = function(req, res) {
  bplist.parseFile(req.files.upload.path, function(err, obj) {
    if (err) {
      res.render('upload', { title: 'Upload', response: 'Error occurred while parsing BPLIST file' });
      throw err;
    } else {
      res.render('upload', { title: 'Upload', response: JSON.stringify(obj, null, 2) });
    }
  });
};
