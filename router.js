'use strict';

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const mv = require('mv');
const gm = require('gm');
const fs = require('fs');
const Fuse = require('fuse.js');

// upload related variables
var imagePath, filePath, fileName, fileTitle, fileCategory, getLocalPath;
// search related variables
var searchResult;

const savedFile = fs.readFileSync('./public/json/pdfstore.json', 'utf8');
const pdfLog = JSON.parse(savedFile);

router.get('/', function(req, res) {
  res.render('index.ejs', { pdfLog: pdfLog });
});

// All the following controls the complete file upload functionality for the site. This has been done in function after function
// calling to the next function to assist with ease of coding for myself. - say function one more time
router.post('/fileupload', function(req, res, next) {
  console.log('Attempting FileUpload');
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldPath = files.filetoupload.path;
    var newPath = './public/pdf/' + files.filetoupload.name;
    getLocalPath = './public/pdf/' + files.filetoupload.name;
    filePath = '/pdf/' + files.filetoupload.name;
    fileName = files.filetoupload.name;
    fileTitle = fields.fileTitleInput;
    fileCategory = fields.category;
    mv(oldPath, newPath, function(err) {
      if (err) throw err;
      console.log('File uploaded successfully.');
      setTimeout(getImage, 100);
      function getImage() {
        console.log(
          'Generating image. This may take some time depending on the file uploaded.'
        );
        gm(getLocalPath).write('./public/images/' + fileName + '.png', function(
          err
        ) {
          if (err) console.log('aaw, shucks' + err);
          imagePath = '/images/' + fileName + '.png';
          console.log('Image successfully written to directory.');
          loadObject();
          function loadObject() {
            var pdfDetails = {
              filePath: filePath,
              fileName: fileName,
              imagePath: imagePath,
              fileTitle: fileTitle,
              fileCategory: fileCategory
            };
            pdfLog.push(pdfDetails);
            console.log('Object information loaded.' + pdfDetails);
            setTimeout(writeJSON, 100);
            function writeJSON() {
              fs.writeFileSync(
                './public/json/pdfstore.json',
                JSON.stringify(pdfLog)
              );
              console.log('Information saved');
            }
          }
          res.redirect('/');
          res.end();
        });
      }
    });
  });
});

router.get('/search-results', function(req, res) {
  res.render('search-results.ejs', { searchResult: searchResult });
});

router.post('/search', function(req, res, next) {
  console.log('Searching...' + req.body.searchData);

  var searchWords = req.body.searchData;

  var options = {
    shouldSort: true,
    includeScore: true,
    // includeMatches: false,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['fileTitle']
  };
  var fuse = new Fuse(pdfLog, options);
  searchResult = fuse.search(searchWords);
  console.log(searchResult);
  res.redirect('/search-results');
  res.end();
});

router.get('/category-select', function(req, res) {
  res.render('index.ejs', { searchResult: searchResult });
  var category = fileCategory;
  var filteredArray = pdfLog.category.filter(function(itm) {
    return empIds.indexOf(itm.empid) > -1;
  });

  filteredArray = { records: filteredArray };
});

module.exports = router;
