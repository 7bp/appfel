var bplist = require('./bplistparser.js');
var Q = require('q');

var bplist_parseFile = function(file, callback) {
  var deferred = Q.defer();
  bplist.parseFile(file, function(err, obj) {
    if (err) deferred.reject(err);
    else deferred.resolve(obj);
  });
  return deferred.promise.nodeify(callback);
};

bplist_parseFile('file.plist', function(err, obj) {
  if (err) throw err;
  console.log(JSON.stringify(obj));
});
