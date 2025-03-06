const { calculateNRRForPosition } = require('../services/nrrService');

const calculateNRR = (req, res) => {
    try {
        const nrrData = req.body;
        const result = calculateNRRForPosition(nrrData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { calculateNRR };