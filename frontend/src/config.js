

const production = process.env.NODE_ENV === 'production';

const API = production ? 'https://hp-poll.now.sh' : 'http://localhost:3000';

export default {
  API,
};
