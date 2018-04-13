const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('../../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user.models');
const app = express();

app.set('superSecret', config.secret);


exports.loginAuth = (req, res) => {
    User.findOne({email: req.body.email}, (err, admin) => {
        if (err) res.status(400).send(err);
        if (!admin) {
            res.status(404).send('Authentication failed. Admin not found.');
        } else {
            if (admin.password !== bcrypt.hashSync(req.body.password, admin.salt)) {
                res.status(401).send('Authentication failed. Wrong password.');
            } else {
                const token = jwt.sign(admin.toJSON(), app.get('superSecret'), {
                    expiresIn: '24h'
                });
                res.json({
                    success: true,
                    username: admin.username,
                    email: admin.email,
                    message: 'Login successful!',
                    access_token: token,
                    id: admin._id
                });
            }
        }
    })
}

exports.register = (req, res) => {
    let salt = bcrypt.genSaltSync(saltRounds);

    let auth = new User({
        email: req.body.email,
        username: req.body.username,
        // image: req.body.image ? req.body.image : null,
        password: bcrypt.hashSync(req.body.password, salt),
        salt: salt,
        changePassword: true
    });
    auth.save((err) => {
        if (err) return res.status(400).send(err);
        res.json(auth);
    });
}


exports.checkToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), (err, decoded) => {
            if (err) {
                return res.status(400).send('Failed to authenticate token!');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

