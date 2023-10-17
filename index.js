const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const db = require('./db');

const app = express();

// Middleware to handle the body of POST requests
app.use(bodyParser.json());

// 2.1. Database example
// (The `db` module provided by `require('./db')` already contains the data)

// 2.2. Article management

// List all articles
app.get('/articles', (req, res) => {
    console.log("Request received for /articles");
    res.setHeader('Content-Type', 'application/json');
    res.json(db.articles);
});

// Add a new article
app.post('/articles', (req, res) => {
    const newArticle = {
        id: uuid.v4(),
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString().slice(0, 10),
        author: req.body.author
    };
    db.articles.push(newArticle);
    res.json(newArticle);
});

// Retrieve an article by ID
app.get('/articles/:articleId', (req, res) => {
    const article = db.articles.find(a => a.id === req.params.articleId);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

// 2.3. Comment management

// Retrieve all comments of a specific article
app.get('/articles/:articleId/comments', (req, res) => {
    const articleComments = db.comments.filter(c => c.articleId === req.params.articleId);
    res.json(articleComments);
});

// Add a new comment to a specific article
app.post('/articles/:articleId/comments', (req, res) => {
    const articleExists = db.articles.some(a => a.id === req.params.articleId);
    if (!articleExists) {
        res.status(404).send('Article not found');
        return;
    }

    const newComment = {
        id: uuid.v4(),
        timestamp: Date.now(),
        content: req.body.content,
        articleId: req.params.articleId,
        author: req.body.author
    };
    db.comments.push(newComment);
    res.json(newComment);
});

// Retrieve a specific comment from a specific article
app.get('/articles/:articleId/comments/:commentId', (req, res) => {
    const comment = db.comments.find(c => c.articleId === req.params.articleId && c.id === req.params.commentId);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
