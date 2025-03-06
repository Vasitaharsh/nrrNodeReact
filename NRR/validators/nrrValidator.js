const Joi = require('joi');

const nrrSchema = Joi.object({
    yourTeam: Joi.string().required().valid(
        "Chennai Super Kings", 
        "Royal Challengers Bangalore", 
        "Delhi Capitals", 
        "Rajasthan Royals", 
        "Mumbai Indians"
    ),
    oppositionTeam: Joi.string().required().valid(
        "Chennai Super Kings", 
        "Royal Challengers Bangalore", 
        "Delhi Capitals", 
        "Rajasthan Royals", 
        "Mumbai Indians"
    ),
    matchOvers: Joi.number().min(1).max(20).required(),
    desiredPosition: Joi.number().integer().min(1).max(5).required(),
    tossResult: Joi.string().required().valid("Batting First", "Bowling First"),
    runsInput: Joi.number().min(1).max(999).required()
});

module.exports = { nrrSchema };