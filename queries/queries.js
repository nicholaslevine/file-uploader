const prisma = require('../prisma/prisma');


async function getUsers(){
    try{
    const users = await prisma.users.findMany();
    return users;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

async function makeUser(user){
    try{
    await prisma.user.create({
        data: {
            name: user.name,
            username: user.username,
            password: user.password,
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}
async function getUser(username){
    try{
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
};

async function updateUser(id, updatedUser){
    try{
    await prisma.user.update({
        where: {
            id: id,
        },
        data: updatedUser,
})
    }
catch(err){
    console.error(err);
    throw err;
}
};

async function deleteUser(id){
    try{
    await prisma.user.delete({
        where: {
            id: id,
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}

async function getUsersFiles(id){
    try{
    await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            files: true,
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}

async function createFile(newFile){
    try{
    await prisma.file.create({
        data: newFile
    });
}
    catch(err){
        console.error(err);
        throw err;
    }
}

async function selectFile(fileId){
    try{
    await prisma.file.findUnique({
        where: {
            id: fileId
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}

async function deleteFile(fileId){
    try{
    await prisma.file.delete({
        where: {
            id: fileId
        }
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}

async function updateFile(fileId, newFile) {
    try{
    await prisma.file.update({
        where: {
            id: fileId
        },
        data: newFile
    })
}
    catch(err){
        console.error(err);
        throw err;
    }
}
module.exports = {
    getUsers,
    makeUser,
    getUser,
    updateUser,
    deleteUser,
    getUsersFiles,
    createFile,
    selectFile,
    deleteFile,
    updateFile
}