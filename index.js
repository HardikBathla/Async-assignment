const dbase= require('./database/mongodb.js');
var app = require('express')();
var server = require('http').Server(app);
let functions=require('./function.js');

server.listen(3002);

app.get('/asyncauto',functions.asyncAutoFunction)
app.get('/asyncwaterfall',functions.asyncWaterfallFunction)
app.get('/asyncawait',functions.asyncAwaitFunction)
app.get('/asyncSetImmediateFunction',functions.asyncSetImmediateFunction)
app.get('/asyncPromiseFunction',functions.promiseFunction)
app.get('/promiseCoroutines',functions.promiseCoroutines)
app.get('/promiseFunctionToCallback',functions.promiseFunctionToCallback)
app.get('/promisifyFunction',functions.promisifyFunction)


async function start(){
try{
  await dbase.cool();
  
}catch(error){
   throw error;
}

console.log(`Server running at:3002`);
};
start();
