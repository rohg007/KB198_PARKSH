const express = require('express');
const route = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const HealthCenterUser = require('../models/health_center');
const AdminUser = require('../models/adminUser');
const gravatar = require('gravatar');
//@ route         POST /add-healthcenter
//@description   Register HealthCenterUser
//@token        public
route.post(
  '/add-healthcenter',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check('password', 'Enter a password of minimum 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password,
      address,
      contact,
      incharge,
      pincode,
      web,
      lat,
      lng,
      total_affected,
      total_deaths,
      total_recovered,
    } = req.body;
    try {
      //See if HealthCenter Exists

      let healthcenter = await HealthCenterUser.findOne({ email });
      if (healthcenter) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      healthcenter = new HealthCenterUser({
        name,
        email,
        avatar,
        password,
        address,
        contact,
        pincode,
        incharge,
        web,
        lat,
        lng,
        total_affected,
        total_deaths,
        total_recovered,
      });
      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      healthcenter.password = await bcrypt.hash(password, salt);
      await healthcenter.save();
      //Return JsonWebToken
      const payload = {
        healthcenter: {
          id: healthcenter.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json(healthcenter);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@ route         POST /add-admin
//@description   Register HealthCenterUser
//@token        public
route.post(
  '/add-admin',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check('password', 'Enter a password of minimum 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //See if Admin Exists

      let adminuser = await AdminUser.findOne({ email });
      if (adminuser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      adminuser = new AdminUser({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      adminuser.password = await bcrypt.hash(password, salt);
      await adminuser.save();
      //Return JsonWebToken
      const payload = {
        adminuser: {
          id: adminuser.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, name, email, gravatar });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = route;
