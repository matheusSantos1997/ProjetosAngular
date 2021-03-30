const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Product = require('../models/product');

// rota que vai inserir novos deartamentos
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

// rota que vai excluir um departamento
router.delete('/:id', async (req, res) => {
     try {
        let id = req.params.id;
        let prods = await Product.find({departments: id}).exec();
        if(prods.length > 0){
            res.status(500).send({
                msg: 'Could not remove this department. You may have to fix its dependencies before.'
            })
        } else {
            await Department.deleteOne({_id: id});
            res.status(200).send({});
        }

    //     Department.deleteOne({_id: id}, (err, dep) => {
        
    //     if(err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.status(200).send(dep);    
    //     }
    //  })
     } catch (err) {
        res.status(500).send({msg: 'Internal error.', error: err});
     }
     
})

// rota que vai atualizar o departamento 
router.put('/:id', (req, res) => {
     Department.findById(req.params.id, (err, dep) => {
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