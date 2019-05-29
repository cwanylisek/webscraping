const request = require('request');
const cheerio = require('cheerio');

request('https://www.znanylekarz.pl/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const mediaLeft = $('.media-body');

        console.log(mediaLeft.html());
    }
});