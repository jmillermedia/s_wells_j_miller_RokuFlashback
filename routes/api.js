const express = require('express');
// express router handles incoming requests and directs them where they need to go
//like a traffic cop
const router = express.Router();

// import the sql connection
const connect = require("../config/sqlConfig");

router.get("/", (req, res) => {
    // res.json = echo json encode(...) in PHP
    res.json({message: "you hit the api route!"});
});

router.get("/users", (req, res) => {
    // run SQL query here
    // res.json(query result here);
    res.json({message: "all users route"});
});

router.get("/movies", (req, res) => {
    connect.getConnection(function(err, connection) { // this is a longhand version to connect from mySQL NPM module
        if (err) throw err; // not connected!
        // Use the connection
        connection.query('SELECT * FROM tbl_movies', function (error, results) {
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
    connect.query(`SELECT * FROM tbl_movies WHERE movies_id=${req.params.id}`, function (error, results) { // this is the shorthand, but functions the same as the longhand above.
        if (error) throw error;
        console.log("results", results);

        res.json(results);
    });
});

module.exports = router;