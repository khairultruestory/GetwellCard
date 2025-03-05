const express = require('express');
const app = express();
const port = 3000;

// In-memory storage (replace with a database like SQLite for persistence)
let posts = [];

app.use(express.json({ limit: '10mb' })); // Allow larger payloads for images
app.use(express.static('public')); // Serve frontend files

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Add a new post
app.post('/api/posts', (req, res) => {
    const { message, image } = req.body;
    const newPost = { id: Date.now(), message, image };
    posts.push(newPost);
    res.json(newPost);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
