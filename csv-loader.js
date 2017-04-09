'use strict';

var fs = require('fs'); 
var parse = require('csv-parse');

var byColumn = [];
var results = {};

fs.createReadStream('murder1.csv')
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
        sceneObj['text'] = sceneArray[1];
        var responses = [];
        if (sceneArray[2] && sceneArray[3]) {
          responses.push({"text": sceneArray[2], "link": sceneArray[3]});
        }
        if (sceneArray[4] && sceneArray[5]) {
          responses.push({"text": sceneArray[4], "link": sceneArray[5]});
        }
        if (sceneArray[6] && sceneArray[6]) {
          responses.push({"text": sceneArray[6], "link": sceneArray[7]});
        }
        sceneObj['responses'] = responses;
        results[sceneArray[0]] = sceneObj;
      }
      console.log(JSON.stringify(results));
    });


