const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainRoutes.js');
const fileUpload = require('../middlewares/multerMD');

router.get('/', controller.home);
router.get('/create', controller.create);
router.post('/create', fileUpload.single('image'), controller.store);
router.get('/detail/:id', controller.detail);
router.get('/edit/:id', controller.edit);
router.put('/edit/:id', fileUpload.single('image'), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;