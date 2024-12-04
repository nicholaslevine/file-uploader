const {PrismaClient} = require('@prisma/client');
const { captureRejectionSymbol } = require('events');

const prisma = new PrismaClient();


async function getUsers(){
    const users = await prisma.users.findMany();
    return users;
}

async function makeUser(user){
    await prisma.user.create({
        data: {
            name: user.name,
            username: user.username,
            password: user.password,
        }
    })
}
async function getUser(username){
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        }
    })
};

async function updateUser(id, updatedUser){
    await prisma.user.update({
        where: {
            id: id,
        },
        data: updatedUser
})
};

async function deleteUser(id){
    await prisma.user.delete({
        where: {
            id: id,
        }
    })
}

async function getUsersFiles(id){
    await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            files: true,
        }
    })
}

async function createFile(newFile){
    await prisma.file.create({
        data: newFile
    });
}

async function selectFile(fileId){
    await prisma.file.findUnique({
        where: {
            id: fileId
        }
    })
}

async function deleteFile(fileId){
    await prisma.file.delete({
        where: {
            id: fileId
        }
    })
}

async function updateFile(fileId, newFile) {
    await prisma.file.update({
        where: {
            id: fileId
        },
        data: newFile
    })
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