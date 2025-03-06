const express = require('express');
const router = express.Router();
const Hosts_Mid = require("../middleware/Hosts_Mid");



router.post('/', [Hosts_Mid.Addhosts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.put('/', [Hosts_Mid.Updatehosts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.delete('/', [Hosts_Mid.Deletehosts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});
