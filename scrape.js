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
    console.log(splittedHref.length, 'ilosc');
    //pass properly url's
    console.log(splittedHref[100]);
    for (x = 0; x <= splittedHref.length; x++) {
        request(splittedHref[100], (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const phone = $('.modal').find('.well').data('data-id', 'phone-number').find('a');
                if (phone != undefined) {
                    phone.each((i, el) => {
                        const number = $(el).find('b').text();
                        console.log(number); //nr
                    })
                } else {
                    return console.log('brak numeru');
                }
            };
        });
    }
}, 8000);



