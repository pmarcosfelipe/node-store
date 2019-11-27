'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator');
const productRepository = require('../repositories/product');

exports.get = (req, res, next) => {
  productRepository
    .get()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getBySlug = (req, res, next) => {
  productRepository
    .getBySlug(req.params.slug)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getByID = (req, res, next) => {
  productRepository
    .getByID(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getByTag = (req, res, next) => {
  productRepository
    .getByTag(req.params.tag)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.post = (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    'O título deve conter pelo menos 3 caracteres!'
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    'O slug deve conter pelo menos 3 caracteres!'
  );
  contract.hasMinLen(
    req.body.description,
    3,
    'O description deve conter pelo menos 3 caracteres!'
  );

  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  productRepository
    .create(req.body)
    .then(x => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    })
    .catch(err => {
      res
        .status(400)
        .send({ message: 'Falha ao cadastrar o produto!', data: err });
    });
};

exports.put = (req, res, next) => {
  productRepository
    .update(req.params.id, req.body)
    .then(x => {
      res.status(200).send({ message: 'Produto atualizado com sucesso!' });
    })
    .catch(err => {
      res
        .status(400)
        .send({ message: 'Falha ao atualizar o produto!', data: err });
    });
};

exports.delete = (req, res, next) => {
  productRepository
    .delete(req.body.id)
    .then(x => {
      res.status(200).send({ message: 'Produto removido com sucesso!' });
    })
    .catch(err => {
      res
        .status(400)
        .send({ message: 'Falha ao remover o produto!', data: err });
    });
};
