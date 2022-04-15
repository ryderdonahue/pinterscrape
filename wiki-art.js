const storedUrls = require("./urls");

var fs = require("fs");
const fetch = require("node-fetch");
const downloadFile = async (url, og, path) => {
  let res = await fetch(url);
  if (res.status != 200) res = await fetch(og);

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
};

async function downloadUrls() {
  let index = 0;
  for (const url of storedUrls.urls) {
    const lastIndex = url.lastIndexOf("/");
    const fileExtension = url.slice(url.length - 3, url.length);

    const fileName = url.slice(lastIndex + 1, url.length);

    console.log(`${index}::\t ${fileName} \t extension:.${fileExtension}`);
    // UNIX BASED FILE SYSTEM
    await downloadFile(url, url, __dirname + `//output//${fileName}`);
    index++;

    // WINDOWS BASED FILE SYSTEM
    //   downloadFile(
    //     fullsizeUrl,
    //     url,
    //     __dirname + `\\output\\${fileName}.${fileExtension}`
    //   );
  }
}

downloadUrls();
