'use strict'
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
const monieData=require('./Movie Data/data.json');
const{json} = require('express');
app.use(cors());

const port = process.env.port;
const apikey = process.env.apikey;

app.get('/', moviesHandler)
app.get('/favorite', FavoriteHandler)
app.get('/trending', trendingHandler)
app.get('/search', searchHandler)
app.get('/popular', tvPopularHandler)
app.get('/top_rated',topRatedMovieshandler)
app.get('*', pageNotFound)
// constructors
function movies(title, poster, overview) {
    this.title = title;
    this.poster = poster;
    this.overview = overview;
}

function Trending(id, title, release_date, poster_path, overview,name) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    this.name=name;
}
function TVPopularData (id , name ,overview){
    this.id = id;
    this.name = name;
    this.overview = overview;
}
function TopRateMovies (id, title ,overview){
    this.id = id ;
    this.title=title;
    this.overview=overview;
}
//function
function moviesHandler(req, res) {
    let newobjict = new moviesSpecificData(moviesData.title, moviesData.poster_path, moviesData.overview)
    res.json(newobjict)
};

function FavoriteHandler(req, res) {
    res.send("Welcome to Favorite Page");
}
function trendingHandler(req, res) {
    let url =`https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
    axios.get(url)
        .then((result) => {
            let trendingMoviesData = result.data.results.map((movie)=> {
                if ('name' in movies) {
                    return new Trending(movie.id, movie.name, movie.release_date, movie.poster_path, movie.overview)
                }
                if ('title' in movies) {
                    return new Trending(movie.id, movie.title, movie.release_date, movie.poster_path,movie.overview)
                }
               
            });

            console.log(trendingMoviesData);
            res.json(trendingMoviesData);
        })
        .catch((err)=>{
            console.log(err)
        })

}

function searchHandler(req, res) {
    let moviename = req.query.title // name it as you want 
    console.log(moviename)
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=The&page=2`
    axios.get(url)
    .then((result)=>{
        let response= result.data.results;
        console.log(response);
        res.json(response);
    })
    .catch((err)=>{
        console.log(err)
    })
}
function tvPopularHandler(req,res){
    let url =`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=en-US&page=1`;
    axios.get(url)
    .then((result) => {
        console.log(result.data.results);
        let tvPopularData = result.data.results.map((movie)=> {
            
                return new TVPopularData (movie.id , movie.name ,  movie.overview)
        })        

        console.log(tvPopularData);
        res.json(tvPopularData);
    })
    .catch((err)=>{
        console.log(err)
    })}
function topRatedMovieshandler(req,res){
    let url =`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
    axios.get(url)
    .then((result) => {
        console.log(result.data.results);
        let topRate = result.data.results.map((movie)=> {
            
                return new TopRateMovies (movie.id , movie.title ,  movie.overview)
        })        

        console.log(topRate);
        res.json(topRate);
    })
    .catch((err)=>{
        console.log(err)
    })
    }

app.get("*", (res, req) => {
    res.send("error")
})

function pageNotFound(req, res) {
    res.status(404).send("page not found ");
};

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("server not found")
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})

