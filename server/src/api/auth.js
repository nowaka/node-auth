const express = require('express');

const router = express.Router();

const { User } = require('../models/Model');

let users = {
  test: new User('test', 'password'),
};

const authenticate = (login, password, fn) => {
  const user = users[login];
  if (!user) return fn(Error('User not found'));
  if (user.password !== password) return fn(Error('Invalid password'));
  return fn(null, user);
};

const signup = (data, fn) => {
  let user = users[data.login];
  if (user) {
    return fn(Error('User already exists'));
  }
  user = {
    [data.login]: new User(data.login, data.password),
  };
  users = { ...users, ...user };
  return fn(null, user);
};

router.post('/login', (req, res) => {
  authenticate(req.body.login, req.body.password, (error, user) => {
    if (user) {
      res.json({
        message: 'OK',
      });
    } else {
      res.json({
        message: error.message,
      });
    }
  });
});

router.post('/signup', (req, res) => {
  signup(req.body, (error, user) => {
    if (user) {
      res.json(user);
    } else {
      res.json({
        message: error.message,
      });
    }
  });
});
module.exports = router;
