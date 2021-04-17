<div align="center"><h1>🔥IPL Stats 2021 Season (Discord Bot)🔥</h1></div>


![IPLStats](https://socialify.git.ci/arnabsen1729/IPLStats/image?description=1&descriptionEditable=Discord%20bot%20for%20IPL%20statistics%2C%20standings%20and%20player%20information&font=Rokkitt&forks=1&language=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Dark)

<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>   <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>

[![Follow @arnab1729](https://img.shields.io/github/followers/arnabsen1729?label=follow%20me&style=for-the-badge)](https://github.com/arnabsen1729)

## Description

This bot will give quick and brief updates regarding the IPL 2020. It can display the standings, schedule, live scores, and player stats.

## Deploy your discord bot

First you need to create a **CricApi account** and get the API key. Go to https://www.cricapi.com/ website, register for the free plan. 

>The free plan gives 100 requests per day. But, since the schedule is prefetched, and the standings are scraped from the official IPL website, the number of requests are reduced.

**STEP 1:** Create a Discord Bot Account. This bot doesn't need any extra permissions, just a bot role is enough. For a guide refer to [this](https://realpython.com/how-to-make-a-discord-bot-python/#creating-an-application).

**STEP 2:** Create a Cricapi account, and get the API Key.

> Don't share the API keys and the Discord BOT TOKEN with anyone. Keep them in the .env file.

**STEP 3(Optional):** If you have node installed then you can run the app locally and test it out once, for that just do these

```bash
$ npm i # to install node modules
$ npm run dev # will start the bot and your bot will be online
```

**STEP 4:** Click on the deploy to heroku button. Make sure you configure the API keys in Heroku Settings as well.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/arnabsen1729/IPLStats)


## Usage

Every command given to the bot should be prefixed by `$`.

```
IPL Notifs Commands:-

upcoming:      Schedule of all upcoming IPL matches(at most 6)
live:          Live Score
standings:     Current Standings
player:        Player Info e.g $player Patt Cummins
```

These are the previews:-

`$help`

![help](assets/ss/help.png)

`$upcoming`

![upcoming](assets/ss/upcoming.png)

`$live`

![live](assets/ss/live.png)

`$standings`

![standings](assets/ss/standings.png)

`$player`

![player](assets/ss/player.png)

## Technologies Used:

1. **Discord.js** : For making  the discord bot
2. **Axios** : For fetching data
3. **Cheerio** : For scraping the IPL standings from the official website

For the other datas I have used the [Cricapi](https://cricapi.com/). They have a really nice collection of cricket related APIs
