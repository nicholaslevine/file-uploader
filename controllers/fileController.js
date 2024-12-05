const {getUsersFiles, createFile, selectFile, deleteFile, updateFile} = require('../queries/queries');

const fileController = {
    displayFiles: async (req, res) => {
        const files = await getUsersFiles(res.locals.currentUser.id);
        res.render("files", {
            files: files,
        })
    },
    createFile: async (req, res) => {
        
    }
}