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

/**
 * @api {get} /poll/:pollid Get the poll data with the corresponding id.
 * @apiGroup polls
 * 
 * @apiParam {String} pollid The polls unique ID.
 * @apiParamExample {String} Request-example: "3jA8L"
 * 
 * @apiSuccess {json} data The poll data in json form.
 * @apiSuccessExample {json} Success-response:
 *      HTTP/1.1 200 OK
 *      {
 *        "id": "3jA8L",
 *        "title": "Should we give out free coffee?",
 *        "options": [
 *          {
 *            "desc": "yes",
 *            "votes": 10
 *          },
 *          {
 *            "desc": "no",
 *            "votes": 1
 *          }
 *        ]
 *      }
 * 
 * @apiError PollNotFound The <code>id</code> of the poll was not found.
 * @apiErrorExample {json} error-response:
 *     {
 *        "title": "POLL NOT FOUND!",
 *        "options": []
 *     }
 */
router.get('/:pollid', (req, res) => {
  
  const pollID = req.params.pollid.toString().trim();
  
  // Searches database for poll with that specific ID
  polls
  .find({ id: pollID })
  .then(data => {

    /**
     * <code>data</code> returns as an empty array if not found.
     * So we push an object with a title of 'poll not found' and
     * an empty options array so the client can alert the user
     * that the poll wasn't found.
     */
    if (data.length < 1){
      data.push({
        title: 'POLL NOT FOUND!',
        options: []
      });
    }

    // Respond with data
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(200).json({
      error: err
    });

  });

});

// Limit POST requests to avoid spam.
router.use(rateLimit({
  windowMs: 5 * 1000,
  max: 1,
}));

/**
 * @api {post} /poll Create a new poll.
 * @apiGroup polls
 * 
 * @apiParam {json} body The data to be made into a poll.
 * @apiParamExample {json} Request-example:
 *     {
 *        "title": "Should we give out free coffee?",
 *        "options": [
 *          {
 *            "desc": "yes",
 *            "votes": 0
 *          },
 *          {
 *            "desc": "no",
 *             "votes": 0  
 *          }
 *        ]
 *     }
 * 
 * @apiSuccess {json} data The poll data that was inserted into the database. Includes the ID.
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "3jA8L",
 *        "title": "Should we give out free coffee?",
 *        "options": [
 *          {
 *            "desc": "yes",
 *            "votes": 0
 *          },
 *          {
 *            "desc": "no",
 *             "votes": 0  
 *          }
 *        ]
 *     }
 * 
 */
router.post('/', (req, res) => {
  
  // Unique ID, Imported from /methods/createID.js
  const id = generator.createID();

  const options = req.body.options;

  // Data to be inserted into the database.
  const data = {
    id,
    title: req.body.title.toString().trim(),
    options,
  }

  // Insert poll into the database.
  polls
  .insert(data)
  .then(data => {

    // Respond with data that was inserted.
    res.status(200).json(data);
  });
  
});

/**
 * @api {post} /poll/:pollid Updates the existing poll with corresponding ID.
 * @apiGroup polls
 * 
 * @apiParam {String} pollid The id of the poll to update.
 * @apiParamExample {String} Request-example: "3jA8L"
 * 
 * @apiParam {json} data The data to replace the old poll with.
 * @apiParamExample {json} Request-example:
 *     {
 *        "id": "3jA8L",
 *        "title": "Should we give out free coffee?",
 *        "options": [
 *          {
 *            "desc": "yes",
 *            "votes": 1
 *          },
 *          {
 *            "desc": "no",
 *             "votes": 0  
 *          }
 *        ]
 *     }
 * 
 * @apiSuccess {json} The updated poll that was inserted into the database.
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "3jA8L",
 *        "title": "Should we give out free coffee?",
 *        "options": [
 *          {
 *            "desc": "yes",
 *            "votes": 1
 *          },
 *          {
 *            "desc": "no",
 *             "votes": 0  
 *          }
 *        ]
 *     }
 * 
 * @apiError InvalidData The data provided was not valid.
 * @apiErrorExample {json} Error-response:
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "message": "Invalid data!"
 *    }
 */
router.post('/:pollid', (req, res) => {

  // Stores data from request
  const data = req.body;
  const pollID = req.params.pollid;

  // Checks to make sure new data is valid.
  if (data.title && data.options.length > 1){

    // Deletes existing poll from the database.
    polls
    .remove({ id: pollID })
    .then(() => {

      // Inserts new poll into database with the same ID.
      polls
      .insert(data)
      .then(dat => {

        // Respond with new data.
        // TODO: Add a check to make sure the ID exists.
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

  // Respond with error.
  res.status(402).json({
    message: 'Invalid data!'
  });

  }

});

module.exports = router;
