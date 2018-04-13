const express = require('express');

const config = require('../../config');

const ListItem = require('../models/listitem.model');
const app = express();

app.set('superSecret', config.secret);

exports.addProductToList = function (req, res) {
    let listitem = new ListItem({
        name: req.body.name,
        quantity: req.body.quantity,
        unit: req.body.unit,
        listId: req.body.listId
    });

    listitem.save(err => {
        if (err) return res.status(400).json({message: 'Success'});
        return res.status(200).json(listitem);
    });
};

exports.updateProduct = function (req, res) {
    ListItem.findOne({_id: req.body.id}, function (err, item) {
        if (err) return res.status(400).json(err);

        if (!item) {
            return res.status(404).send({
                message: "item not found!"
            });
        }

        item.name = req.body.name || item.name;
        item.quantity = req.body.quantity || item.quantity;
        item.unit = req.body.unit || item.unit;

        item.save((error, success) => {
            if (error) return res.status(400).json(err);
            if (!success) {
                return res.status(404).send({
                    message: "Item not found!"
                });
            }
            return res.json(success);
        });
    });
};

exports.getItemList = function (req, res) {
    ListItem.find({listId: req.body.listId})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err=> res.status(400).json(err))
};

exports.removeItem = function (req, res) {
    ListItem.remove({_id: req.body.id})
        .then(()=> res.status(200))
        .catch(err=> res.status(400).json(err));
};


exports.setChecked = function (req, res) {
    ListItem.findOne({_id: req.body.id}, (err, item) => {
       if(err) return res.status(400).json(err);
        if(!item) {
            return res.status(404).json({message: "not found"});
        }

        item.checked = !item.checked;

        item.save(err=> {
            if(error) return res.status(400).json(error);

            return res.status(200).json(item);
        });
    });
};