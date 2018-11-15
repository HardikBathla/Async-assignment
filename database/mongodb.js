const MongoClient = require('mongodb').MongoClient;


function cool(){

const url = 'mongodb://localhost:27017';

const dbName = 'assignment';

async function dbConnection(){
try{
  MongoClient.connect(url, function (err, client) {
    console.log("Connected mongo");

            global.db=client.db(dbName);

            // Model.collection();
});
}
catch(err){
  console.log(err);
}
}
dbConnection();
}
module.exports={
  cool:cool
};
