const express = require('express');
const bodyParser = require('body-parser');

const Livestocks = require('../models/livestock');
const livestockRouter = express.Router();

livestockRouter.use(bodyParser.json());

livestockRouter
  .route('/')
  .get((req, res, next) => {
    Livestocks.find({})
      .then(
        (livestocks) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(livestocks);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Livestocks.create(req.body)
      .then(
        (livestocks) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(livestocks);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /livestocks');
  })
  .delete((req, res, next) => {
    Livestocks.deleteOne({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

livestockRouter
  .route('/:livestockId')
  .get((req, res, next) => {
    Livestocks.findById(req.params.livestockId)
      .then(
        (livestock) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(livestock);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /livestocks/' + req.params.livestockId
    );
  })
  .put((req, res, next) => {
    Livestocks.findByIdAndUpdate(
      req.params.livestockId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (livestock) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(livestock);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Livestocks.findByIdAndRemove(req.params.livestockId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = livestockRouter;
