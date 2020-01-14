'use strict'

const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const mv = require('mv')
const gm = require('gm');
const fs = require('fs')


const pdf = {}
var filePath, fileName, fileTitle, fileCategory
const savedFile = fs.readFileSync("./public/json/pdfstore.json", 'utf8')
const pdfLog = JSON.parse(savedFile);
console.log(pdfLog)



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
        mv(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log('File uploaded successfully.')
            setTimeout(getImage, 100)
            res.redirect('/');
            res.end();
        });
    })
})

function getImage() {
    console.log('Generating image. This may take some time depending on the file uploaded.')
    gm(pdf.pdfPath)
        .write('./public/images/' + pdf.pdfName + '.png', function (err) {
            if (err) console.log('aaw, shucks' + err);
            console.log('Image successfully written to directory.')
            loadObject()
        });
}

function loadObject() {
    console.log(typeof pdfLog)
    var pdfDetails = { "filePath": filePath, "fileName": fileName }
    pdfLog.push(pdfDetails)
    console.log('Object information loaded: ' + pdfLog)
    setTimeout(writeJSON, 100)
}

function writeJSON() {
    fs.writeFileSync("./public/json/pdfstore.json", JSON.stringify(pdfLog));
    console.log('Information saved')
}

module.exports = router