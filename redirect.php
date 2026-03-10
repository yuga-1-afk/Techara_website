<?php
require_once 'db.php';

// Hardcoded URL
$targetUrl = "https://example.com/your-destination";

// Increase counter
$pdo->exec("UPDATE redirect_counter SET visit_count = visit_count + 1 WHERE id = 1");

// Redirect
header("Location: " . $targetUrl);
exit;