const mongoose = require("mongoose");

/**
 *    key		|     type    |     description
 * blog_name	|    String   |   display name of the blog post
 * user_id     |    int      |   id number of the user in our system that wrote the blog post
 *
 */
const BlogPostSchema = mongoose.Schema({
	blog_name: String,
	blog_type: String,
	user_id: Number,
	blog_text: String,
	date_written: Date,
	author_name: String,
	author_id: String,
	tags: [String],
});
const BlogPostModel = mongoose.model("blog", BlogPostSchema, "blog");

const saveBlog = async (blog) => {
	let newBlogPost = new BlogPostModel(blog);
	return await newBlogPost.save();
};
const updateBlog = async (blogID, blog) => {
	return await newBlogPost.updateOne({ _id: blogID }, blog);
};
const deleteBlog = async (blogID) => {
	return await BlogPostModel.deleteOne({ _id: blogID });
};
const getAllBlogByAuthor = async (authorID) => {
	return await BlogPostModel.find({ author_id: authorID });
};
const getAllBlogByUser = async (userID) => {
	return await BlogPostModel.deleteOne({ user_id: userID });
};
const getAllBlogs = async () => {
	return await BlogPostModel.find();
};

module.exports = {
	saveBlog,
	updateBlog,
	deleteBlog,
	getAllBlogByUser,
	getAllBlogByAuthor,
	getAllBlogs,
};
