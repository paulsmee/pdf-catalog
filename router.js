'use strict'

const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const mv = require('mv')
const gm = require('gm');


const pdf = {}
var filePath, fileName, fileTitle, fileCategory

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

router.post('/fileupload', function (req, res) {
    console.log('Attempting FileUpload')
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldPath = files.filetoupload.path;
        var newPath = './public/pdf/' + files.filetoupload.name;
        pdf.pdfPath = newPath
        pdf.pdfName = files.filetoupload.name
        filePath = newPath
        fileName = files.filetoupload.name
        getImage()
        mv(oldPath, newPath, function (err) {
            if (err) throw err;
            res.redirect('/');
            res.end();
        });
    })
})

function getImage() {
    console.log('Working')
    gm(pdf.pdfPath)
        .write('./public/images/' + pdf.pdfName + '.png', function (err) {
            if (err) console.log('aaw, shucks' + err);
            console.log('Image written to directory.')
            writeJSON()
        });

    console.log(pdf)
}

function writeJSON() {
    console.log("I don't do anything")
}

module.exports = router