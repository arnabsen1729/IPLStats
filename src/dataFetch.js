require('dotenv').config();
// const fs = require('fs');
const axios = require('axios').default;
const schedule = require('../data.json');
// const API_URL='http://cricscore-api.appspot.com/csa'

const API_KEY = process.env.API_KEY;
const MATHCES_URL = 'https://cricapi.com/api/matches?apikey=' + API_KEY;
const PLAYERID_URL = 'https://cricapi.com/api/playerFinder/?apikey=' + API_KEY;
const PLAYERSTAT_URL = 'https://cricapi.com/api/playerStats?&apikey=' + API_KEY;
const LIVE_URL = 'https://cricapi.com/api/cricketScore/?apikey=' + API_KEY;
const TEAMS = [
    'Delhi Capitals',
    'Chennai Super Kings',
    'Kings XI Punjab',
    'Kolkata Knight Riders',
    'Mumbai Indians',
    'Rajasthan Royals',
    'Royal Challengers Bangalore',
    'Sunrisers Hyderabad',
];

getUpcommingMatch = () => {
    let IPLMatches = [];
    for (match of schedule) {
        if (new Date(match.dateTimeGMT) > new Date()) {
            IPLMatches.push({
                ...match,
            });
        }
    }
    return IPLMatches;
};

getCurrentMatchID = () => {
    let sameDay = [];
    for (match of schedule) {
        if (
            new Date(match.dateTimeGMT).getDate() == new Date().getDate() &&
            new Date(match.dateTimeGMT).getTime() <= new Date().getTime()
        ) {
            sameDay.push(match.unique_id);
        }
    }
    return sameDay[0];
};

getLiveData = async () => {
    const resp = await axios.get(
        `${LIVE_URL}&unique_id=${getCurrentMatchID()}`
    );
    return resp.data;
};

getPlayerStats = async (name) => {
    try {
        const resp = await axios.get(`${PLAYERID_URL}&name=${encodeURI(name)}`);

        // resp.then((val)=>{console.log(val)});
        const pid = resp.data.data[0].pid;
        const playerStat = await axios.get(`${PLAYERSTAT_URL}&pid=${pid}`);

        return playerStat.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

// getPlayerStats('Sachin Rana')
module.exports = { getUpcommingMatch, getPlayerStats, getLiveData };
