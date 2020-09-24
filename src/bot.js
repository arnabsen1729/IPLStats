require('dotenv').config();

const {Client} = require('discord.js');
const Discord = require('discord.js')
const client = new Client();
const PREFIX = "$"
const {getUpcommingMatch} = require('./dataFetch.js')

client.on('ready', ()=>{
    // getUpcommingMatch();
    console.log(`${client.user.username} has joined`)
})

sendUpcommingMatch = (match, channel)=>{
    const newMatchEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${match['team-1']}  vs   ${match['team-2']}`)
    channel.send(newMatchEmbed);
}

sendScheduleMatch = (matches, channel)=>{
    let fields = [];
    if(matches.length>6){
        matches=matches.slice(0, 6);
    }
    for (match of matches){
        // console.log(match['unique_id'])
        fields.push({
            name: match['team-1'],
            value: `Date: ${new Date(match["dateTimeGMT"]).toLocaleDateString()}`,
            inline: true
        })
        fields.push({
            name: match['team-2'],
            value: `Time: ${new Date(match["dateTimeGMT"]).toLocaleTimeString()}`,
            inline: true
        })
        fields.push({ name: '\u200B', value: '\u200B' })
    }

    const matchEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Upcomming Matches')
    .setDescription('Team 1  vs  Team 2')
	.setURL('https://www.iplt20.com/')
	.setThumbnail('https://i.imgur.com/WdkS5wH.jpg')
	.addFields(fields)
	.setTimestamp()

    channel.send(matchEmbed);
}

client.on('message', (message)=>{
    if(message.author.bot) return;
    console.log(`${message.author.username}: ${message.content}`);
    
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
        console.log(CMD_NAME, args);

        if(CMD_NAME=='upcomming'){
            let upcommingMatch = getUpcommingMatch();
            sendScheduleMatch(upcommingMatch, message.channel);
            // console.log(prData);
            // prData.then((upcommingMatch)=>{
            //     console.log(upcommingMatch);
            //                     
            // })
            
        }else if(CMD_NAME==='help'){
            message.channel.send('```IPL Notifs Commands:-  \nupcomming: \tSchedule of all upcoming IPL matched(at most 6)\nlive:  \t\tLive Score\nstandings: \tCurrent Standings```')
        }
    }
})
client.login(process.env.DISCORD_BOT_TOKEN);