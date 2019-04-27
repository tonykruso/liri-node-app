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
// console.log(queryUrl);
request(queryUrl, function(error, response, body){
    if(!error && response.statusCode === 200){
        var concertData = JSON.parse(body);
        var concertDT = concertData[0].datetime
        var momentDT = moment().format('L');

        console.log("-------------");
        console.log(concertDT);
//venue        
    console.log("venue name: " + concertData[0].venue.name +
//location        
    "\nVenue location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
//date of event
    "\nDate of event: " + momentDT + "\n-----------");
    };
  });
}

//test
// concertIt();


//spotify this song function
function spotifyIt(musicQuery) {
//default song to display 
if (musicQuery === undefined || null) {
    musicQuery = "The Sign Ace of Base";
}
//normal search
spotify.search({type: 'track', query: musicQuery}, function (err, data){
    if (err) {
        return console.log("error occured: " + err);
    }
    else {for (i = 0; i < data.tracks.items.length && i < 5; i++){
        var musicQuery = data.tracks.items[i];
//artist, song name, link, album name
        console.log("artist: " + musicQuery.artists[0].name +    
        "\nSong name: " + musicQuery.name + 
        "\nLink to song: " + musicQuery.preview_url +
        "\nAlbum name: " + musicQuery.album.name +
        "\n---------");        
        }
     };
  });
}
//test
// spotifyIt();



//movie this function
function movieIt (movieQuery) {
    if(movieQuery === undefined || null) {
        movieQuery = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";
// console.log(queryUrl);
    request(queryUrl, function (error, response, body){
        if(!error && response.statusCode ===200){
//json pull
            var movieData = JSON.parse(body);
            console.log("---------");
//movie title, year, rating, rotten tomatoes rating, country, language, plot and actors in 1 console log
            console.log("Movie Title: " + movieData.Title +
            "\nYear: " + movieData.released + 
            "\nIMDB Rating: " + movieData.imdbRating +
            "\n Rotten Tomatoes Rating: " + movieData.Ratings[1].Value +
            "\nCountry: " + movieData.Country +
            "\nLanguage: " + movieData.Language + 
            "\nPlot: " + movieData.Plot +
            "\nActors: " + movieData.Actors +
            "\n----------");            
        };
    });
}

//test
// movieIt();

//switch statments for each function
var ask = function (commands, newData){
    switch(commands){
        case "concert-this":
        concertIt(newData);
        break;
        case "movie-this":
        movieIt(newData);
        break;
        case "spotify-this-song":
        spotifyIt(newData);
        break;
        case "do-what-it-says":
        doWhatItSays();
        break;
        default:
        console.log("invalid. please try again.");
    }
};

//do what it says, adds to random.txt
var doWhatItSays = function(){
    fs.readFile("random.txt", "UTF8", function(err, data){
        if(err) throw err;
        var randomText=data.split(",");
        if(randomText.length==2){
            ask(randomText[0], randomText[1]);
        }
        else if(randomText.length===1){
            ask(randomText[0]);
        }
    });
}

ask (command, input);