<?php

$host = 'localhost';
$dbname = 'u218702675_techara';
$username = 'u218702675_techara';
$password = 'Digi2025#';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // Do NOT expose detailed errors in production
    die('Database connection failed.');
}