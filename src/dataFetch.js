require('dotenv').config();
const fs = require('fs');
const axios = require('axios').default;
const schedule = require('../data.json');
// const API_URL='http://cricscore-api.appspot.com/csa'

const API_KEY = process.env.API_KEY;
const MATHCES_URL='https://cricapi.com/api/matches?apikey='+API_KEY
const TEAMS = [
'Delhi Capitals',
'Chennai Super Kings',
'Kings XI Punjab',
'Kolkata Knight Riders',
'Mumbai Indians',
'Rajasthan Royals',
'Royal Challengers Bangalore',
'Sunrisers Hyderabad']


// getUpcommingMatch = async ()=>{
//     let IPLMatches = [];
//     const resp = await axios.get(MATHCES_URL);
//     const response = await resp;
//     console.log(response);
//     try{
//         const matches = response.data.matches;
//         for (match of matches){
//             if(TEAMS.includes(match['team-1']) && TEAMS.includes(match['team-2'])){
//                 IPLMatches.push({
//                     ...match
//                 })
//             }
//         }
//     }catch(err){
//         console.log(err);
//     }
//     // console.log(IPLMatches);
//     return IPLMatches;
// }

getUpcommingMatch = ()=>{
    let IPLMatches = [];
    for (match of schedule){
        if(new Date(match.dateTimeGMT) > new Date()){
            IPLMatches.push({
                ...match
            })
        }
    }
    return IPLMatches;
}

// getUpcommingMatch();
// console.log(schedule);
// const val = getUpcommingMatch();
// val.then((data)=>{
//     fs.writeFile('data.json', JSON.stringify(data), function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });
// })
module.exports = {getUpcommingMatch}