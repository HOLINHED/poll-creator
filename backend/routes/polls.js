'use strict'

const express = require('express');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const generator = require('./methods/createID.js');

const router = express.Router();
const db = monk(process.env.MONGO_URI || 'localhost/hpoll');
const polls = db.get('polls')

router.use(cors());
router.use(express.json());

// GET EXISTING POLL
router.get('/:pollid', (req, res, next) => {
  const pollID = req.params.pollid;
  
  polls
  .find({ id: pollID })
  .then(data => {
    //console.log(data);
    if (data.length < 1){
      data.push({
        title: 'POLL NOT FOUND!',
        options: []
      });
    }

    res.status(200).json(data);
  })
  .catch(err => {
    res.status(200).json({
      error: err
    });
  });

});

router.use(rateLimit({
  windowMs: 5 * 1000,
  max: 1,
}));

// CREATE NEW POLL
router.post('/', (req, res, next) => {
  
  const id = generator.createID();

  const options = req.body.options;

  const data = {
    id,
    title: req.body.title.toString().trim(),
    options,
  }

  //console.log(id);

  //console.log(data.options)
  polls
  .insert(data)
  .then(data => {
    //console.log('DATA INSERTED');
    res.status(200).json(data);
  });
  
});

// UPDATE EXISTING POLL
router.post('/:pollid', (req, res, next) => {
  const data = req.body;
  const pollID = req.params.pollid;

  if (data.title && data.options.length > 1){

    polls
    .remove({ id: pollID })
    .then(() => {

      polls
      .insert(data)
      .then(dat => {
        res.status(200).json(dat);
      })
      .catch(err => {
        console.log(err);
      });

    })
    .catch(err => {
      console.log(err);
    });

  } else {

  res.status(402).json({
    message: 'Invalid data!'
  });

}

});

module.exports = router;
