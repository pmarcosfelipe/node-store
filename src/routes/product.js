'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');

router.post('/', controller.post);

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/product/:id', controller.getByID);
router.get('/tags/:tag', controller.getByTag);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;
