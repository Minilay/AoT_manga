

var needle = require('needle');
var cheerio = require('cheerio');
var download = require('./modules/download'); 
var fs = require('fs');
var links = require('./links.json');
var chapterCounter = 0;
for(let i = 0; i < links.length; i++)
{
    let chapter = links[i].slice(64).slice(0, -13);
    let dir = './chapters/';
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);

    var URL = links[i];
    needle.get(URL, function(err, res){
        if (err) throw err;
    
        var $ = cheerio.load(res.body);
        var imagesDOM = $("img");
        dir += chapter;

        if(!fs.existsSync(dir))
            fs.mkdirSync(dir);
        for(let j = 0; j < imagesDOM.length; j++)
        {
            var x = 0;
            download(imagesDOM[j].attribs.src, `${dir}/${j}.jpg`, () => 
                {
                    x++;
                    if(x == imagesDOM.length - 1)
                    {
                        chapterCounter++;
                        let percent = chapterCounter / links.length * 100;
                        console.log(`Chapter ${chapter} is ready - ${percent.toPrecision(3)}%`);
                    }
                }
            );
        }
    });
}