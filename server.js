'use strict'
const express = require('express');
const cors = require('cors');
const app = express();

//rout
app.get('/', movies)
app.get('/favorite', Favorite)
app.get('*', pageNotFound)

const port = 3000
const moviesData = require('./Movie Data/data.json')
console.log(moviesData)

function movies(req, res) {
    let newobjict = new moviesSpecificData(moviesData.title, moviesData.poster_path, moviesData.overview)
    res.json(newobjict)
};

function Favorite(req, res) {res.send("Welcome to Favorite Page");
}

app.get("*",(res,req)=>{
    res.send("error")
})

function pageNotFound (req, res) {
    res.status(404).send("page not found ");
};
app.use((err,req,res,next)=>{console.error(err.stack)
res.status(500).send("server not found")})

function moviesSpecificData(tittle, poster_path, overview) {
    this.tittle = tittle;
    this.poster_path = poster_path;
    this.overview = overview;
}
app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})