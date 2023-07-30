 const bcrypt = require('bcrypt');
 const Admin = require("../models/Admin");

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12); 
    const hash = await bcrypt.hash(pw, salt); 
    console.log (salt);
    console.log (hash);

}

const register = async (username, password) => {
    const hash = await bcrypt.hash(password, 12);
    const admin = new Admin({
        username,
        password: hash,
    });
    const result = await admin.save();
    console.log(result);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH!")
    } else {
        console.log("INCORRECT!")
    }
}

module.exports = {register};