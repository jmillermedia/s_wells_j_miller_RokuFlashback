const express = require('express');
// express router handles incoming requests and directs them where they need to go
//like a traffic cop
const router = express.Router();

// import the sql connection
const connect = require("../config/sqlConfig");
const { route } = require('./ums');

router.get("/", (req, res) => {
    // res.json = echo json encode(...) in PHP
    res.json({ message: "you hit the api route!" });
});

router.get("/users", (req, res) => {
    // run SQL query here
    // res.json(query result here);
    res.json({ message: "all users route" });
});

router.get("/movies", (req, res) => {
    connect.getConnection(function(err, connection) { // this is a longhand version to connect from mySQL NPM module
        if (err) throw err; // not connected!
        // Use the connection
        connection.query('SELECT * FROM tbl_movies', function(error, results) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) throw error;

            res.json(results);
        });
    });
});

// dynamic route handler that can accept a parameter.
// this is equivalent to $)GET_["id"] (req.params.id)
// you're passing the id via the route: /api/movies/1, api/movies/20, etc.
router.get("/movies/:id", (req, res) => {
    connect.query(`SELECT * FROM tbl_movies WHERE movies_id=${req.params.id}`, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);

        res.json(results);
    });
});

// movie genres route
router.get("/movies/genre/:genre", (req, res) => {
    connect.query(`
    SELECT 
        movies.*,
        GROUP_CONCAT(genre.genre_name) AS genre
    FROM tbl_movies as movies
    JOIN tbl_mov_genre as mg ON movies.movies_ID = mg.movie_ID
    JOIN tbl_genre as genre ON mg.genre_ID = genre.genre_id
    WHERE genre.genre_id = ${req.params.genre}
    GROUP BY movies.movies_ID
    `, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

// movie genres route
router.get("/television/genre/:genre", (req, res) => {
    connect.query(`
    SELECT 
        tv.*,
        GROUP_CONCAT(genre.genre_name) AS genre
    FROM tbl_television as tv
    JOIN tbl_tel_genre as tg ON tv.ID = tg.television_ID
    JOIN tbl_genre as genre ON tg.genre_ID = genre.genre_id
    WHERE genre.genre_id = ${req.params.genre}
    GROUP BY tv.ID
    `, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

// movie genres route
router.get("/genres/movie", (req, res) => {
    connect.query(`SELECT * FROM tbl_genre;`, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

router.get("/genres/television", (req, res) => {
    connect.query(`SELECT * FROM tbl_genre;`, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});


router.get("/genres/music", (req, res) => {
    connect.query(`SELECT * FROM tbl_musicgenres;`, function(error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

// get all television entries
router.get("/television", (req, res) => {
    connect.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_television', function(error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });
});

// get television by ID #
router.get("/television/:id", (req, res) => {
    connect.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM tbl_television WHERE ID=${req.params.id}`, function(error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });
});

router.get("/television/genre/:genre", (req, res) => {
    connect.query(`SELECT
    t.*,
    GROUP_CONCAT(g.genre_name) AS GENRE
FROM
    tbl_television AS t,
    tbl_genre AS g,
    tbl_tel_genre AS t_g
WHERE
    t.ID = t_g.television_ID AND g.genre_id = t_g.genre_ID
AND
	g.genre_name = '${req.params.genre}'
GROUP BY
    t.ID
`, function(error, results) {
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

router.get("/music", (req, res) => {
    connect.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_music', function(error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });
});

router.get("/music/:id", (req, res) => {
    connect.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM tbl_music WHERE ID=${req.params.id}`, function(error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });
});

router.get("/music/genre/:genre", (req, res) => {
    console.log(req.params.genre)
    connect.query(`
    SELECT 
	    music.*,
        GROUP_CONCAT(genre.genre_name) AS GENRE
    FROM tbl_music as music
    JOIN tbl_mus_genre as mg ON music.ID = mg.music_ID
    JOIN tbl_musicgenres as genre ON mg.genre_ID = genre.id
    WHERE genre.id = ${req.params.genre}
    GROUP BY music.ID
    `, function(error, results) {
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});


router.get("/genres", (req, res) => {
    connect.query(`
        SELECT *, genre_name as name FROM tbl_genre
        UNION
        SELECT *, CONCAT(genre_name, ' Music') FROM tbl_musicgenres`, (error, results) => {
        if (error) throw error;
        console.log("results", results);
        res.json(results);
    });
});

module.exports = router;