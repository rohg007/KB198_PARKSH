const express = require('express');
const bodyParser = require('body-parser');

const Diseases = require('../models/disease');
const diseaseRouter = express.Router();

diseaseRouter.use(bodyParser.json());

diseaseRouter
  .route('/')
  .get((req, res, next) => {
    Diseases.find({})
      .then(
        (diseases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(diseases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Diseases.create(req.body)
      .then(
        (diseases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(diseases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /diseases');
  })
  .delete((req, res, next) => {
    Diseases.deleteOne({})
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

diseaseRouter
  .route('/:diseaseId')
  .get((req, res, next) => {
    Diseases.findById(req.params.diseaseId)
      .then(
        (disease) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(disease);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /diseases/' + req.params.diseaseId
    );
  })
  .put((req, res, next) => {
    Diseases.findByIdAndUpdate(
      req.params.diseaseId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (disease) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(disease);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Diseases.findByIdAndRemove(req.params.diseaseId)
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

module.exports = diseaseRouter;
