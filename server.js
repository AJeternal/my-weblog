const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://jeternal:<AmirMRX1385>@cluster0.9ryi0yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.create({ username, password }, (err, user) => {
        if (err) return res.status(500).send('User registration failed');
        res.send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password }, (err, user) => {
        if (err || !user) return res.status(400).send('Invalid credentials');
        res.send('User logged in successfully');
    });
});

app.post('/posts', (req, res) => {
    const { title, content, username } = req.body;
    Post.create({ title, content, username }, (err, post) => {
        if (err) return res.status(500).send('Post creation failed');
        res.send('Post created successfully');
    });
});

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return res.status(500).send('Error fetching posts');
        res.json(posts);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
