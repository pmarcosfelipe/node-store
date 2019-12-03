'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, controller.post);

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/product/:id', controller.getByID);
router.get('/tags/:tag', controller.getByTag);

router.put('/:id', authService.authorize, controller.put);

router.delete('/', authService.authorize, controller.delete);

module.exports = router;
