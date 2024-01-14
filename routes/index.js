const express = require('express');
const verifyToken = require('../middlewares/verfiy');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.user && req.user.Admin) {
        res.send('Syed Shayan')
    } else {
        res.status(401).json({ message: 'Access forbidden for non-admin users' })
    }

});



module.exports = router;