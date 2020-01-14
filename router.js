'use strict'

const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const mv = require('mv')
const gm = require('gm');
const fs = require('fs');
const parse = require('node-html-parser').parse;


const pdf = {}

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    console.log("Access Detected!")
});

router.post('/fileupload', function (req, res) {
    console.log('Attempting FileUpload')
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './public/pdf/' + files.filetoupload.name;
        pdf.pdfstats = newpath
        pdf.pdfname = "title"[files.filetoupload.name]
        getImage()
        mv(oldpath, newpath, function (err) {
            if (err) throw err;
            res.redirect('/');
            res.end();
        });
    })
})

function getImage() {
    console.log('Working')
    gm(pdf.pdfstats)
        // var 
        .write(pdf.pdfname + '.png', function (err) {
            if (err) console.log('aaw, shucks' + err);
            console.log('this worked!')
        });
}


fs.readFile('index.html', 'utf8', (err, html) => {
    if (err) {
        throw err;
    }

    const root = parse(html);

    const body = root.querySelector('body');
    body.set_content('<div id = "asdf"></div>');
    body.appendChild('<div id="uploadPDF">This Works?</div>');

    console.log(root.toString()); // This you can write back to file!
});

module.exports = router