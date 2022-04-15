var fs = require("fs");
const fetch = require("node-fetch");
const storedUrls = require("./urls");

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

storedUrls.urls.forEach((url, index) => {
  const fileExtension = url.slice(url.length - 3, url.length);
  const fullsizeUrl =
    `https://i.pinimg.com/originals/` + url.slice(26, url.length);
  const fileName = url.slice(url.length - 10, url.length - 4);

  console.log(`${index}::\t ${fileName} \t extension:.${fileExtension}`);
  // UNIX BASED FILE SYSTEM
  downloadFile(
    fullsizeUrl,
    url,
    __dirname + `//output//${fileName}.${fileExtension}`
  );

  // WINDOWS BASED FILE SYSTEM
  //   downloadFile(
  //     fullsizeUrl,
  //     url,
  //     __dirname + `\\output\\${fileName}.${fileExtension}`
  //   );
});
