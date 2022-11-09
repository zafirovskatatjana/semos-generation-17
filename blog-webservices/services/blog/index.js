const express = require('express');
const config = require('../../pkg/config');
const blogHandler = require('../../pkg/blog')
const app = express();


const {blog: {port}} = config.getConfigPropertyValue('services');

app.use(express.json());


app.get('/api/v1/blog', blogHandler.deleteBlog);
app.get('/api/v1/blog', blogHandler.deleteBlog);
app.post('/api/v1/blog', blogHandler.deleteBlog);
app.get('/api/v1/blog', blogHandler.deleteBlog);
app.put('/api/v1/blog', blogHandler.deleteBlog);

app.listen(port, (err)=>{
    if(err) {
        throw new Error(err)
    }
    console.log(`Blog service running on http://localhost:${port}`)
})