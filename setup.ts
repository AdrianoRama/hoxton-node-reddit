import Database from 'better-sqlite3'

const db = new Database('./data.db', {
    verbose: console.log
})

const users = [
    {
        username: "Nicolas",
        email: "Nicolas@gmail.com",
        password: "canyouseemyscreen"
    },
    {
        username: "Ed",
        email: "Ed@gmail.com",
        password: "whazupmadude"
    },
    {
        username: "Visard",
        email: "Visard@gmail.com",
        password: "hellooooo"
    },
    {
        username: "Adriano",
        email: "Adriano@gmail.com",
        password: "Isuckatcoding"
    }
]

const subreddits = [
    {
        title: "r/ukraine",
        desc: "Ukraine - Україна",
        dateJoined: "Dec 23, 2008"

    },
    {
        title: "r/sports",
        desc: "Sports News and Highlights from the NFL, NBA, NHL, MLB, MLS, and leagues around the world.",
        dateJoined: "Sep 17, 2007"

    },
    {
        title: "r/memes",
        desc: "Memes! A way of describing cultural information being shared. An element of a culture or system of behavior that may be considered to be passed from one individual to another by nongenetic means, especially imitation.",
        dateJoined: "Jul 5, 2008"

    },
    {
        title: "r/oddlysatisfying",
        desc: "For those little things that are inexplicably satisfying.",
        dateJoined: "May 15, 2013"

    }
]

const usersubreddits = [
    {
        userId: 1,
        subredditId: 3
    },
    {
        userId: 2,
        subredditId: 2
    },
    {
        userId: 3,
        subredditId: 1
    },
    {
        userId: 4,
        subredditId: 4
    }
]

const posts = [
    {
        userId: 1,
        subredditId: 3,
        title: "alright then",
        content: "",
        media: "https://preview.redd.it/pqzq6mjnpll81.jpg?width=960&crop=smart&auto=webp&s=ec2f24b71d8b746aebe1e39914d022d59f6e4183",
        createdAt: "Mar 05, 2022"
    },
    {
        userId: 2,
        subredditId: 2,
        title: "Mercury center Brittney Griner reportedly detained in Russia on drug charges",
        content: "https://ca.sports.yahoo.com/news/wnba-mercury-brittney-griner-reportedly-detained-in-russia-on-drug-charges-153753082.html",
        media: "",
        createdAt: "Mar 05, 2022"
    },
    {
        userId: 3,
        subredditId: 1,
        title: "Smart move, Ukraine",
        content: "https://preview.redd.it/ry92abb5wll81.png?width=640&crop=smart&auto=webp&s=53cd580f40d78e8979c81d0c41b2cce7deb179f1",
        media: "",
        createdAt: "Mar 05, 2022"
    },
    {
        userId: 4,
        subredditId: 4,
        title: "I’m new to quilting. This is my fourth work.",
        content: "",
        media: "https://preview.redd.it/kzj89o27gkl81.jpg?width=640&crop=smart&auto=webp&s=c4c83b04707de478a5b4da609593c8bfff33339e",
        createdAt: "Mar 05, 2022"
    }
]

const comments = [
    {
        content: 'Funnyyyy',
        postId: 1,
        userId: 1
    },
    {
        content: 'Good job!',
        postId: 4,
        userId: 4
    }
]

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS usersubreddits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE IF NOT EXISTS users (
id integer  PRIMARY KEY,
username TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subreddits (
    id INTEGER PRIMARY KEY,
    title TEXT,
    desc TEXT,
    dateJoined TEXT
);

CREATE TABLE IF NOT EXISTS usersubreddits (
    id INTEGER PRIMARY KEY,
    userId INTEGER,
    subredditId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subredditId) REFERENCES subreddits(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    userId INTEGER,
    subredditId INTEGER,
    title TEXT,
    content TEXT,
    media TEXT,
    createdAt TEXT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (subredditId) REFERENCES subreddits(id) ON DELETE CASCADE
);  


`)

const createUser = db.prepare(`
INSERT INTO users(username,email,password) VALUES (?,?,?);
`)

const createSubreddit = db.prepare(`
INSERT INTO subreddits(title,desc,dateJoined) VALUES (?,?,?);
`)

const createUserSubreddit = db.prepare(`
 INSERT INTO usersubreddits(userId, subredditId) VALUES (?, ?)
`)

const createPost = db.prepare(`
INSERT INTO posts(title,content,media,createdAt,userId,subredditId) VALUES (?,?,?,?,?,?);
`)

const createComment = db.prepare(`
INSERT INTO comments(content, postId, userId) VALUES (?,?,?);
`)

for (const user of users) {
    createUser.run(user.username, user.email, user.password)
}

for (const subreddit of subreddits) {
    createSubreddit.run(subreddit.title, subreddit.desc, subreddit.dateJoined)
}

for (const usersubreddit of usersubreddits) {
    createUserSubreddit.run(usersubreddit.userId, usersubreddit.subredditId)
}

for (const post of posts) {
    createPost.run(post.userId, post.subredditId, post.title, post.media, post.content, post.createdAt)
}

for (const comment of comments) {
    createComment.run(comment.content, comment.postId, comment.userId)
}