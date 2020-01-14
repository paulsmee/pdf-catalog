'use strict'

const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const mv = require('mv')
const gm = require('gm');


const pdf = {}
var filePath, fileName, fileTitle, fileAuthor

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    console.log("Access Detected!")
});

router.post('/fileupload', function (req, res) {
    console.log('Attempting FileUpload')
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldPath = files.fileToUpload.path;
        var newPath = './public/pdf/' + files.fileToUpload.name;
        pdf.pdfPath = newPath
        pdf.pdfName = files.fileToUpload.name
        filePath = newPath
        fileName = files.fileToUpload.name
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
        });

    console.log(pdf)
}

module.exports = router