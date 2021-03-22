const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// rota que vai inserir novos deartamentos
router.post('/', async (req, res) => {
     console.log(req.body);
     let dep = await new Department({ name: req.body.name });
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

// rota que vai excluir um departamento
router.delete('/:id', async (req, res) => {
     try {
        let id = await req.params.id;
        Department.deleteOne({_id: id}, (err, dep) => {
        
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(dep);    
        }
     })
     } catch (err) {
        res.status(500).send({msg: 'Internal error.', error: err});
     }
     
})

// rota que vai atualizar o departamento 
router.put('/:id', async (req, res) => {
     Department.findById(await req.params.id, (err, dep) => {
         if(err) {
            res.status(500).send(err);
         } else if(!dep) {
            res.status(404).send({});
         } else {
             dep.name = req.body.name;
             dep.save()
                .then((d) => res.status(200).send(d)) // retorna uma promise
                .catch((e) => res.status(500).send(e))
         }
     });
});

module.exports = router;