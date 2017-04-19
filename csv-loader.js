'use strict';

var fs = require('fs'); 
var parse = require('csv-parse');

var byColumn = [];
var results = {};


fs.createReadStream(process.argv[2])
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        for (var i = 1; i < csvrow.length; i++) {
          if (!byColumn[i]) {
            byColumn[i] = [];
          }
          byColumn[i].push(csvrow[i]);
        }
    })
    .on('end',function() {
      //console.log(byColumn);
      for (var i in byColumn) {
        var sceneArray = byColumn[i];
        var sceneObj = {};
        if (sceneArray[1]) {
          sceneObj['image'] = sceneArray[1];
        }
        sceneObj['text'] = sceneArray[2];
        var responses = [];
        if (sceneArray[3] && sceneArray[4]) {
          responses.push({"text": sceneArray[3], "link": sceneArray[4]});
        }
        if (sceneArray[7] && sceneArray[8]) {
          responses.push({"text": sceneArray[7], "link": sceneArray[8]});
        }
        if (sceneArray[11] && sceneArray[12]) {
          responses.push({"text": sceneArray[11], "link": sceneArray[12]});
        }
        sceneObj['responses'] = responses;
        results[sceneArray[0]] = sceneObj;
      }
      console.log(JSON.stringify(results));
    });


