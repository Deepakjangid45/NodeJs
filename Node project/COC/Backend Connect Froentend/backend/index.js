import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/jokes", (req, res) => {

    const jokes = [
        { id: 1, title: "A Joke 1", content: "This is a Joke 1" },
        { id: 2, title: "A Joke 2", content: "This is a Joke 2" },
        { id: 3, title: "A Joke 3", content: "This is a Joke 3" },
    ]

    res.send(jokes)
})

app.listen(PORT, () => {
    console.log(`app is listen at PORT ${PORT}`)
})

