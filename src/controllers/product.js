'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator');
const productRepository = require('../repositories/product');

exports.get = async (req, res, next) => {
  try {
    let data = await productRepository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    let data = await productRepository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.getByID = async (req, res, next) => {
  try {
    let data = await productRepository.getByID(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    let data = await productRepository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.post = async (req, res, next) => {
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

  try {
    await productRepository.create(req.body);
    res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.put = async (req, res, next) => {
  try {
    await productRepository.update(req.params.id, req.body);
    res.status(200).send({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await productRepository.delete(req.body.id);
    res.status(200).send({ message: 'Produto removido com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};
