require('dotenv').config();
const mongodb = require('mongodb');
const connection = require ('./connection');


async function searchSimilarUsers(user){
	const connectionDB = await connection.getConnection();
	const result = await connectionDB.db('charlies-website')
		.collection('users')
		.find({language: user.language, level: user.level})  //email: !user.email
		.toArray();
	return result;
}

async function addUser(user){
	const connectionDB = await connection.getConnection();
	const result = await connectionDB.db('charlies-website')
		.collection('users')
		.insertOne(user);
	
	
	return result;
}

module.exports = {addUser, searchSimilarUsers};