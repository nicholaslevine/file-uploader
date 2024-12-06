const multer = require('multer');
const path = require('path');
const {getUsersFiles, createFile, selectFile, deleteFile} = require('../queries/queries');
const { nextTick } = require('process');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
});


const upload = multer({
    storage: storage,
    limits: {fileSize: 5*1024*1024}
})



const fileController = {
    displayFiles: async (req, res, next) => {
        try{
            const files = await getUsersFiles(res.locals.currentUser.id);
            res.render("files", {
                files: files,
            });
            next()
        } catch (err){
            next(err);
        }
    },
    createFileGet: (req, res) => {
        res.render('upload');
    },
    createFilePost: upload.single('file'),
    handleFileUpload: async (req, res, next) => {
        try{
            const file = req.file;
            await createFile({
                name: file.filename,
                size: file.size,
                userId: res.locals.currentUser.id
            });
            res.redirect('/files');
            next();
        } catch(err){
            next(err);
        }
    },
    selectFile: async (req, res, next) => {
        try{
            const file = await selectFile(req.params.fileId);
            res.render("/file-info", {
                file
            });
            next();
        } catch (err){
            next(err);
        }
    },
    deleteFile: async (req, res, next) => {
        try{
            await deleteFile(req.params.fileId);
            res.redirect('/files');
            next();
        } catch (err){
            next(err);
        }
    }

}