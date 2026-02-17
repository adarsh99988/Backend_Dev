const express = require("express");
const router = express.Router();

let posts = [
    { id: 1, title: "First Post", content: "This is my first blog post." },
    { id: 2, title: "Second Post", content: "Learning Express is fun!" }
];

// List all posts
router.get("/", (req, res) => {
    res.render("blog", { posts });
});

// View single post
router.get("/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("post", { post });
});

// Create new post page
router.get("/new", (req, res) => {
    res.render("new-post");
});

// Handle new post
router.post("/", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect("/blog");
});

module.exports = router;
