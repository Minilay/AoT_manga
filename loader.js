var img = document.getElementsByTagName("img");
var links = []; 
for(var i = 0; i < img.length; i++)
    links[i] = img[i].getAttribute('src');
