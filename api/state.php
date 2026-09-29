<?php
//A single-file relay for a two-device prototype.
//Stores the whole app state as one JSON blob.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

$dir  = __DIR__ . '/../data';
$file = $dir . '/state.json';

if (!is_dir($dir)) {
  mkdir($dir, 0777, true);
}

//GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (!file_exists($file)) {
    echo json_encode(['version' => 0, 'state' => null]);
    exit;
  }
  readfile($file);
  exit;
}

//POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $raw = file_get_contents('php://input');
  $payload = json_decode($raw, true);

  if (!$payload || !isset($payload['state'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
  }

  //Incement version so clients can tell "newer" from "same"
  $version = 0;
  if (file_exists($file)) {
    $existing = json_decode(file_get_contents($file), true);
    if ($existing && isset($existing['version'])) {
      $version = (int) $existing['version'];
    }
  }
  $version++;

  $out = json_encode([
    'version' => $version,
    'updatedAt' => date('c'),
    'state' => $payload['state'],
  ]);

  $tmp = $file . '.tmp';
  file_put_contents($tmp, $out, LOCK_EX);
  rename($tmp, $file);

  echo json_encode(['ok' => true, 'version' => $version]);
  exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);