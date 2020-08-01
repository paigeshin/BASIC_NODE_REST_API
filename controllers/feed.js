const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {

    /*** Pagination ***/
    //1. declare variables
    const currentPage = req.query.page || 1; //current page value coming from query
    const perPage = 2; //per page
    let totalItems; //save total document counts
    //2. get all documents
    Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            //3. skip & limit
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
        })
        .then(posts => {
            res
                .status(200)
                .json({
                    message: 'Fetched posts successfully.',
                    posts: posts,
                    totalItems: totalItems
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};

exports.createPost = (req, res, next) => {

    //validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error; //it will automatically exit the function execution and try to reach error handling middleware
    }

    //react code 만질줄 몰라서 일단 주석처리
    /*** file logic ***/
    // if(!req.file) {
    //     const error = new Error('No image provided.');
    //     error.statusCode = 422;
    //     throw error;
    // }

    //react code 만질줄 몰라서 일단 주석처리
    /*** file logic ***/
    // const imageUrl = req.file.path; //multer automatically generates imageURL

    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: '/images/duck.jpeg',
        //react code 만질줄 몰라서 일단 주석처리
        // imageUrl: imageUrl,
        creator: {
            name: 'Paige'
        }
    });

    //save to database
    post.save().then(result => {
        console.log(result);
        // Create post in db
        // 201 => Success, resource was created.
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    }).catch(err => {
        /* Wrong Code: in `catch` statement, if you call `throw` it will never reach error handling middleware provided by node-express framework */
        // if (!err.statusCode) {
        //     err.statusCode = 500;
        // }
        // throw err => this will never reach middleware

        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Post fetched.', post: post});
        })
        .catch(err =>{
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

//put request
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    //validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error; //it will automatically exit the function execution and try to reach error handling middleware
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.imageUrl; //no new file is picked

    if(req.file) { // if there's a file
        imageUrl = req.file.path;
    }

    if(!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }

    Post.findById(postId)
        .then(post => {
            if(!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            //clear image if image url is different
            if(imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();
        })
        .then(result => {
            res.status(200).json({message: 'Post updated!', post: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

};

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if(!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw  error;
            }
            // Check logged in user
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({message: 'Deleted post.'});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
    })

};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};