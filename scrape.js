const request = require('request');
//const requestPromise = require('request-promise');
//const Promise = require('bluebird');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('phone.csv');
const contactDate = fs.createWriteStream('data.csv');

//header
writeStream.write(`Phone; url \n`);
contactDate.write(`Name; Adress; url \n`);

var href = '';

for (i = 2; i <= 3; i++) {
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
                const firstLoopHref = $(el).find('.rank-element-name').find('a').attr('href');
                data.length > 1 == true ? console.log(i, data, address, firstLoopHref) : null; //scrape names from first page check if exist
                data.length > 1 == true ? contactDate.write(`${data}; ${address}; ${firstLoopHref} \n`): null;
                //console.log(href);
            })
            //console.log(name.length, 'name count');
        }
    });
}
// setTimeout(() => {
//     const reqHref = href;
//     let splittedHref = reqHref.split('undefined');
//     const options = {
//         uri: `${splittedHref}`,
//         transform: function (html) {
//             return cheerio.load(html);
//         }
//     }
//     requestPromise(options)
//         .then()
//     for (k = 0; k <= splittedHref.length; k++) {
//         let url = splittedHref[k]
//         request(`${url}`, (error, response, html) => {
//             if(!error && response.statusCode == 200) {
         
//                 const $ = cheerio.load(html);

//                 const phone = $('.modal').find('.well').data('data-id', 'phone-number');//.find('a');
//                 if (phone != undefined) {
//                     phone.each((i, el) => {
//                         const number = $(el).find('b').text();
//                         win = number.length > 1 ? console.log(i, number, response) : null;
//                         //console.log(i, number); //nr
//                         //console.log(number.length,'n length');
//                         //writeStream.write(`${number} \n`);
//                         return win
//                     });
//                 } else {
//                     //writeStream.write(`brak numeru \n`);
//                     loose = console.log(i, 'brak numeru');
//                     //console.log(i, 'brak numeru');
//                     return loose
//                 }
//             }
//         });
//     }
// }, 7000 );

setTimeout(() => {
    //phone-numbers
    const reqHref = href;
    let win = [];
    let loose = [];
    let splittedHref = reqHref.split('undefined');
    function downloadPage(url) {
        return new Promise((resolve, reject) => {
            //console.log(splittedHref, 'ilosc');
            //pass properly url's
            //console.log(splittedHref[350]);
            for (x = 0; x <= splittedHref.length; x++) {
                //console.log(splittedHref[x],'href clog')
                request(url, (error, response, html) => {
                    if(!error && response.statusCode == 200) {
                        const $ = cheerio.load(html);
                        const phone = $('.modal').find('.well').data('data-id', 'phone-number');//.find('a');
                        if (phone != undefined) {
                            phone.each((i, el) => {
                                const number = $(el).find('b').text();
                                win = number.length > 1 ? (i, number) : null;
                                //console.log(i, number); //nr
                                resolve(win)
                            })
                        } else {
                            //loose = console.log(i, 'brak numeru');
                            //console.log(i, 'brak numeru');
                            return null;
                        }
                    };
                    //resolve(win);
                    reject(new Error('error'));
                });
            }
        });
    }

    // now to program the "usual" way
    // all you need to do is use async functions and await
    // for functions returning promises

        async function myBackEndLogic(k) {
            try {
                const html = await downloadPage(`${splittedHref[k]}`)
                console.log('SHOULD WORK:'+k);
                console.log(html);
                writeStream.write(`${html} ; ${splittedHref[k]} \n`);
            } catch (error) {
                console.error('ERROR:'+k);
                console.error(error);
                writeStream.write(`brak numeru ; ${splittedHref[k]} \n`);
            }
        }
        console.log(splittedHref.length, 'asdas');
        for (k = 0; k <= splittedHref.length; k++) {
            //console.log(splittedHref[k], 'addres'+k);
            myBackEndLogic(k);
        }

    // run your async function
}, 20000);
