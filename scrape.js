const request = require('request');
const cheerio = require('cheerio');

var href = '';

for (i = 1; i <= 1; i++) {
    const url = 'https://www.znanylekarz.pl/fizjoterapeuta/poznan/'+i;
    //console.log(url);

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const name = $('.content');
    
            name.each((i, el) => {
                const data = $(el).find('.rank-element-name__link').children('span').text().replace(/\s\+/g, '');
                href += $(el).find('.rank-element-name__link').attr('href'); //assignment operator
                const address = $(el).find('ul').text(); 
    
                //console.log(data, href, address); //scrape names from first page
                //console.log(href, 'linki');
            })
        }
    });
}
// todo pass value of requested href variable to new request
setTimeout(() => {
    //phone-numbers
    for (x = 0; x <= 20; x++) {
        var reqHref = href;
        //console.log(reqHref,'hereee reqHref');
        //console.log(typeof(reqHref),'type');
        splittedHref = reqHref.split('undefined');
        //pass properly url's
        console.log(splittedHref,'aftersplit');  
        request(splittedHref, (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                console.log(splittedHref,'aftersplit');  
                const name = $('.modal');
        
                name.each((i, el) => {
                    const number = $(el).find('.well').find('.display-flex').first('a').text();
                    console.log(number, 'number'); //nr
                })
        
            }
        });
    }
}, 8000);



