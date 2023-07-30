let express = require("express");
let router = express.Router();
const data = require("../data/auth")

router.get("/", async (req, res) => {
    res.send("admin");
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const result = await data.register(username, password);
    res.send(result);  
});


module.exports = router;