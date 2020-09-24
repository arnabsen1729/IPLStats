// const request = require('request');
// const cheerio = require('cheerio');

// const PAGE_URL='https://www.iplt20.com/points-table/2020'

// let table = [], row=[], teamNames=[];
// request(PAGE_URL, (error, response, html)=>{
//     if(!error && response.statusCode == 200){
//         const $ = cheerio.load(html);
//         $('.standings-table__team-name--short').each((i, el)=>{
//             const item = $(el).text();
//             teamNames.push(item);
//         })

//         $('.standings-table td').each((i, el)=>{
//             const item = $(el).text();
//             if(i%12==0){
//                 console.log(i);
//                 row=[];
//                 row.push(item);
//             }else if(i%12==11){
//                 table.push(row);
//             }else if(i%12!=1 && i%12!=6 && i%12!=8 && i%12!=9){
//                 row.push(item.replace(' ', ''));
//             }
//         })
        
//         console.log(table);
//         console.log(teamNames);
//     }
// })

// // table = [
// //   [ '1', '2', '1', '1', '0', '+0.993', '2' ],
// //   [ '2', '1', '1', '0', '0', '+0.800', '2' ],
// //   [ '3', '1', '1', '0', '0', '+0.500', '2' ],
// //   [ '4', '1', '1', '0', '0', '+0.000', '2' ],
// //   [ '5', '2', '1', '1', '0', '-0.145', '2' ],
// //   [ '6', '1', '0', '1', '0', '+0.000', '0' ],
// //   [ '7', '1', '0', '1', '0', '-0.500', '0' ],
// //   [ '7', '1', '0', '1', '0', '-0.500', '0' ]
// // ]
// // teamNames = [
// //   'MI',  'RR',
// //   'RCB', 'DC',
// //   'CSK', 'KXIP',
// //   'SRH', 'KKR'
// // ]

// // headers = ['#', 'Teams', 'Played', 'Win', 'Lose', 'Tied', 'Net RR', 'Points'];
// // const SPACE = 9;
// // let msg= '```|';
// // for(let i=0; i<headers.length; i++){
// //     msg+= '\t'+headers[i] + ' '.repeat(SPACE-headers[i].length)+'|';
// // }
// // msg += '\n';
// // for(let i=0; i<headers.length; i++){
// //     msg+= '-'.repeat(SPACE+5);
// // }
// // msg += '\n|';
// // for (let i=0; i<8; i++){
// //     msg += '\t'+teamNames[i]+ ' '.repeat(SPACE-teamNames[i].length)+'|';
// //     for(let j=0; j<table[0].length; j++){
// //         msg += '\t' + table[i][j] + ' '.repeat(SPACE-table[i][j].length)+'|'
// //     }
// //     if(i!=7){
// //         msg += '\n|';
// //     }
   
// // }
// // msg += '```';
// // console.log(msg);