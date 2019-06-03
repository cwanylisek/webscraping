const request = require('request');
const cheerio = require('cheerio');

request('https://www.znanylekarz.pl/fizjoterapeuta/poznan', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const name = $('.rank-element-name__link').children('span');

        name.each((i, el) => {
            const top = $(el).text();

            console.log(top); //scrape names from first page
        })

    }
});