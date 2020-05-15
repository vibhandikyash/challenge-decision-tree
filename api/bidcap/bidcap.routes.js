'use strict';

const controller = require('./bidcap.controller');
const validationSchema = require('./bidcap.validation');
const Validator = require('../../utils/validator');

module.exports = Router => {
  const router = new Router({
    prefix: `/bidcap`,
  });

  router.post('/', Validator(validationSchema), controller.getbidcap);

  return router;
};
