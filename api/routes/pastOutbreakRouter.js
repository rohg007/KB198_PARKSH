const express = require('express');
const bodyParser = require('body-parser');

const PastOutbreaks = require('../models/pastOutbreak');
const pastOutbreakRouter = express.Router();

pastOutbreakRouter.use(bodyParser.json());

pastOutbreakRouter
  .route('/')
  .get((req, res, next) => {
    PastOutbreaks.find({})
      .then(
        (outbreaks) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(outbreaks);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    PastOutbreaks.create(req.body)
      .then(
        (outbreaks) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(outbreaks);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /outbreaks');
  })
  .delete((req, res, next) => {
    PastOutbreaks.deleteOne({})
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

pastOutbreakRouter
  .route('/:outbreakId')
  .get((req, res, next) => {
    PastOutbreaks.findById(req.params.outbreakId)
      .then(
        (outbreak) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(outbreak);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /outbreaks/' + req.params.outbreakId
    );
  })
  .put((req, res, next) => {
    PastOutbreaks.findByIdAndUpdate(
      req.params.outbreakId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (outbreak) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(outbreak);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    PastOutbreaks.findByIdAndRemove(req.params.outbreakId)
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

module.exports = pastOutbreakRouter;
