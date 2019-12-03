'use strict';

const orderRepository = require('../repositories/order');
const authService = require('../services/auth-service');
const guid = require('guid');

exports.post = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    await orderRepository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    });
    res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.get = async (req, res, next) => {
  try {
    let data = await orderRepository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};
