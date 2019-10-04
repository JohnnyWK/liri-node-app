// var math = require('./demo_func');
// var number = 4;
// math.add(1, 3)

require('dotenv').config()
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv.splice(3).join(" ");

RunLiri(userOption, inputParameter)

function RunLiri(command, searchTerm){
    switch(command){
        case 'movie-this':
            return searchOMDB(searchTerm);
        case 'spotify-this-song':
            return searchSpotify(searchTerm);
        case 'do-what-it-says':
            return runDoIt();
        case 'concert-this':
            return searchBands(searchTerm);
        default:
            return console.log("Command not good!", command)
    }

    // if(command === 'movie-this'){
    //     searchOMDB(searchTerm)
    // }
    // else if(command === 'spotify-this-song'){
    //     searchSpotify(searchTerm)
    // }
}
function searchOMDB(term){
    console.log("Searching OMDB for %s.", term)
}
function searchSpotify(term){
    // console.log("Searching Spotify for %s.", term)
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("log.txt", "*****************************\n");
             }
        }
    );
}
function searchBands(term){
    // console.log("Searching BandsInTown for %s.", term)
    var queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var results = JSON.parse(body);
        for (var i = 0; i < results.length; i++) {  
            console.log("**********EVENT INFO*********");  
            fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Venue: " + results[i].venue.name);
            fs.appendFileSync("log.txt", "Venue: " + results[i].venue.name+"\n");
            console.log("Location: " +  results[i].venue.city);
            fs.appendFileSync("log.txt", "Location: " +  results[i].venue.city+"\n");
            console.log("Date: " +  results[i].datetime);
            fs.appendFileSync("log.txt", "Date: " +  results[i].datetime+"\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+"\n");
        }
    } else{
      console.log('Error occurred.');
    }
});}

function runDoIt(){
    fs.readFile("./textFiles/random.txt", "utf8", function(err, data){
        if(err) throw err;
        data = data.split(",")

        for(var i = 0; i < data.length; i++){
            if(i % 2 === 0){
                RunLiri(data[i], data[i+1])
            }
        }
    })
}