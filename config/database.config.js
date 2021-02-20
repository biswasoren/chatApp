module.exports = {
    url: 'mongodb://localhost:27017/chat',
    options: {
        poolsize: 20,
        db: {
          safe: true,
        },
        useNewUrlParser: true,
      },
}