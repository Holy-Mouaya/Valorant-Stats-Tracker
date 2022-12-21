const express = require('express');
const app = express();
const port = process.env.PORT || 5000 ;
//const path = require('path');
const fetch = require('node-fetch');

/*
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}
*/

app.get('/', (req, res) => {
  res.send("Hello world");
})

//Returns the user's account name and tag
app.get('/valorant/:username/:tag', async(req, res) => {
  var username = req.params.username;
  var tag = req.params.tag;
  var playerUrl = `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`;
  const fetchApi = await fetch(playerUrl);
  const valoResponse = await fetchApi.json();
  res.json(valoResponse);
})

//Returns the user's account name and tag
app.get('/valorant/:username/:tag/playercard', async(req, res) => {
  var username = req.params.username;
  var tag = req.params.tag;
  var playerUrl = `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`;
  const fetchApi = await fetch(playerUrl);
  const valoResponse = await fetchApi.json();
  let cardUrl = valoResponse.data.card.small;
  res.json(cardUrl)
})

//Returns the user's rank
app.get('/valorant/:region/:username/:tag/rank', async(req, res) => {
  var username = req.params.username;
  var tag = req.params.tag;
  var region = req.params.region;
  var playerUrl = `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${username}/${tag}`;
  const fetchApi = await fetch(playerUrl);
  const valoResponse = await fetchApi.json();
  res.json(valoResponse.data.currenttierpatched);
})

//Returns the user's match making rating for the last 15 games
app.get('/valorant/:region/:username/:tag/eloChange', async(req, res) => {
  var username = req.params.username
  var tag = req.params.tag
  var region = req.params.region
  var playerUrl = `https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${username}/${tag}`
  const fetchApi = await fetch(playerUrl)
  const valoResponse = await fetchApi.json()
  const matches = valoResponse.data

  var mmr = Array.apply(null, Array(15)).map(function () {})
  var j=0;
  if (matches.length >= 15){
    for(i=14; i >= 0;i--,j++){
      mmr[j] = matches[i].elo;
    }
  }
  else if(matches.length <= 5){
  }
  else{
    for (i=(matches.length-1); i>=0; i--, j++){
      mmr[j] = matches[i].elo;
    }
  }

  newMMR = mmr.filter(a => a !== undefined)
  res.json(newMMR)

})

//Returns an array indicating the user's wins and losses for his last 15 games
app.get('/valorant/:region/:username/:tag/winrate', async(req, res) => {
  var username = req.params.username
  var tag = req.params.tag
  var region = req.params.region
  var playerUrl = `https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${username}/${tag}`
  const fetchApi = await fetch(playerUrl)
  const valoResponse = await fetchApi.json()
  const matches = valoResponse.data

  var winrate = [0,0]
  var j=0;
  if (matches.length >= 15){
    for(i=14; i >= 0;i--,j++){
      if (matches[i].mmr_change_to_last_game <= -4){
        winrate[1]++;
      }
      else if(matches[i].mmr_change_to_last_game >= 4){
        winrate[0]++;
      }
      else{
      }
    }
  }
  else if(matches.length <= 5){
  }
  else{
    for (i=(matches.length-1); i>=0; i--, j++){
      if (matches[i].mmr_change_to_last_game <= -4){
        winrate[1]++;
      }
      else if(matches[i].mmr_change_to_last_game >= 4){
        winrate[0]++;
      }
      else{
      }
    }
  }
  res.json(winrate)

})



//returns the player's KDA
app.get('/valorant/:region/:username/:tag/KDA', async(req, res) => {
  var username = req.params.username
  var tag = req.params.tag
  var region = req.params.region
  var playerUrl = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${username}/${tag}?filter=competitive`
  const fetchApi = await fetch(playerUrl)
  const valoResponse = await fetchApi.json()
  const matches = valoResponse.data
  
  var indexArray = Array(matches.length);
  
  //stores the player's index for every match in indexArray
  for(let i = 0; i < matches.length ; i++){
    for(let j = 0; j < matches[i].players.all_players.length; j++){
      if(matches[i].players.all_players[j].name.toLowerCase() == username.toLowerCase() && matches[i].players.all_players[j].tag.toLowerCase() == tag.toLowerCase()){
        indexArray[i] = j;
        break;
      }
    }
  }

  var elims = 0;
  var deaths = 0;
  for (let i = 0; i < matches.length; i++){
    var matchKill = matches[i].players.all_players[indexArray[i]].stats.kills;
    var matchDeath = matches[i].players.all_players[indexArray[i]].stats.deaths;
    elims = elims + matchKill;
    deaths = deaths + matchDeath;
  }
  var KDA = parseFloat(elims/deaths).toPrecision(2);
  res.json(KDA)
})





//Returns the player's most used agent for all his matches
app.get('/valorant/:region/:username/:tag/agent', async(req, res) => {
  var username = req.params.username
  var tag = req.params.tag
  var region = req.params.region
  var playerUrl = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${username}/${tag}?filter=competitive`
  const fetchApi = await fetch(playerUrl)
  const valoResponse = await fetchApi.json()
  const matches = valoResponse.data
  
  var indexArray = Array(matches.length);
  
  //stores the player's index for every match in indexArray
  for(let i = 0; i < matches.length ; i++){
    for(let j = 0; j < matches[i].players.all_players.length; j++){
      if(matches[i].players.all_players[j].name.toLowerCase() == username.toLowerCase() && matches[i].players.all_players[j].tag.toLowerCase() == tag.toLowerCase()){
        indexArray[i] = j;
        break;
      }
    }
  }

  //stores the highest occuring Valorant character from all matches in maxElement
  var maxElement = matches[0].players.all_players[indexArray[0]].character;
  var maxCount = 1;
  var agentCount = {};
  for (let i = 0; i < matches.length; i++){
    var element = matches[i].players.all_players[indexArray[i]].character;
    if(agentCount[element] == null){
      agentCount[element] = 1;
    }
    else{
      agentCount[element]++;
    }
    if(agentCount[element] > maxCount){
      maxElement = element;
      maxCount = agentCount[element];
    }
  }
  res.json(maxElement)
})

//Returns stats for the user's last 5 matches in an array
app.get('/valorant/:region/:username/:tag/matchstats', async(req, res) => {
  var username = req.params.username
  var tag = req.params.tag
  var region = req.params.region
  var playerUrl = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${username}/${tag}?filter=competitive`
  const fetchApi = await fetch(playerUrl)
  const valoResponse = await fetchApi.json()
  const matches = valoResponse.data
  
  var indexArray = Array(matches.length);
  
  //stores the player's index for every match in indexArray
  for(let i = 0; i < matches.length ; i++){
    for(let j = 0; j < matches[i].players.all_players.length; j++){
      if(matches[i].players.all_players[j].name.toLowerCase() == username.toLowerCase() && matches[i].players.all_players[j].tag.toLowerCase() == tag.toLowerCase()){
        indexArray[i] = j;
        break;
      }
    }
  }

  //Going through the user's matches and retrieving specific stats
  let statsArr = [];
  for (let i = 0; i < matches.length; i++){
    let agent = matches[i].players.all_players[indexArray[i]].character;

    let userTeam = matches[i].players.all_players[indexArray[i]].team;
    userTeam = userTeam.toLowerCase();
    let userRoundsWon = matches[i].teams[userTeam].rounds_won;
    let enemyRoundsWon;
    if(userTeam == 'blue'){
      enemyRoundsWon = matches[i].teams.red.rounds_won;
    }else{
      enemyRoundsWon = matches[i].teams.blue.rounds_won;
    }

    let userKills = matches[i].players.all_players[indexArray[i]].stats.kills;
    let userDeaths = matches[i].players.all_players[indexArray[i]].stats.deaths;
    let userAssists = matches[i].players.all_players[indexArray[i]].stats.assists;
    let kdaArr = [userKills, userDeaths, userAssists];

    let userKD = (userKills/userDeaths).toFixed(1);

    statsArr[i]= [agent, [userRoundsWon, enemyRoundsWon], kdaArr, userKD]
  }
  res.json(statsArr);
})


app.listen(port, (err) => { 
  if (err) return console.log(err);
  console.log("Server started on port " + port)
})
