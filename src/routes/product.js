'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/product/:id', controller.getByID);
router.get('/tags/:tag', controller.getByTag);
router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
