import Database from "better-sqlite3";
import cors from "cors";
import express from "express";


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

const db = new Database('./data.db', {
    verbose: console.log
})

const getAllUsers = db.prepare(`SELECT * FROM users`)

const createUser = db.prepare(`INSERT INTO users(username, email, password) VALUES (?,?,?);`)

const getUserById = db.prepare(`SELECT * FROM users WHERE id=?;`)

const getAllSubreddits = db.prepare(`SELECT * FROM subreddits`)

const createSubreddit = db.prepare(`INSERT INTO subreddits(title, desc, dateJoined) VALUES (?,?,?);`)

const getSubredditById = db.prepare(`SELECT * FROM subreddits WHERE id=?;`)

const getAllPosts = db.prepare(`SELECT * FROM posts`)

const createPost = db.prepare(`INSERT INTO posts(userId, subredditId, title, media, content, createdAt) VALUES(?,?,?,?,?,?);`)

const getPostById = db.prepare(`SELECT * FROM posts WHERE id=?;`)

// const getCommentById = db.prepare(`SELECT * FROM comments WHERE id=?;`)

// const getCommentsByPostId = db.prepare(`SELECT  * FROM comments WHERE postId=?;`)

// const createComment = db.prepare(`INSERT INTO comments(content, userId, postId) VALUES (?,?,?); `)

app.get('/users', (req, res) => {
    const users = getAllUsers.all()
    res.send(users)
})

app.get('/posts', (req, res) => {
    const posts = getAllPosts.all()
    for (const post of posts) {
        const user = getUserById.get(post.userId)
        post.user = user
        const subreddit = getSubredditById.get(post.subredditId)
        post.subreddit = subreddit
    }
    res.send(posts)
})


app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});




