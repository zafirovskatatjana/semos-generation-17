const mongoose = require("mongoose");


const blogProviderSchema = mongoose.Schema({
	provider_id: String,
    address: String,
	type: Number,
	owner: String,
    numberBlogPosts: Number
});

const blogProviderModel = mongoose.model("blog_provider", blogProviderSchema, "blog_provider");

const saveBlogProvider = async (blogProvider) => {};
const updateBlogProvider = async (blogProviderID, blogProvider) => {};
const deleteBlogProvider = async (blogProviderID) => {};
const getAllBlogProviderByAuthor = async (authorID) => {};
const getAllBlogProviderByUser = async (userID) => {};
const getAllBlogProviders = async () => {};

module.exports = {
	saveBlogProvider,
	updateBlogProvider,
	deleteBlogProvider,
	getAllBlogProviderByUser,
	getAllBlogProviderByAuthor,
	getAllBlogProviders,
};
