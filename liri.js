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
        "\nsong name: " + musicQuery.name + 
//preview link
        "\nlink to song: " + musicQuery.preview_url +
//album        
        "\nalbum name: " + musicQuery.album.name +
        "\n---------");        
        }
     };
  });
}
//test
spotifyIt();