<?php
    include("connect.php");
    include("functions.php");

    if(isset($_GET["id"])) {
        $targetID = $_GET["id"];
        $result = getMovieByID($pdo, $targetID);

        return $result;
    } else {
        $allPieces = getMovies($pdo);

        return $allPieces;
    }