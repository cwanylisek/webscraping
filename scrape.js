const request = require('request');
const cheerio = require('cheerio');

for (i = 1; i < 18; i++) {
    const url = 'https://www.znanylekarz.pl/fizjoterapeuta/poznan/'+i;
    //console.log(url);

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const name = $('.content');
    
            name.each((i, el) => {
                const data = $(el).find('.rank-element-name__link').children('span').text().replace(/\s\+/g, '');
    
                const address = $(el).find('ul').text(); 
    
                console.log(data, address); //scrape names from first page
            })
    
        }
    });
}

