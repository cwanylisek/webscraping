const request = require('request');
const requestPromise = require('request-promise');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.txt');
const contactDate = fs.createWriteStream('contact.txt');

//header
writeStream.write(`Phone \n`);
contactDate.write(`Name, Adress \n`);

var href = '';

for (i = 1; i <= 1; i++) {
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
                data.length > 1 == true ? console.log(i, data, address) : null; //scrape names from first page check if exist
                //contactDate.write(`${data} ${address} \n`);
                //console.log(href);
            })
            //console.log(name.length, 'name count');
        }
    });
}
setTimeout(() => {
    const reqHref = href;
    let splittedHref = reqHref.split('undefined');
    Promise.map(splittedHref, requestPromise)
        .map((htmlOnePage, index) => {
            const $ = cheerio.load(html);
            const phone = $('.modal').find('.well').data('data-id', 'phone-number');//.find('a');
            if (phone != undefined) {
                phone.each((i, el) => {
                    const number = $(el).find('b').text();
                    win = number.length > 1 ? console.log(i, number, response) : null;
                    //console.log(i, number); //nr
                    //console.log(number.length,'n length');
                    //writeStream.write(`${number} \n`);
                    return win
                });
            } else {
                //writeStream.write(`brak numeru \n`);
                loose = console.log(i, 'brak numeru');
                //console.log(i, 'brak numeru');
                return loose
            }
            let phoneContainer = {};
            phoneContainer[splittedHref[index]] = phone;
            return phoneContainer;
    }).then(console.log).catch((e) => console.log('We encountered an error' + e));
    // for (k = 0; k <= splittedHref.length; k++) {
    //     let url = splittedHref[k]
    //     request(`${url}`, (error, response, html) => {
    //         if(!error && response.statusCode == 200) {
         
    //             const $ = cheerio.load(html);

    //             const phone = $('.modal').find('.well').data('data-id', 'phone-number');//.find('a');
    //             if (phone != undefined) {
    //                 phone.each((i, el) => {
    //                     const number = $(el).find('b').text();
    //                     win = number.length > 1 ? console.log(i, number, response) : null;
    //                     //console.log(i, number); //nr
    //                     //console.log(number.length,'n length');
    //                     //writeStream.write(`${number} \n`);
    //                     return win
    //                 });
    //             } else {
    //                 //writeStream.write(`brak numeru \n`);
    //                 loose = console.log(i, 'brak numeru');
    //                 //console.log(i, 'brak numeru');
    //                 return loose
    //             }
    //         }
    //     });
    // }
}, 7000 );

// setTimeout(() => {
//     //phone-numbers
//     const reqHref = href;
//     let win = [];
//     let loose = [];
//     let splittedHref = reqHref.split('undefined');
//     function downloadPage(url) {
//         return new Promise((resolve, reject) => {
//             //console.log(splittedHref, 'ilosc');
//             //pass properly url's
//             //console.log(splittedHref[350]);
//             console.log(url, 'url'+x);
//             for (x = 0; x <= splittedHref.length; x++) {
//                 //console.log(splittedHref[x],'href clog')
//                 request(url, (error, response, html) => {
//                     if(!error && response.statusCode == 200) {
//                         const $ = cheerio.load(html);
//                         const phone = $('.modal').find('.well').data('data-id', 'phone-number');//.find('a');
//                         if (phone != undefined) {
//                             phone.each((i, el) => {
//                                 const number = $(el).find('b').text();
//                                 win = number.length > 1 ? (i, number) : null;
//                                 //console.log(i, number); //nr
//                                 //console.log(number.length,'n length');
//                                 //writeStream.write(`${number} \n`);
//                                 return win
//                             })
//                         } else {
//                             //writeStream.write(`brak numeru \n`);
//                             loose = console.log(i, 'brak numeru');
//                             //console.log(i, 'brak numeru');
//                             return loose
//                         }
//                     };
//                     resolve(win);
//                     reject(new Error('error'));
//                 });
//             }
//         });
//     }

//     // now to program the "usual" way
//     // all you need to do is use async functions and await
//     // for functions returning promises

//         async function myBackEndLogic(k) {
//             try {
//                 const html = await downloadPage(`${splittedHref[k]}`)
//                 console.log('SHOULD WORK:'+k);
//                 console.log(html);
//             } catch (error) {
//                 console.error('ERROR:');
//                 console.error(error);
//             }
//         }
//         console.log(splittedHref.length, 'asdas');
//         for (k = 0; k <= 21; k++) {
//             myBackEndLogic(k);
//         }

//     // run your async function
// }, 8000);

//poprawic przechodzenie przez numery, żeby zwracało tylko jeden numer i to dokładnie wartosc containera który nr posiada

// ASYNC AWAIT FUNCTION

// wrap a request in an promise
// function downloadPage(url) {
//     return new Promise((resolve, reject) => {
//         request(url, (error, response, body) => {
//             if (error) reject(error);
//             if (response.statusCode != 200) {
//                 reject('Invalid status code <' + response.statusCode + '>');
//             }
//             resolve(body);
//         });
//     });
// }

// // now to program the "usual" way
// // all you need to do is use async functions and await
// // for functions returning promises
// async function myBackEndLogic() {
//     try {
//         const html = await downloadPage('https://microsoft.com')
//         console.log('SHOULD WORK:');
//         console.log(html);

//         // try downloading an invalid url
//         await downloadPage('http://      .com')
//     } catch (error) {
//         console.error('ERROR:');
//         console.error(error);
//     }
// }

// // run your async function
// myBackEndLogic();