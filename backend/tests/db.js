'use strict'

const monk = require('monk');

const db = monk('localhost/hpoll');
const polls = db.get('polls');

const data = {
   id: 'admin',
   title: 'Should this poll work correctly?',
   options: [
     {
       desc: 'yes',
       votes: 10,
     },
     {
       desc: 'no',
       votes: 99999,
     },
     {
       desc: 'of course not!',
       votes: 0,
     },
     {
       desc: 'this is a really really really really really really really really really realyl really really really long option',
       votes: 1000,
     },
     {
       desc: 'mystical option 5!',
       votes: -1000,
     },
   ]
}

// @param data (JSON) The entry to be sent to the database. 
function setData(data) {
   polls
   .insert(data)
   .then(res => {
      console.log('data inserted!', res);
   })

   console.log('data sould have been inserted now.')
}

/*
   @param PollID (string) The ID of the data to replace
   @param data (JSON) The data to replace the original with
*/
function updateData(PollID, data) {
   polls
   .remove({id: PollID})
   .then(() => {
      console.log('POLL REMOVED!');
   });

   polls
   .insert(data)
   .then((dat) => {
      console.log('NEW POLL INSERTED!', dat);
   })
}

// setData(data);

polls
   .find({id: 'admin'})
   .then(data => {
      console.log(data);
});