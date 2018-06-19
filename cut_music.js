const fs = require('fs'),
    queue = require('./queue'),
    child_process = require('child_process');

fs.readFile('songs', 'utf-8', (error, data) => {
    if (error) {
        throw error;
    }
    var splitSongs = data.split('\n');
    queue.init(splitSongs, (item, finished) => {
        var split = item.split(";"),
            duration = split[1].trim().replace(/\(|\)/gi, ""),
            songName = split[0],
            begin = duration.split("-")[0],
            end = duration.split("-")[1];
        console.log(`ffmpeg -i file.mp3 -ss ${begin} -to ${end} -c copy ${songName}.mp3`);
        child_process.exec(`ffmpeg -i file.mp3 -ss ${begin} -to ${end} -c copy \"${songName}.mp3\"`, (error, stdout, stderr) => {
            console.log(`${error} ${stdout} ${stderr}`);
            if (stderr.includes("frame=")) {
                finished();
            }
        });
    }, () => {
        console.log("Done.")
    });
});