'use strict'

const express = require('express');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const router = express.Router();
const db = monk(process.env.MONGO_URI || 'http://localhost/hpoll');
const polls = db.get('polls')

router.use(cors());

// GET EXISTING POLL
router.get('/:pollid', (req, res, next) => {
  res.status(200).json({
    id: req.params.pollid,
    title: req.params.pollid + ' title',
  });
});

router.use(rateLimit({
  windowMs: 5 * 1000,
  max: 1,
}));

// CREATE NEW POLL
router.post('/', (req, res, next) => {
  
  let id = "";

  // generate random ID
  for (let i = 0; i < 6; i++) {

    const r = Math.random();

    if (r > 0.55) {

      // uppercase or lowercase letter
      const alpha = Math.random() > 0.5 ? 65 : 97;

      const char = alpha + (Math.floor(Math.random() * 26));

      id += String.fromCharCode(char);
    } else {
      const num = Math.floor(Math.random() * 9);
      id += num.toString();
    }
  }

  const options = req.body.options;

  const data = {
    id,
    title: req.body.title.toString().trim(),
    options,
  }

  //console.log(data.options)
  
  res.status(200).json(data);
});

// UPDATE EXISTING POLL
router.post('/:pollid', (req, res, next) => {

});

module.exports = router;
