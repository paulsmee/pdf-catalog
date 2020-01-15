'use strict'

const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const mv = require('mv')
const gm = require('gm');
const fs = require('fs')


var imagePath, filePath, fileName, fileTitle, fileCategory, getLocalPath
const savedFile = fs.readFileSync("./public/json/pdfstore.json", 'utf8')
const pdfLog = JSON.parse(savedFile);

router.get('/', function (req, res) {
    res.render('index.ejs', { pdfLog: pdfLog });
});

// All the following controls the complete file upload functionality for the site. This has been done in function after function
// calling to the next function to assist with ease of coding for myself. - say function one more time
router.post('/fileupload', function (req, res) {
    console.log('Attempting FileUpload')
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldPath = files.filetoupload.path;
        var newPath = './public/pdf/' + files.filetoupload.name;
        getLocalPath = './public/pdf/' + files.filetoupload.name;
        filePath = "/pdf/" + files.filetoupload.name
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
    gm(getLocalPath)
        .write('./public/images/' + fileName + '.png', function (err) {
            if (err) console.log('aaw, shucks' + err);
            // imagePath = '/images/' + fileName + '.png'
            console.log('Image successfully written to directory.')
            loadObject()
        });
}

function loadObject() {
    console.log(typeof pdfLog)
    var pdfDetails = { "filePath": filePath, "fileName": fileName, "imagePath": imagePath }
    pdfLog.push(pdfDetails)
    console.log('Object information loaded: ' + pdfLog)
    setTimeout(writeJSON, 100)
}

function writeJSON() {
    fs.writeFileSync("./public/json/pdfstore.json", JSON.stringify(pdfLog));
    console.log('Information saved')
}

module.exports = router