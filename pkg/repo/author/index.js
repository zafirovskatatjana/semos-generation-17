const AuthorModel = require('../../model/author')

const deleteAuthor = async (idToFilterBy) => { 
    return await AuthorModel.deleteOne({_id: idToFilterBy});
};
const updateAuthor = async (idToFilterBy, newAuthor) => { 
    return await AuthorModel.updateOne({_id: idToFilterBy }, newAuthor);
};
const findAuthorByID = async (idToFilterBy) => { 
    return await AuthorModel.findById({_id: idToFilterBy});
};
const findAuthorByName = async (nameToFilterBy) => { 
    return await AuthorModel.findOne({ name: nameToFilterBy });
};
const getAllAuthors = async () => { 
    return await AuthorModel.find({})
};
const createAuthor = async (AuthorToBeSaved) => { 
    const newAuthor = new AuthorModel(AuthorToBeSaved); // creating new instance of AuthorModel
    return await newAuthor.save();
};

const addBookForAuthor = async (bookId, authorId) => {
    const author = await findAuthorByID(authorId);
    author.books.push(bookId);
    await updateAuthor(authorId, author);
}


module.exports = {
    createAuthor,
    deleteAuthor,
    updateAuthor,
    findAuthorByID,
    getAllAuthors,
    findAuthorByName,
    addBookForAuthor
}