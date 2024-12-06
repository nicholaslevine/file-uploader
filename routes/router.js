const {Router} = require('express');
const userController = require('../controllers/userController')
const fileController = require('../controllers/fileController');
const router = Router();

router.get('/', fileController.displayFiles);
router.get('/sign-up', userController.makeUserGet);
router.post('/sign-up', userController.makeUserPost);
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/logout', userController.logout);
router.get('/update', userController.updateUserGet);
router.post('/update', userController.updateUserPost);
router.get('/deleteuser', userController.deleteUser);

router.get('/upload', fileController.createFileGet);
router.post('/upload', fileController.createFilePost, fileController.handleFileUpload);
router.get('/delete/:id', fileController.deleteFile);

