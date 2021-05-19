var needle = require('needle');
var cheerio = require('cheerio');
var fs = require('fs');
var URL = 'https://ww1.attackontitanread.com';


needle.get(URL, function(err, res){
    if (err) throw err;

    var links = [];
    var $ = cheerio.load(res.body);
    let chapters = $('td').children();
    for(let x of chapters)
    {
        links.push(x.attribs.href);
    }

    var json = JSON.stringify(links);
    fs.writeFile('links.json', json, 'utf-8', () => console.log('links are done'));
});

