var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var dotenv = require("dotenv").config();
var keys = require("./keys.js");

var moment = require('moment');
moment().format();

//spotify keys
var spotify = new Spotify(keys.spotify);

//input variables
var command = process.argv[2];
var input = process.argv[3];


//concert this function
function concertIt(bandQuery) {
//omdb request
var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp";
console.log(queryUrl);
request(queryUrl, function(error, response, body){
    if(!error && response.statusCode === 200){
        var concertData = JSON.parse(body);
        var concertDT = concertData[0].datetime;
        var momentDT = moment().format('L');

        console.log("-------------");
//venue
        console.log("venue name: " + concertData[0].venue.name +
//location        
    "\nVenue location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
//date of event
    "\nDate of event: " + momentDT + "\n-----------");
    };
  });
}

concertIt();


//spotify this song function
function spotifyIt(musicSearch) {
//default song to display 
if (musicSearch === undefinded || null) {
    musicSearch = "The Sign Ace of Base";
}
//normal search
spotify.search({type: 'track', query: musicSearch}, function (err, data){
    if (err) {
        return console.log("error occured: " + err);
    }
    else {for (i = 0; i < data.tracks.items.length && i < 3; i++){
        var musicQuery = data.tracks.items[i];
//artist
        console.log("artist: " + musicQuery.artists[0].name + 
//song name        
        "\nSong name: " + musicQuery.name + 
//preview link
        "\nLink to song: " + musicQuery.preview_url +
//album        
        "\nAlbum name: " + musicQuery.album.name +
        "\n---------");        
        }
     };
  });
}
//test
spotifyIt();