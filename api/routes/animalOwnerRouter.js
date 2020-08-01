const express = require('express');
const bodyParser = require('body-parser');

const AnimalOwner = require('../models/animal_owner');
const animalOwnerRouter = express.Router();

animalOwnerRouter.use(bodyParser.json());

animalOwnerRouter
  .route('/')
  .get((req, res, next) => {
    AnimalOwner.find({})
      .then(
        (animalOwners) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalOwners);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    AnimalOwner.create(req.body)
      .then(
        (animalOwners) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalOwners);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /animalOwners');
  })
  .delete((req, res, next) => {
    AnimalOwner.deleteOne({})
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

animalOwnerRouter
  .route('/:animalOwnerId')
  .get((req, res, next) => {
    AnimalOwner.findById(req.params.animalOwnerId)
      .then(
        (animalOwners) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalOwners);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /animalOwners/' +
        req.params.animalOwnerId
    );
  })
  .put((req, res, next) => {
    AnimalOwner.findByIdAndUpdate(
      req.params.animalOwnerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (animalOwner) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(animalOwner);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    AnimalOwner.findByIdAndRemove(req.params.animalOwnerId)
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

module.exports = animalOwnerRouter;
