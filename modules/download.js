var request = require('request');
var fs = require('fs');


module.exports = (url, filename, callback = () => console.log('done')) =>
{
    request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
}

