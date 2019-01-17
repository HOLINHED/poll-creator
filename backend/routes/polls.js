var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:pollid', (req, res, next) => {
  res.status(200).json({
    id: req.params.pollid,
    message: 'hello world'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'hello world'
  });
});

module.exports = router;
