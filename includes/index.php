<?php
    include("connect.php");
    include("functions.php");

    if(isset($_GET["id"])) {
        $targetID = $_GET["id"];
        $result = getSinglePiece($pdo, $targetID);

        return $result;
    } else {
        $allPieces = getAllPieces($pdo);

        return $allPieces;
    }