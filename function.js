var async = require('async');
var responses = require('./responses')
var Promise = require('bluebird');
exports.asyncAutoFunction = function (req, res) {
  var dataToSend={},returnedData={};

var name = req.query.name || '';
   var city = req.query.city || '';
    var blankData = [name , city];
    async.auto({
        checkBlank: (cb) => {
          console.log((checkData(blankData)))
          if (checkData(blankData)) {
            cb(400,null);
          } else {
            cb(null, {
              err: 0,
            });
          }
        },
        responseSend: ['checkBlank', (results, cb) => {

          db.collection('deviceToken').find().sort({userId:-1}).toArray(function (err, result){
            dataToSend = result;
            if (result && result.length > 0) {
              cb(null);
          } else {
              return callback(null, []);
          }
            
          })
        }],
    },function (error) {
      if(error){
        return res.send(error);
      }
      returnedData.data = dataToSend;
      returnedData.message = "API SUCCESSFULLY IMPLEMENTED";
      returnedData.status = 200;
      return res.send(JSON.stringify(error ? error : returnedData));
})
}
exports.asyncWaterfallFunction = function (req, res) {
  var name = req.query.name || '';
   var city = req.query.city || '';
    var blankData = [name , city];
    
  var dataToSend={},returnedData={};
async.waterfall([
  function (done) {
    if (checkData(blankData)) {
      done(400,null);
    } else {
      done(null, -1);
    }
  },
  function (value1, done) {
    db.collection('deviceToken').find().sort({userId:value1}).toArray(function (err, result){
      dataToSend = result;
      if (result && result.length > 0) {
        done(null);
    } else {
        return done(null, []);
    }
  })
  },
], function (error) {
  if(error){
    return res.send(error);
  }
  returnedData.data = dataToSend;
  returnedData.message = "API SUCCESSFULLY IMPLEMENTED";
  returnedData.status = 200;
  return res.send(JSON.stringify(error ? error : returnedData));
})
}

exports.asyncAwaitFunction = async function (req, res) {
  try {
    var returnedData = {};
  let data = await db.collection('deviceToken').find().sort({userId:-1}).toArray()

  returnedData.data = data;
  returnedData.message = "API SUCCESSFULLY IMPLEMENTED";
  returnedData.status = 200;
  return res.send(JSON.stringify(returnedData));
}catch(error){
  return res.send(error);
}
}
exports.asyncSetImmediateFunction = async function (req, res) {

   setImmediate(function A() {
  setImmediate(function B() {
    console.log("1");
    setImmediate(function D() { console.log("2"); });
    setImmediate(function E() { console.log("3"); });
  });
  setImmediate(function C() {
    console.log("4");
    setImmediate(function F() { console.log("5"); });
    setImmediate(function G() { console.log("6"); });
  });
});
res.send("API SUCCESSFULLY IMPLEMENTED !! Check Console")
}
exports.promiseFunction = async function (req, res) {
  let variable = await new Promise((resolve, reject) => {
    db.collection('deviceToken').find().sort({userId:-1}).toArray(function (error, result){
      if (error) {
       reject(error);
    } else {
      console.log(result)
      resolve(result);
    }
  });
})
return res.send(variable)
}

exports.promiseFunctionToCallback= async function (req, res) {
  db.collection('deviceToken').find().sort({userId:-1}).toArray(function (error, result){
      if (error) {
        console.log(error);
      } 
     res.send(result)
     });
}

exports.promiseCoroutines = async function (req, res) {

  Promise.coroutine(function*() {

    var userDetails = yield db.collection('deviceToken').find().sort({userId:-1}).toArray();
      return res.send(userDetails);
    
  })().then((result) => {
       console.log(result);
      }, (error) => {
        console.error(error);
        return responses.sendError(res);
      });
}
exports.promisifyFunction = async function (req, res) {

var readFile = Promise.promisify(require("fs").readFile);
console.log(">?>>?>?>?>?>?>")
readFile("file.js", "utf8").then(function(contents) {
    return eval(contents);
}).then(function(result) {
    console.log("The result of evaluating myfile.js", result);
}).catch(SyntaxError, function(e) {
    console.log("File had syntax error", e);
//Catch any other error
}).catch(function(e) {
    console.log("Error reading file", e);
});
}
function checkData(array){
        const arrlength = array.length;
        for (let i = 0; i < arrlength; i += 1) {
          if (array[i] === undefined || array[i] === null || array[i] === isNaN || array[i] === 'NaN') {
            array[i] = '';
          } else {
            array[i] = array[i];
          }
          array[i] = array[i].toString().trim();
          if (array[i] === '' || array[i] === '' || array[i] === undefined || array[i] === isNaN || array[i] === 'NaN') {
            return 1;
            }
        }
        return 0;
      };
    