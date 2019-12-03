'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const authService = require('../services/auth-service');

router.post('/', authService.isAdmin, controller.post);

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/product/:id', controller.getByID);
router.get('/tags/:tag', controller.getByTag);

router.put('/:id', authService.isAdmin, controller.put);

router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;
