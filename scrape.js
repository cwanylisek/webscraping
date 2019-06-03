const request = require('request');
const cheerio = require('cheerio');

var href = [];

for (i = 1; i <= 1; i++) {
    const url = 'https://www.znanylekarz.pl/fizjoterapeuta/poznan/'+i;
    //console.log(url);

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const name = $('.content');
    
            name.each((i, el) => {
                const data = $(el).find('.rank-element-name__link').children('span').text().replace(/\s\+/g, '');
                href = $(el).find('.rank-element-name__link').attr('href');
                const address = $(el).find('ul').text(); 
    
                //console.log(data, href, address); //scrape names from first page
                console.log(href, 'linki');
            })
        }
    });
}
// todo pass value of requested href variable to new request
setTimeout(() => {
    let reqHref = href;
    console.log(reqHref);
    //phone-numbers
    for (x = 0; x <= 20; x++) {
        request('https://www.znanylekarz.pl/robert-hetman/fizjoterapeuta-terapeuta/poznan#address-id=[863180]', (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
        
                const name = $('.modal');
        
                name.each((i, el) => {
                    const number = $(el).find('.well').find('.display-flex').first('a').text();
                    //console.log(number); //nr
                })
        
            }
        });
    }
}, 8000);



