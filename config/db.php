<?php

    $host = $_SERVER[HTTP_HOST];
    if ($host == 'localhost:8080') {
        include './db-local.php';
        $servername = $GLOBALS['servername'];
        $username = $GLOBALS['username'];
        $password = $GLOBALS['password'];
        $dbname = $GLOBALS['dbname'];
    } else {
        include './db-live.php';
        $servername = $GLOBALS['servername'];
        $username = $GLOBALS['username'];
        $password = $GLOBALS['password'];
        $dbname = $GLOBALS['dbname'];
    }

    try {
        $conn = new PDO("mysql:host=$servername;
                        dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }

    ini_set("display_errors", 1);
    ini_set("log_errors", 1);

    //Define where do you want the log to go, syslog or a file of your liking with
    ini_set("error_log", "syslog"); // or ini_set("error_log", "/path/to/syslog/file");

?>
