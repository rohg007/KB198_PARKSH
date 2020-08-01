const express = require('express');
const bodyParser = require('body-parser');

const AnimalCases = require('../models/animal_case');
const animalCaseRouter = express.Router();

animalCaseRouter.use(bodyParser.json());

animalCaseRouter
  .route('/')
  .get((req, res, next) => {
    AnimalCases.find({})
      .then(
        (animalCases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalCases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    AnimalCases.create(req.body)
      .then(
        (animalCases) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalCases);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /animalCases');
  })
  .delete((req, res, next) => {
    const { id } = req.body;
    AnimalCases.deleteOne({ _id: id })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp.deletedCount);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

animalCaseRouter
  .route('/:animalCaseId')
  .get((req, res, next) => {
    AnimalCases.findById(req.params.animalCaseId)
      .then(
        (animalCase) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalCase);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /animalCase/' + req.params.animalCaseId
    );
  })
  .put((req, res, next) => {
    AnimalCases.findByIdAndUpdate(
      req.params.animalCaseId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (animalCase) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalCase);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    AnimalCases.findByIdAndRemove(req.params.animalCaseId)
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

module.exports = animalCaseRouter;
