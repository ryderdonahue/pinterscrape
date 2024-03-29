// injected into the page to scrape the URLs
var storedURLs = [];
Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

ticking = false;

function scrapeURLs() {
  // lazy regex for all 1x urls
  var urls = document.documentElement.innerHTML.match(/(?<=src)=.+?(?=\!)/g);
  // console.log(urls.length);
  // process the fluff matching text
  // urls = urls.map((url) => console.log(url));
  urls = urls.map((url) => {
    url = url.slice(2, url.length);
    let extensionMatches = url.match(/.jpg/);
    if (extensionMatches.length > 1) {
      url = url.slice(0, url.length - 4);
    }
    return url;
  });
  // join the new URLs with the old ones
  // storedURLs = storedURLs.concat(urls).unique();
  console.log("images found: " + storedURLs.length);
  // console.log(storedURLs);
  storedURLs = urls;
}

window.addEventListener("scroll", function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      scrapeURLs();
      ticking = false;
    });

    ticking = true;
  }
});

scrapeURLs();

console.log("images will automagically be captured on scroll");
console.log(
  "after completion paste\n copy(storedURLs);\ninto the CLI to capture the URLs"
);
