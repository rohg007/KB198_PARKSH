const express = require('express');
const bodyParser = require('body-parser');

const HumanCases = require('../models/human_case');
const humanCaseRouter = express.Router();

humanCaseRouter.use(bodyParser.json());

humanCaseRouter
  .route('/')
  .get((req, res, next) => {
    HumanCases.find({})
      .then(
        (humanCases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(humanCases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    HumanCases.create(req.body)
      .then(
        (humanCases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(humanCases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /humanCases');
  })
  .delete((req, res, next) => {
    HumanCases.deleteOne({})
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

humanCaseRouter
  .route('/:humanCaseId')
  .get((req, res, next) => {
    HumanCases.findById(req.params.humanCaseId)
      .then(
        (humanCase) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(humanCase);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /humanCase/' + req.params.humanCaseId
    );
  })
  .put((req, res, next) => {
    HumanCases.findByIdAndUpdate(
      req.params.humanCaseId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (humanCase) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(humanCase);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    HumanCases.findByIdAndRemove(req.params.humanCaseId)
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

module.exports = humanCaseRouter;
