require('dotenv').config();

const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const PREFIX = '$';
const {
    getUpcommingMatch,
    getPlayerStats,
    getLiveData,
} = require('./dataFetch.js');

const request = require('request');
const cheerio = require('cheerio');

const PAGE_URL = 'https://www.iplt20.com/points-table/2020';

sendLiveData = (data, channel) => {
    console.log('livedata');
    const liveEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(data['score'])
        .setDescription(data['stat'])
        .setURL('https://www.iplt20.com/')
        .setThumbnail('https://i.imgur.com/WdkS5wH.jpg')
        .setTimestamp();

    channel.send(liveEmbed);
};

sendStandings = (channel) => {
    let table = [],
        row = [],
        teamNames = [];
    try {
        request(PAGE_URL, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $('.standings-table__team-name--short').each((i, el) => {
                    const item = $(el).text();
                    teamNames.push(item);
                });

                $('.standings-table td').each((i, el) => {
                    const item = $(el).text();
                    if (i % 12 == 0) {
                        console.log(i);
                        row = [];
                        // row.push(item);
                    } else if (i % 12 == 11) {
                        table.push(row);
                    } else if (
                        i % 12 != 1 &&
                        i % 12 != 6 &&
                        i % 12 != 5 &&
                        i % 12 != 8 &&
                        i % 12 != 9
                    ) {
                        row.push(item.replace(' ', ''));
                    }
                });

                headers = [
                    'Teams',
                    'Played',
                    'Win',
                    'Lose',
                    'Net RR',
                    'Points',
                ];
                const SPACE = 6;
                let msg = '```|';
                for (let i = 0; i < headers.length; i++) {
                    msg +=
                        '  ' +
                        headers[i] +
                        ' '.repeat(SPACE - headers[i].length) +
                        '|';
                }
                msg += '\n';
                for (let i = 0; i < headers.length; i++) {
                    msg += '-'.repeat(SPACE + 3);
                }
                msg += '\n|';
                for (let i = 0; i < 8; i++) {
                    msg +=
                        '  ' +
                        teamNames[i] +
                        ' '.repeat(SPACE - teamNames[i].length) +
                        '|';
                    for (let j = 0; j < table[0].length; j++) {
                        msg +=
                            '  ' +
                            table[i][j] +
                            ' '.repeat(SPACE - table[i][j].length) +
                            '|';
                    }
                    if (i != 7) {
                        msg += '\n|';
                    }
                }
                msg += '```';
                channel.send('**IPL 2020 Standings**\n');
                channel.send(msg);
            }
        });
    } catch (err) {
        console.log(err);
        channel.send('> Something went wrong :(');
    }
};

client.on('ready', () => {
    console.log(`${client.user.username} has joined`);
});

sendScheduleMatch = (matches, channel) => {
    let fields = [];
    if (matches.length > 6) {
        matches = matches.slice(0, 6);
    }
    for (match of matches) {
        fields.push({
            name: match['team-1'],
            value: `Date: ${new Date(match['dateTimeGMT']).toLocaleDateString(
                'en-US',
                'Asia/Kolkata'
            )}`,
            inline: true,
        });
        fields.push({
            name: match['team-2'],
            value: `Time: ${new Date(match['dateTimeGMT']).toLocaleTimeString(
                'en-US',
                'Asia/Kolkata'
            )}`,
            inline: true,
        });
        fields.push({ name: '\u200B', value: '\u200B' });
    }

    const matchEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Upcoming Matches')
        .setDescription('Team 1  vs  Team 2')
        .setURL('https://www.iplt20.com/')
        .setThumbnail('https://i.imgur.com/WdkS5wH.jpg')
        .addFields(fields)
        .setTimestamp();

    channel.send(matchEmbed);
};

sendPlayerStats = (stats, channel) => {
    try {
        console.log(stats['imageURL']);
        const matchEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(stats['fullName'])
            .setDescription(stats['country'])
            .setURL('https://www.iplt20.com/')
            .setThumbnail(stats['imageURL'])
            .addFields([
                {
                    name: 'Teams',
                    value: stats['majorTeams'].split(','),
                },
                { name: 'Playing Role', value: stats['playingRole'] },
                {
                    name: 'Batting Style',
                    value: stats['battingStyle'],
                    inline: true,
                },
                {
                    name: 'Batting Style',
                    value: stats['battingStyle'],
                    inline: true,
                },
                { name: 'Current Age', value: stats['currentAge'] },
            ])
            .setImage(stats['imageURL'])
            .setTimestamp();
        channel.send(matchEmbed);
    } catch (err) {
        channel.send('> Sorry something went wrong !!');
    }
};

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        console.log(CMD_NAME, args);

        if (CMD_NAME == 'upcoming') {
            let upcommingMatch = getUpcommingMatch();
            sendScheduleMatch(upcommingMatch, message.channel);
        } else if (CMD_NAME == 'player') {
            if (args.length === 0) {
                message.channel.send(
                    '```Enter player name\n Correct syntax: $player <player_name> .\nFor more help type $help```'
                );
                return;
            }
            const name = args.join(' ');
            const playerStat = getPlayerStats(name);
            if (playerStat == null) {
                message.channel.send(
                    '```Enter player name\nCorrect syntax: $player <player_name> \nFor more help type $help```'
                );
                return;
            }
            console.log(playerStat);
            playerStat.then((value) => {
                sendPlayerStats(value, message.channel);
            });
            return;
        } else if (CMD_NAME === 'help') {
            message.channel.send(
                '```IPL Notifs Commands:-  \nupcoming:  \tSchedule of all upcoming IPL matches(at most 6)\nlive:  \t\tLive Score\nstandings: \tCurrent Standings\nplayer:    \tPlayer Info e.g $player Patt Cummins```'
            );
            return;
        } else if (CMD_NAME === 'standings') {
            sendStandings(message.channel);
            return;
        } else if (CMD_NAME === 'live') {
            const liveData = getLiveData();
            liveData.then((val) => {
                sendLiveData(val, message.channel);
            });
            return;
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
