import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  url: process.env.MONGO_URl,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};
