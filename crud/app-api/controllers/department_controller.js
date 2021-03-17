const express = require('express');
const router = express.Router();
const Department = require('../models/department');

router.post('/', (req, res) => {
     console.log(req.body);
     let dep = new Department({ name: req.body.name });
     dep.save((err, dep) => {
         if (err) {
             res.status(500).send(err);
         } else {
             res.status(200).send(dep);
         }
     });
});

// rota que vai retornar todos os departamentos
router.get('/', (req, res) => {
    Department.find().exec((err, deps) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(deps);
        }
    });
});

module.exports = router;