<?php
// this is a debugging line
// ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 1. include database and objects
include_once 'connect.php';
include_once 'functions.php';


// 2. instantiate database and movie object
$database = new Database();
$db_connector = $database->getConnection();

$movie = new Movie($db_connector);

// 3. query movies based on different requests

if(isset($_GET['id'])) {
    //      b. /movie/read.php?id=1 --> return the move that has ID == 1
    $results = $movie->getMovieByID($_GET['id']);
} elseif (isset($_GET['genre'])) {
    //      c. /movie.read.php?genre=action --> return all action movies
    $results = $movie->getMovieByGenre($_GET['genre']);

} elseif (isset($_GET['nineties'])) {
    $results = $movie->get90sMovies();
} else {
    //      a. /movie/read.php --> return all movies
    $results = $movie->getMovies();
}


// 4. return the data in JSON format (remove JSON PRETTY_PRINT to save resources after testing)
// echo json_encode($results, JSON_PRETTY_PRINT);
echo json_encode($results);
exit;