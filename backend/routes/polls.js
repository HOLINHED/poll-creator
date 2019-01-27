const express = require('express');
const monk = require('monk');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const db = monk(process.env.MONGO_URI || 'http://localhost/hpoll');
const polls = db.get('polls')

/* GET users listing. */
router.get('/:pollid', (req, res, next) => {
  res.status(200).json({
    id: req.params.pollid,
    message: 'hello world'
  });
});

router.use(rateLimit({
  windowMs: 5 * 1000,
  max: 1,
}));

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'hello world'
  });
});

module.exports = router;
