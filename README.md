# Pinterscrape
A collection of small scripts to scrape your own Pinterest boards for offline viewing/archiving

## Guide

## Step 1 
### URL Acquicition
1. Copy the script from pageScript.js into your clipboard and paste it directly into Chrome's Debug Console
2. Scroll through until the bottom of the page
3. Paste `copy(storedUrls)` into the Chrome Console, this will copy all of the stored URLs into your clipboard
4. Paste those copied URLs into urls.js 

## Step 2
## Image download
1. Run `npm start` in the root of the project folder to begin downloading the URLs stored in `urls.js`
2. Downloaded images will be stored in `/output`

## Step 3
Enjoy your images.
