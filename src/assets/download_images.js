const https = require("https");
const fs = require("fs");
const { exit } = require("process");
const Stream = require("stream").Transform

let rawdata = fs.readFileSync("achievements.json");
let achievements = JSON.parse(rawdata);

achievements.forEach(async (achievement) => {
  let filename = "images/" + achievement.identifier + ".png"
  fs.stat(filename, function (err, stats) {
    if (err) {
      console.log("new image", achievement.identifier)
    } else {
      if (stats.size < 2000) {
        console.log("image", filename, "is small and likely corrupted. Will be overwritten")
      } else {
        return
      }
    }
  });
  https.get(achievement.url, (res) => {
    var data = new Stream();
    res.on('data', chunk => {
        data.push(chunk);
    });
    res.on('end', () => {
        fs.writeFileSync(filename, data.read());
    })
  });
});

console.log('We done');