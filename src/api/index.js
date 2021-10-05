const register = require('./register');
const message = require('./message');
const health = require('./health');

export default function (app) {
  app.use('/api/register', register);
  app.use('/api/message', message);
  app.use('/api/health', health);
}
