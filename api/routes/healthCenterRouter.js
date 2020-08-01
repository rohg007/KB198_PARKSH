const express = require('express');
const bodyParser = require('body-parser');

const HealthCenters = require('../models/health_center');
const healthCenterRouter = express.Router();

healthCenterRouter.use(bodyParser.json());

healthCenterRouter
  .route('/')
  .get((req, res, next) => {
    HealthCenters.find({})
      .then(
        (healthCenters) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(healthCenters);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /healthCenters');
  })
  .delete((req, res, next) => {
    HealthCenters.deleteOne({})
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

healthCenterRouter
  .route('/:healthCenterId')
  .get((req, res, next) => {
    HealthCenters.findById(req.params.healthCenterId)
      .then(
        (healthCenter) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(healthCenter);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.send(
      'POST operation not supported on /healthCenters/' +
        req.params.healthCenterId
    );
  })
  .put((req, res, next) => {
    HealthCenters.findByIdAndUpdate(
      req.params.healthCenterId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (healthCenter) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(healthCenter);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    HealthCenters.findByIdAndRemove(req.params.healthCenterId)
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

module.exports = healthCenterRouter;
