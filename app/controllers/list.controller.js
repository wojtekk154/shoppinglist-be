const express = require('express');

const config = require('../../config');

const List = require('../models/list.model');
const app = express();

app.set('superSecret', config.secret);

exports.getUserList = function (req, res) {
    console.log(req.body, req.params);
    List.find({user: req.body.userId})
        .then((data) => {
            res.status(200).json({...data});
        })
        .catch(e => res.status(404).json({message: 'Not found'}))
};

exports.getList = function (req, res) {
    List.findOne({_id: req.body.id})
        .then(data => res.status(200).json({...data}))
        .catch(res.status(400).json({message: 'Error occured'}));
};

exports.createList = function (req, res) {
    let list = new List({
        name: req.body.name,
        userId: req.body.user
    });

    list.save((err) => {
        if (err) return res.status(400).send(err);
        res.json(list);
    });
};

exports.removeList = function (req, res) {
    List.remove({_id: req.body.id})
        .then(() => res.status(200).json({message: 'Success'}))
        .catch(err => res.status(400).json(err));
};
