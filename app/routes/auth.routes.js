const express = require('express');
var multer = require('multer');
const authController = require('../controllers/auth.controller');
const listController = require('../controllers/list.controller');
const listItemController = require('../controllers/listitem.constroller');
const productController = require('../controllers/products.controller');
const app = express();
let router = express.Router();

router.post('/auth/sign_in', authController.loginAuth);
router.post('/auth/sign_up', authController.register);

router.get('/list/:id', listController.getList);
router.get('/list/:listId/listitems', listItemController.getItemList);
router.put('/shopping/:id', listItemController.setChecked);

router.use(authController.checkToken);

router.post('/list/', listController.createList);
router.post('/list/:listId/listitem/', listItemController.addProductToList);
router.put('/listitem/:id', listItemController.updateProduct);
router.delete('/listitem/:id', listItemController.removeItem);
router.get('/list/', listController.getUserList);
router.delete('/list/:id', listController.removeList);


module.exports = router;