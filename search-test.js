'use-strict'

const fs = require('fs');
const Fuse = require('fuse.js');

const pdfListing = {}
var pdfArray = []

//passsing directoryPath and callback function
fs.readdir('./public/pdf/', function (err, files) {
    if (err) {
        return console.log('Directory not accessable: ' + err);
    }
    pdfListing["pdflist"] = files
});

function arrayme() {
    pdfArray["title"] = pdfListing
    // console.log(pdfArray)
    books.push(book)
}

var result

var list = ['Deck of Many Things.pdf',
    'IMG_2909.jpg',
    'IMG_3794.JPG',
    'IMG_5073.JPG',
    'IMG_5073e.jpg']

var books = [{
    'ISBN': 'A',
    'title': "Old Man's War",
    'author': 'John Scalzi'
}, {
    'ISBN': 'B',
    'title': 'The Lock Artist',
    'author': 'Steve Hamilton'
}]

var book = {
    'ISBN': 'C',
    'title': "Every is a Hammer",
    'author': 'Adam Savage'
}

setTimeout(arrayme, 100)

function search() {
    console.log('Running Search...')
    var options = {
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title"
        ]
    };
    var fuse = new Fuse(books, options); // "list" is the item array
    result = fuse.search("mer");

}
setTimeout(search, 1000)




function blah() {
    console.log(result)
    // console.log(books)
}
setTimeout(blah, 2000)

module.exports = pdfArray