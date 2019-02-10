const express = require('express');
const router = express.Router();

/**
 * @api {get} / The index page, which redirects to the actual client.
 * @apiGroup index
 * 
 * @apiSuccess (200) The index.html page.
 */

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
