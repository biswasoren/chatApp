const User = require("./user.model");

export function add(req, res) {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });
  user
    .save()
    .then((doc) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
}

export function login(req, res) {
  const query = {
    userName: req.body.userName,
  };

  User.find(query)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default {
  add,
  login,
};
