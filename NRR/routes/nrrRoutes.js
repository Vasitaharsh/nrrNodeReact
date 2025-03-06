const express = require('express');
const router = express.Router();
const { calculateNRR } = require('../controllers/nrrController');
const { nrrSchema } = require('../validators/nrrValidator');

router.post('/calculate', (req, res, next) => {
    const { error } = nrrSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
}, calculateNRR);

module.exports = router;