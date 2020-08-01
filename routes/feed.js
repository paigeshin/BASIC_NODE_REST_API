const express = require('express');

//validation
const { body } = require('express-validator');

//controller
const feedController = require('../controllers/feed');

const router = express.Router();

/* GET /feed/posts */
router.get('/posts', feedController.getPosts);

/* POST /feed/post */
router.post('/post', [
    body('title') //body의 title의 minimum length는 5
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5})
], feedController.createPost);

/* GET /feed/post */
router.get('/post/:postId', feedController.getPost);

/* PUT /feed/post */
router.put('/post/:postId', [
    body('title') //body의 title의 minimum length는 5
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5})
    ],
    feedController.updatePost
);

router.delete('/post/:postId', feedController.deletePost);

module.exports = router;