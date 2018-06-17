const fs = require('fs'),
    queue = require('./queue');

fs.readFile('songs', 'utf-8', (error, data) => {
    if (error) {
        throw error;
    }
    var splitSongs = data.split('\n');
    queue.init(splitSongs, (item, finished) => {
        var split = item.split(" ");
    }, () => {
        console.log("Done.")
    });
});