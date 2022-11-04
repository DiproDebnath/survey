const express = require("express")
const router = express.Router()


router.get("/", (req, res) =>{
 res.json({
    name: "dipro"
 })
})


router.post("/create", (req, res) => {
    console.log("create");
});

module.exports = router;