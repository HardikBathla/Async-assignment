const async = require('async');
const responses = require('./responses')
const Promise = require('bluebird');
exports.asyncAutoFunction = function (req, res) {
  let dataToSend={},returnedData={};

  let name = req.query.name || '';
  let city = req.query.city || '';
  let blankData = [name , city];
    async.auto({
        checkBlank: (cb) => {
          if (checkData(blankData)) {
            cb(400,null);
          } else {
            cb(null, {
              err: 0,
            });
          }
        },
        parallelRun: function(cb){
          setTimeout(function(){
            console.log("Parallel Run");
            cb(null,"first function");
          },5000);
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
  let name = req.query.name || '';
  let city = req.query.city || '';
  let blankData = [name , city];
    
  let dataToSend={},returnedData={};
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
    let returnedData = {};
  let data = await db.collection('deviceToken').find().sort({userId:-1}).toArray()

  returnedData.data = data;
  returnedData.message = "API SUCCESSFULLY IMPLEMENTED";
  returnedData.status = 200;
  return res.send(JSON.stringify(returnedData));
}catch(error){
  return res.send(error);
}
}
/*
setimmedate
The main advantage to using setImmediate() over setTimeout() is setImmediate()
will always be executed before any timers if scheduled within an I/O cycle,
independently of how many timers are present.
Timers cannot guaranteed when its callback gets executed even though the timer expiration period is zero,
immediates queue is guaranteed to be processed immediately after the I/O phase of the event loop.
*/
exports.setimmedate = async function (req,res) {
  let returnedData = {};
    db.collection('trackHistory').find().toArray((error, result) => {
      if (error) {
        return error;
      }
      else {
    setTimeout(() => {
      console.log('check timeout');
    }, 0);
    setImmediate(() => {
      console.log('immediate function');
    });
       returnedData.data = result;
       returnedData.message = "API SUCCESSFULLY IMPLEMENTED";
       returnedData.status = 200;
      return res.send(JSON.stringify(returnedData));
        }
    })
  }
exports.promiseFunction = async function (req, res) {
  let variable = await new Promise((resolve, reject) => {
    db.collection('deviceToken').find().sort({userId:-1}).toArray(function (error, result){
      if (error) {
       reject(error);
    } else {
      resolve(result);
    }
  });
})
return res.send(variable)
}

exports.promiseFunctionToCallback= async function (req, res) {
  db.collection('deviceToken').find().sort({userId:-1}).toArray(function (error, result){
      if (error) {
        return error;
      } 
     res.send(result)
     });
}

exports.promiseCoroutines = async function (req, res) {

  Promise.coroutine(function*() {

    let userDetails = yield db.collection('deviceToken').find().sort({userId:-1}).toArray();
      return res.send(userDetails);
    
  })().then((result) => {
       console.log(result);
      }, (error) => {
        console.error(error);
        return responses.sendError(res);
      });
}
exports.promisifyFunction = async function (req, res) {

  let readFile = Promise.promisify(require("fs").readFile);
readFile("file.js", "utf8").then(function(contents) {
    return eval(contents);
}).then(function(result) {
    console.log("The result of evaluating myfile.js", result);
}).catch(SyntaxError, function(e) {
    console.log("File had syntax error", e);
    throw e;
//Catch any other error
}).catch(function(e) {
    throw e;
    //console.log("Error reading file", e);
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
    