var fs = require('fs');
const fetch = require('node-fetch');
const storedUrls = require('./urls');

const downloadFile = (async (url, og, path) => {
    let res = await fetch(url);
    if (res.status != 200)
        res = await fetch(og);

    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
        });
    });
});

storedUrls.urls.forEach((url, index) => {
    const fileExtension = url.slice(url.length - 3, url.length);
    const fullsizeUrl = `https://i.pinimg.com/originals/` + url.slice(26, url.length);
    console.log(`${index}: ${url} :\t ${fullsizeUrl} \t extension:.${fileExtension}`);
    downloadFile(fullsizeUrl, url, __dirname + '\\output\\image_' + index + '.' + fileExtension);
})

