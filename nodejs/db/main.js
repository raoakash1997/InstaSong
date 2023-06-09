const mysql = require('mysql2');
const util = require('util');

let query;
let poolInitialized = false;

const PersonTable = 'Person';
const RecipeTable = 'Recipe'; 

const initDBConnection = () => {
  const poolWithoutPromise = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER_ID,
    password        : process.env.DB_USER_PASSWORD,
    database        : process.env.DB_NAME,
    port: 3306
  });
  query = util.promisify(poolWithoutPromise.query).bind(poolWithoutPromise);
  poolInitialized = true;
};

const getDBObject = () => {
  if (!poolInitialized) {
    throw Error("DB connection not established yet");
  }
  return {
    query
  };
}

module.exports = {
  initDBConnection,
  getDBObject,
  PersonTable,
  RecipeTable
}