const express = require('express')
const router = express.Router()
const post = require('../models/post.model')
const m = require('../helpers/middlewares')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    if ('OPTIONS' === req.method) {
        res.send(200);
      }
      else {
        next();
      }
  });

/* All posts */
router.get('/', async (req, res) => {
    await post.getPosts()
    .then(posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A post by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await post.getPost(id)
    .then(post => res.json(post))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new post */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `The post #${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a post */
router.put('/:id', m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await post.updatePost(id, req.body)
    .then(post => res.json({
        message: `The post #${id} has been updated`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a post */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    await post.deletePost(id)
    .then(post => res.json({
        message: `The post #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

// Routes
module.exports = router