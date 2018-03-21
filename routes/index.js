var express = require('express');
var router = express.Router();
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/HealthCampSPA";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveHealthRecord', function(req,res){
      mongo.connect(mongoLogin, function() {
          var collection = mongo.collection('HealthRecords');
          collection.insert(req.body, function (err, result) {
              if (result) {
                  res.send({"response": "OK"});
              } else {
                  res.send({"response": "ERROR"});
              }
          });
      });
});

router.get('/getData', function(req,res){
    mongo.connect(mongoLogin, function() {
        var collection = mongo.collection('HealthRecords');
        collection.find({}).toArray(function (err, result) {
            console.log("result is", result);
            if (result) {
                res.send({"response": "OK", "result": result});
            } else {
                res.send({"response": "ERROR"});
            }
        });
    });
});

module.exports = router;

// if(req.body.length == 1){
//     var payload = {
//         "firstName": req.body.firstName,
//         "lastName": req.body.lastName,
//         "gender": req.body.gender,
//         "age": req.body.age,
//         "details": req.body.details,
//         "image": req.body.gender,
//         "height": req.body.height,
//         "weight": req.body.weight,
//         "temp": req.body.temp,
//         "rate": req.body.rate,
//         "bp": req.body.bp,
//         "medication": req.body.medication,
//         "notes": req.body.notes
//     }
//     collection.insert(payload, function (err, result) {
//           console.log("result is", result);
//           if (result) {
//               res.send({"response": "OK"});
//           } else {
//               res.send({"response": "ERROR"});
//           }
//       });
// } else{
//   for(var i = 0; i<req.body.length; i++){
//       var payload = {
//           "firstName": req.body.firstName,
//           "lastName": req.body.lastName,
//           "gender": req.body.gender,
//           "age": req.body.age,
//           "details": req.body.details,
//           "image": req.body.gender,
//           "height": req.body.height,
//           "weight": req.body.weight,
//           "temp": req.body.temp,
//           "rate": req.body.rate,
//           "bp": req.body.bp,
//           "medication": req.body.medication,
//           "notes": req.body.notes
//       }
//       collection.insert(payload, function (err, result) {
//           console.log("result is", result);
//           if (result) {
//               res.send({"response": "OK"});
//           } else {
//               res.send({"response": "ERROR"});
//           }
//       });
//     }
// }