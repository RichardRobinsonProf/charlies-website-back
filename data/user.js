require('dotenv').config();
const mongodb = require('mongodb');
const {connection} = require("./connection");
const User = require("../models/User");




 async function searchSimilarUsers(user){
	const today = new Date();
	const oneYearago = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
	const result = await User.find({
		language: user.language,
		level: user.level,	
		createdAt: {
			$gte: oneYearago,	
		},
		email: {$ne: user.email},
	});
	return result;
} 

async function addUser(user){
	const newUser = new User({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		language: user.language,
		level: user.level,
		objective: user.objective,
		phone: user.telephone,
		exam: user.exam,
		timeZone: user.timeZone,
		argentineTime: user.argentineTime,
		localTime: user.localTime,
		pricePack: user.pricePack,
		wantsGroup: user.wantsGroup,
		price: user.price,
		amountMonths: user.amountMonths	
	});
	console.log(newUser);
	const result = await newUser.save();
	return result;
}


 async function getUsers () {
    const users = await User.find({});
	console.log(users)
} 

module.exports = { getUsers, addUser, searchSimilarUsers };