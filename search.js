'use-strict'

const Fuse = require('fuse.js');

var result

// Test Objects
var books = [{
    'ISBN': 'A',
    'title': "Old Man's War",
    'catalog': 'John Scalzi'
}, {
    'ISBN': 'B',
    'title': 'The Lock Artist',
    'catalog': 'Steve Hamilton'
}]

var book = {
    'ISBN': 'C',
    'title': "Every is a Hammer",
    'catalog': 'Adam Savage'
}

// Test push object into array
function pushIt() {
    books.push(book)
}
setTimeout(pushIt, 100)


// Search Function using fuse.js (I don't think I need this many options)
function search() {
    console.log('Searching...')
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
            "title",
            "catalog"
        ]
    };
    var fuse = new Fuse(books, options);
    result = fuse.search("sav"); // Point user search input here!

}
setTimeout(search, 1000)

function whatResults() {
    console.log(result)
}
setTimeout(whatResults, 2000)

module.exports = result