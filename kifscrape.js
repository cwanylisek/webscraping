const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//let href = '';

for (i = 1; i <= 1; i++) {
    const url = 'https://kif.info.pl/rejestr/';

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const number = $('#numer');
            const findButton = $('.kif-rejestr-find');

            const test = $(number).val(333);
            console.log(test.val());
            findButton.trigger('click');
            console.log(findButton)

            // number.each((i, el) => {
            //     const inputs = $(el).find('input').val();
            //     console.log(i, inputs,'inputy');
            // })
        }
    })
}