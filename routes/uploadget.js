
/*
 * GET upload form.
 */

exports.upload = function(req, res) {
  res.render('upload', { title: 'Upload' })
};