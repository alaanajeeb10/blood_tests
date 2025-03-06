const express = require('express');
const router = express.Router();
const Tests_Mid = require("../middleware/Tests_Mid");
const {Router} = require("express");


router.post('/', [Tests_Mid.Addtests], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        console.error("Error adding measurement:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});