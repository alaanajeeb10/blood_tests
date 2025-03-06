const express = require('express');
const path = require("path");
const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"/../views/page1.html"));
})

router.get('/hostaverage', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"/../views/page2.html"));
})
