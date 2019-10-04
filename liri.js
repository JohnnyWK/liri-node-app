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
    console.log("Searching Spotify for %s.", term)
}
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