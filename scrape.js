const request = require('request');
const cheerio = require('cheerio');

var href = '';

for (i = 1; i <= 18; i++) {
    const url = 'https://www.znanylekarz.pl/fizjoterapeuta/poznan/'+i;
    //console.log(url);

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const name = $('.content');
    
            name.each((i, el) => {
                const data = $(el).find('.rank-element-name__link').children('span').text().replace(/\s\s+/g, '');
                href += $(el).find('.rank-element-name').find('a').attr('href'); //assignment operator
                const address = $(el).find('ul').text(); 
    
                //console.log(data, href, address); //scrape names from first page
                //console.log(href);
            })
        }
    });
}

setTimeout(() => {
    //phone-numbers
    const reqHref = href;
    let splittedHref = reqHref.split('undefined');
    console.log(splittedHref, 'scnd'); 
    //pass properly url's
    for (x = 0; x <= 20; x++) {
        //console.log(splittedHref,'aftersplit'); 
        request(splittedHref[x], (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                //console.log(splittedHref,'aftersplit'); 
                const name = $('.modal');
        
                name.each((i, el) => {
                    const number = $(el).find('.well').find('.display-flex').first('a').children().text().replace(/\s\s+/g, '');
                    //console.log(number); //nr
                })
        
            }
        });
    }
}, 8000);



