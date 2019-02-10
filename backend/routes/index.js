const express = require('express');
const router = express.Router();

/**
 * @api {get} / The index page
 * @apiGroup index
 * 
 * @apiSuccess (200) render The index.html page
 */

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
