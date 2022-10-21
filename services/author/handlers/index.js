const authorRepo = require('../../../pkg/repo/author');


const getAllAuthors = async (request, response) => {
    const cachedResult = [];
    try {
        if(cachedResult.length == 0) {
            const authorData = await authorRepo.getAllAuthors();
            cachedResult = [...authorData];
        }
        return response.status(OK_STATUS).send(cachedResult);

    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
    }
};

const getAllBooksByAuthor = async (request, response) => {
    try {
        return response.status(OK_STATUS).send({ });

    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
    }
};
const createNewAuthor = async (request, response) => {
    try {
        return response.status(OK_STATUS).send({ });

    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
    }
};

const addNewBookForAuthor = async (request, response) => {
    try {
        return response.status(OK_STATUS).send({ });

    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
    }
};

module.exports= [
    createNewAuthor,
    addNewBookForAuthor,
    getAllBooksByAuthor,
    getAllAuthors
]