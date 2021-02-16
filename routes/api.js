const express = require('express');
// express router handles incoming requests and directs them where they need to go
//like a traffic cop
const router = express.Router();

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
    // run SQL query here -> get all movies from DB
    // res.json(query result here);
    // echo a message -> just like PHP
    res.json({message: "all movies route"});
});

// dynamic route handler that can accept a parameter.
// this is equivalent to $)GET_["id"] (req.params.id)
// you're passing the id via the route: /api/movies/1, api/movies/20, etc.
router.get("/movies/:id", (req, res) => {
    res.json({message: "get one movie route", movie: req.params.id});
});

module.exports = router;