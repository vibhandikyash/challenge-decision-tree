const Joi = require('@hapi/joi');

const schema = Joi.object({
    rpcAlpha: Joi.number().required(),
    rpcBeta: Joi.number().required(),
    ebRpc: Joi.number().required(),
    net: Joi.number().required(),
    nonSocialClicks: Joi.number().required(),
    nonSocialClicksCutOff: Joi.number().required(),
    socialClicks: Joi.number().required(),
    socialClicksCutOff: Joi.number().required(),
    currentBidCap: Joi.number().required(),
    factor: Joi.number().required(),
});


module.exports = schema;